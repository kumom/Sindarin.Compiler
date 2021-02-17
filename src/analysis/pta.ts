import {Hypergraph} from "./hypergraph";
import {HMatcher, toSubtreeString, lazyFilter} from "./pattern";
import * as Syntax from "./syntax";
import Vertex = Hypergraph.Vertex;
import {getClosestScopeRouteDefinition} from "./semantics";
import Edge = Hypergraph.Edge;
import assert from "assert";
import {BINARY_EXPRESSION} from "./syntax";


const ASSIGNMENT_EXPRESSIONS = [
    Syntax.VARIABLE_DECLARATION,
    Syntax.BINARY_EXPRESSION,
    Syntax.RETURN_STATEMENT,
    Syntax.CALL_EXPRESSION,
]

// TODO: Support parameters and return value linking
const SUPPORTED_ASSIGNMENT_EXPRESSIONS = new Set(ASSIGNMENT_EXPRESSIONS.slice(0, 2));

const ASSIGNMENT_FILTER = ([assignmentExpr, _]) => _filterAssignments(assignmentExpr);

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
    const assignments = m.collectPatternDefinition(getClosestScopeRouteDefinition({
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
    const analysis: PointsToAnalysis<VData> = new AndersenAnalyis(sourcePeg._max);
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

const ANALYSIS_EXPRESSION_FACTORY = ([assignmentExpr, scope]) => _createAnalysisExpression(assignmentExpr, scope);

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

class AndersenAnalyis<VData> implements PointsToAnalysis<VData> {
    peg: Hypergraph<VData>;

    constructor(max: number) {
        this.peg = new Hypergraph<VData>();
        this.peg._max = max;
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
        const readVertex = this._resolveConstraint(right);
        const writeVertex = this._resolveConstraint(left);

        // Connect read and write
        this._link("ASSIGNMENT", readVertex, writeVertex);

        // Connect objects to scope
        // TODO: save the need for a root search
        const connectRootToScope = (v: Vertex) => {
            // Already connected to scope
            const relevantOutgoing = v.outgoing.filter(_ => _.label === "FIELD");
            if (relevantOutgoing.some(_ => _.label === "SCOPE")) {
                return;
            }

            if (relevantOutgoing.length === 0) {
                this._link("SCOPE", v, scopeVertex);
                return;
            }

            // TODO: baaaaad
            assert(relevantOutgoing.length === 1);
            const {target} = relevantOutgoing[0];
            connectRootToScope(target);
        };

        connectRootToScope(readVertex);
        connectRootToScope(writeVertex);
    }

    private _resolveScope(vertex: Vertex<VData>): Vertex {
        let { label ,outgoing} = vertex;

        // TODO: less hacky
        assert (outgoing.length <= 1);
        if (outgoing.length === 1 && outgoing[0].label === Syntax.CONSTRUCTOR) {
            label = "constructor";
        }

        const scopeVertex = this._getVertexByLabel(label);

        // TODO: with patterns, multi-method/function/class etc...
        const connectScopeToClass = (v: Vertex) => {
            // Already connected to scope
            if (v.outgoing.length === 0) {
                return;
            }

            assert (v.outgoing.length === 1)

            const [edge] = v.outgoing;

            // TODO: parse class correctly (and support different scope kinds)
            if (edge.label === Syntax.CLASS_DECLARATION) {
                assert (edge.sources.length >= 2);

                const className = edge.sources[1].label;
                const classVertex = this._getVertexByLabel(className);

                this._link("CLASS", scopeVertex, classVertex);
                return;
            }

            connectScopeToClass(edge.target);
        };

        connectScopeToClass(vertex);

        return scopeVertex;
    }

    private _resolveConstraint(vertex: Vertex<VData>): Vertex {
        // TODO: deal with context (e.g. Call Expression)
        const [edge, label] = getEdgeAndLabel(vertex);

        // Simple name vertex
        if (!edge) {
            // TODO: deal with special values - this, null, undefined
            return this._getVertexByLabel(label);
        }

        switch (label) {
            case Syntax.NEW_EXPRESSION: {
                const {type} = _parseNewExpression(edge);

                // TODO: args!
                return this._createNewMemoryLocation(type.label);
            }
            case Syntax.OBJECT_LITERAL_EXPRESSION: {
                const properties = _parseObjectLiteralVertex(edge);

                // TODO: work this out somewhere (since there are more reads)
                assert(properties.length === 0);

                // TODO: args!
                return this._createNewMemoryLocation(Object.name);
            }
            case Syntax.PROPERTY_ACCESS_EXPRESSION: {
                const {base, prop} = _parsePropertyAccessExpression(edge);
                const baseVertex = this._resolveConstraint(base);
                const propVertex = this._resolveConstraint(prop);

                // TODO: add field link
                this._link("FIELD", propVertex, baseVertex);

                return propVertex;
            }
            case Syntax.CALL_EXPRESSION: {
                const {caller, args} = _parseCallExpression(edge);
                const callerVertex = this._resolveConstraint(caller);

                // TODO: deal with args
                // TODO: add invocation link

                return callerVertex;
            }
            default:
                throw Error(`Don't know what to do wih ${label} vertex`);
        }
    }

    private _getVertexByLabel(label: string): Vertex {
        // TODO: scope, etc...
        const vertices = Array.from(lazyFilter(this.peg.vertices.values(), v => v.label === label));

        assert(vertices.length <= 1);

        return vertices[0] || this.peg._fresh(label);
    }

    private _createNewMemoryLocation(type: string): Vertex {
        // TODO: include data like line, ctor args etc...

        return this._getVertexByLabel(type);
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
    const {incoming} = vertex;

    if (!incoming || incoming.length !== 1) return [null, vertex.label];

    assert(incoming.length === 1);

    const [edge] = incoming;
    return [edge, edge.label];
}
