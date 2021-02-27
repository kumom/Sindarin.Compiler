import {Hypergraph} from "./hypergraph";
import {HMatcher, toSubtreeString, lazyFilter} from "./pattern";
import * as Syntax from "./syntax";
import Vertex = Hypergraph.Vertex;
import {getClosestScopeNameRouteDefinition} from "./semantics";
import Edge = Hypergraph.Edge;
import assert from "assert";
import {BINARY_EXPRESSION} from "./syntax";


const ASSIGNMENT_EXPRESSIONS = [
    Syntax.VARIABLE_DECLARATION,
    Syntax.BINARY_EXPRESSION,
    Syntax.RETURN_STATEMENT,
    Syntax.CALL_EXPRESSION,
];

const LINK_TYPES = {
    ASSIGNMENT: "ASSIGNMENT",
    SCOPE: "SCOPE",
    CLASS: "CLASS",
    INVOCATION: "INVOCATION",
    INSTANTIATION: "INSTANTIATION",
    PARENT_SCOPE: "PARENT_SCOPE",
    FIELD: "FIELD",
};


// TODO: Support parameters and return value linking
const SUPPORTED_ASSIGNMENT_EXPRESSIONS = new Set(ASSIGNMENT_EXPRESSIONS.slice(0, 2));

const ASSIGNMENT_FILTER = ([assignmentExpr, scope, _]) => _filterAssignments(assignmentExpr);


// TODO: support simple invocations as well do to side effects?
function _filterAssignments(assignmentExpr: Vertex): boolean {
    const {incoming} = assignmentExpr;
    if (!incoming || incoming.length !== 1) {
        throw new Error("Bad vertex");
    }

    const edge = incoming[0];
    const {label, sources} = edge;

    if (label === Syntax.BINARY_EXPRESSION) {
        return sources[1].label === "=";
    }

    return true;
}

export function performPointsToAnalysis<VData>(sourcePeg: Hypergraph<VData>): Hypergraph<VData> {
    const m = new HMatcher(sourcePeg);

    // 1) Collect assignments
    const assignments = m.collectPatternDefinition(getClosestScopeNameRouteDefinition({
        labelPred: ASSIGNMENT_EXPRESSIONS,
        resolve: "targets",
    }, {
        excludedScopes: [Syntax.CATCH_CLAUSE],
        routeOverrides: {
            resultFilter: ASSIGNMENT_FILTER,
        },
    })).map(ANALYSIS_EXPRESSION_FACTORY);

    // 2) Filter supported expressions
    const supportedAssignments = assignments.filter(expr => {
        return SUPPORTED_ASSIGNMENT_EXPRESSIONS.has(expr.assignmentExpr.label);
    });

    // 3) Add to Andersen graph
    const analysis: PointsToAnalysis<VData> = new AndersenAnalyis(sourcePeg._max, m);
    supportedAssignments.forEach(analysis.addConstraint.bind(analysis));

    // 4) Solve constraints
    const result = analysis.solveConstraints();

    // Profit
    return result;
}

interface AnalysisExpression<VData> {
    assignmentExpr: Edge;
    scope: Vertex<VData>;
    name: string;
    repr: string;
}

const ANALYSIS_EXPRESSION_FACTORY = ([assignmentExpr, scope, _]) => _createAnalysisExpression(assignmentExpr, scope);

function _createAnalysisExpression<VData>(assignmentExpr: Vertex<VData>, scope: Vertex<VData>): AnalysisExpression<VData> {
    const {incoming} = assignmentExpr;
    if (!incoming || incoming.length !== 1) {
        throw new Error("Bad vertex");
    }

    // TODO
    const name = "";

    return {
        assignmentExpr: incoming[0],
        scope,
        name,
        repr: toSubtreeString(assignmentExpr),
    };
}

interface PointsToAnalysis<VData> {
    addConstraint(expr: AnalysisExpression<VData>);

    solveConstraints(): Hypergraph<VData>;
}

interface ResolvedConstraint {
    top: Vertex;
    bottom: Vertex;
    type?: string;
}

class AndersenAnalyis<VData> implements PointsToAnalysis<VData> {
    peg: Hypergraph<VData>;
    matcher: HMatcher<VData>;

    constructor(max: number, matcher: HMatcher<VData>) {
        this.peg = new Hypergraph<VData>();
        this.peg._max = max;

        this.matcher = matcher;
    }

    addConstraint(expr: AnalysisExpression<VData>) {
        const {assignmentExpr, scope} = expr;
        const {label, sources} = assignmentExpr;

        switch (label) {
            case Syntax.BINARY_EXPRESSION:
            case Syntax.VARIABLE_DECLARATION: {
                if (!sources || sources.length !== 3) {
                    throw new Error("Must have three sources");
                }

                const [left, _, right] = sources.map(stripGibberish);

                if (_isArrayLiteralVertex(left)) {
                    this._addMultiAssignConstraint(expr, left, right);
                    return;
                }

                // TODO: Remove
                console.log(toSubtreeString(left, " ", true), " = ", toSubtreeString(right, " ", true));

                this._resolveWriteConstraint(scope, left, right);
                return;
            }
            default: {
                throw new Error(`Unsupported type ${label}`);
            }
        }
    }

    solveConstraints(): Hypergraph<VData> {
        const SOLVED_LABEL = "__SOLVED__";

        const ptaMatcher = new HMatcher(this.peg);

        // resolve dynamic this-pointers
        // ptaMatcher.

        // Resolve value assignments

        return this.peg;
    }

    private _addMultiAssignConstraint(expr: AnalysisExpression<VData>, left: Vertex<VData>, right: Vertex<VData>) {
        const leftExpressions = _parseArrayLiteralVertex(left);
        const rightExpressions = _parseArrayLiteralVertex(right);

        assert(leftExpressions.length === rightExpressions.length);

        // Create fake simpler assignments
        for (let i = 0; i < leftExpressions.length; ++i) {
            // TODO: with less boilerplate :-/
            const fakeAssignment = new Vertex<VData>(null);
            fakeAssignment.incoming = [
                new Edge(BINARY_EXPRESSION, [
                    leftExpressions[i],
                    {
                        id: null,
                        label: "=",
                        data: null,
                        outgoing: null,
                        incoming: null,
                    },
                    rightExpressions[i],
                ]),
            ];

            this.addConstraint(_createAnalysisExpression(fakeAssignment, expr.scope));
        }
    }

    private _resolveWriteConstraint(scope, left, right: Vertex<VData>) {
        const scopeVertex = this._resolveScope(scope);
        const readConstraint = this._resolveConstraint(right, scopeVertex);
        const writeConstraint = this._resolveConstraint(left, scopeVertex);

        assert(!writeConstraint.type);

        // Connect read and write
        const linkType = readConstraint.type || LINK_TYPES.ASSIGNMENT;
        this._link(linkType, readConstraint.bottom, writeConstraint.bottom);

        // Connect objects to scope
        [readConstraint, writeConstraint].forEach(({top, bottom, type}) => {
            // Don't connect bottom to scope if this is not an assignment constraint
            const v = type ? top : top || bottom;

            if (!v) return;

            // Already connected to scope
            if (v.outgoing.some(_ => _.label === LINK_TYPES.SCOPE)) {
                return;
            }

            // Allow same name under different scopes
            if (!isGlobalName(v.label) && scopeVertex) {
                this._link(LINK_TYPES.SCOPE, v, scopeVertex);
            }
        });
    }

    private _resolveScope(vertex: Vertex<VData>): Vertex {
        const {label, outgoing} = vertex;
        const scopeVertex = this._getVertexByLabel(label);

        assert(outgoing.length === 1);

        const parentScopeDefinitions = getClosestScopeNameRouteDefinition({vertex});
        const parentScopeMatches = this.matcher.collectPatternDefinition(parentScopeDefinitions);

        if (parentScopeMatches.length) {
            assert(parentScopeMatches.length === 1);

            const [[_, parentScope]] = parentScopeMatches;
            const parentScopeVertex = this._resolveScope(parentScope);

            const [__, label] = getOutgoingEdgeAndLabel(parentScope);
            const linkType = label === Syntax.CLASS_DECLARATION ? LINK_TYPES.CLASS : LINK_TYPES.PARENT_SCOPE;
            this._link(linkType, scopeVertex, parentScopeVertex);
        }

        return scopeVertex;
    }

    private _resolveConstraint(vertex: Vertex<VData>, scope?: Vertex): ResolvedConstraint {
        // TODO: deal with context (e.g. Call Expression)
        const [edge, label] = getEdgeAndLabel(vertex);

        // Simple name vertex
        if (!edge) {
            // TODO: deal with special values - this, null, undefined
            const vertex = this._getVertexByLabel(label, scope);
            return {top: null, bottom: vertex};
        }

        switch (label) {
            case Syntax.NEW_EXPRESSION: {
                const {type} = _parseNewExpression(edge);

                // TODO: args!
                return this._createNewMemoryLocation(type.label, scope);
            }
            case Syntax.OBJECT_LITERAL_EXPRESSION: {
                const properties = _parseObjectLiteralVertex(edge);

                // TODO: work this out (since there are more reads)
                assert(properties.length === 0);

                // TODO: args!
                return this._createNewMemoryLocation(Object.name, scope);
            }
            case Syntax.PROPERTY_ACCESS_EXPRESSION: {
                const {base, prop} = _parsePropertyAccessExpression(edge);
                const {bottom: baseBottom, top: baseTop, type: baseType} = this._resolveConstraint(base, scope);
                const {bottom: propBottom, top: propTop, type: propType} = this._resolveConstraint(prop, scope);

                assert(!baseType);
                assert(!propType);
                assert(!propTop);

                // TODO: add field link
                this._link(LINK_TYPES.FIELD, propBottom, baseBottom);

                return {top: baseTop || baseBottom, bottom: propBottom};
            }
            case Syntax.CALL_EXPRESSION: {
                const {caller, args} = _parseCallExpression(edge);
                const {bottom, top, type} = this._resolveConstraint(caller, scope);

                // TODO: deal with args

                assert(!type);

                return {bottom, top, type: LINK_TYPES.INVOCATION};
            }
            case Syntax.ARROW_FUNCTION: {
                // TODO: bind `this` inside arrow
                // TODO: parse it and give it a name?
                const vertex = this._getVertexByLabel("undefined", scope);
                return {top: null, bottom: vertex};
            }
            default:
                throw Error(`Don't know what to do wih ${label} vertex`);
        }
    }

    private _getVertexByLabel(label: string, scope?: Vertex): Vertex {
        const vertices = Array.from(lazyFilter(this.peg.vertices.values(), v => v.label === label));

        assert(vertices.length <= 1);

        // Known name - verify that the scope is the same
        if (vertices.length !== 0) {
            const vertex = vertices[0];
            const scopeEdges = vertex.outgoing.filter(_ => _.label === LINK_TYPES.SCOPE)

            // Some objects won't have a scope, like null or classes
            if (!scope || scopeEdges.length === 0) return vertex;

            assert(scopeEdges.length === 1);

            const existingScope = scopeEdges[0].target;
            if (scope === existingScope) {
                return vertex;
            }
        }

        return this.peg._fresh(label);
    }

    private _createNewMemoryLocation(type: string, scope?: Vertex): ResolvedConstraint {
        // TODO: include data like line, ctor args etc...

        const vertex = this._getVertexByLabel(type, scope);
        return {top: null, bottom: vertex, type: "INSTANTIATION"};
    }

    private _link(type: string, source, target: Vertex) {
        // TODO: get rid of this
        if (this.peg.edges.some(e => e.label === type && e.target === target && e.sources.indexOf(source) !== -1)) {
            return;
        }

        this.peg.add([new Edge(type, [source], target)]);
    }
}

// TODO: move into syntax or something!
const GLOBAL_NAMES = new Set([
    "null",
    "undefined",
]);

function isGlobalName(name: string): boolean {
    return GLOBAL_NAMES.has(name);
}

function _isArrayLiteralVertex(vertex: Vertex): boolean {
    return vertex.incoming &&
        vertex.incoming.length === 1 &&
        vertex.incoming[0].label === Syntax.ARRAY_LITERAL_EXPRESSION;
}

function _parseArrayLiteralVertex(vertex: Vertex): Vertex[] {
    assert(_isArrayLiteralVertex(vertex));

    // TODO: with pattern syntax
    const [edge] = vertex.incoming;
    assert(edge.sources.length === 3);

    const [lparan, syntaxList, rparan] = edge.sources;
    assert(lparan.label === "[");
    assert(rparan.label === "]");

    return _parseSyntaxList(syntaxList);
}

function _parseObjectLiteralVertex(edge: Edge): Vertex[] {
    assert(edge.label === Syntax.OBJECT_LITERAL_EXPRESSION);

    const [lparan, syntaxList, rparan] = edge.sources;
    assert(lparan.label === "{");
    assert(rparan.label === "}");

    // TODO: this may be completely wrong (try with actual properties)
    return _parseSyntaxList(syntaxList);
}

function _parseSyntaxList(vertex: Vertex): Vertex[] {
    const [edge, label] = getEdgeAndLabel(vertex);
    assert(label === Syntax.SYNTAX_LIST);

    return edge.sources.filter(_ => _.label !== ",");
}

function _parsePropertyAccessExpression(edge: Edge): { base: Vertex, prop: Vertex } {
    assert(edge.label === Syntax.PROPERTY_ACCESS_EXPRESSION);
    assert(edge.sources.length === 3);

    const [base, dot, prop] = edge.sources;
    assert(dot.label === ".");

    return {
        base,
        prop,
    };
}

function _parseCallExpression(edge: Edge): { caller: Vertex, args: Vertex[] } {
    assert(edge.label === Syntax.CALL_EXPRESSION);
    assert(edge.sources.length === 4);

    const [caller, lparan, args, rparan] = edge.sources;

    assert(lparan.label === "(");
    assert(rparan.label === ")");

    return {
        caller,
        args: _parseSyntaxList(args),
    };
}

function _parseNewExpression(edge: Edge): { type: Vertex, } {
    assert(edge.label === Syntax.NEW_EXPRESSION);
    assert(edge.sources.length === 2);

    // TODO: what about args?
    const [newKeyword, type] = edge.sources;

    assert(newKeyword.label === "new");

    // TODO: include defining file etc
    return {
        type,
    };
}

function stripGibberish(vertex: Vertex): Vertex {
    const [edge, label] = getEdgeAndLabel(vertex);
    if (!edge) {
        return vertex;
    }

    const {sources} = edge;

    switch (label) {
        case Syntax.TYPE_ASSERTION_EXPRESSION:
            // TODO: with pattern syntax
            assert(sources.length === 4);
            return sources[3];
        default:
            return vertex;
    }
}

function getEdgeAndLabel(vertex: Vertex): [Edge, string] {
    return _getEdgeAndLabel(vertex, vertex.incoming);
}

function _getEdgeAndLabel(vertex: Vertex, edgeGroup: Edge[]): [Edge, string] {
    if (!edgeGroup || edgeGroup.length !== 1) return [null, vertex.label];

    assert(edgeGroup.length === 1);

    const [edge] = edgeGroup;
    return [edge, edge.label];
}

function getOutgoingEdgeAndLabel(vertex: Vertex): [Edge, string] {
    return _getEdgeAndLabel(vertex, vertex.outgoing);
}
