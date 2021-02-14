import {Hypergraph} from "./hypergraph";
import {HMatcher, toSubtreeString} from "./pattern";
import * as Syntax from "./syntax";
import Vertex = Hypergraph.Vertex;
import {getClosestScopeRouteDefinition} from "./semantics";


// TODO: add actual assignments, parameters and return value linking
const ASSIGNMENT_EXPRESSIONS = [Syntax.VARIABLE_DECLARATION, Syntax.BINARY_EXPRESSION];

const ASSIGNMENT_FILTER = ([assignmentExpr, _]) => _filterAssignments(assignmentExpr);
function _filterAssignments(assignmentExpr: Vertex): boolean {
    const {incoming} = assignmentExpr;
    if (!incoming || incoming.length !== 1) {
        throw new Error("Bad vertex");
    }

    const edge = incoming[0]
    const {label, sources} = edge;

    if (label === Syntax.BINARY_EXPRESSION) {
        return sources[1].label === "=";
    }

    return true;
}


export function performPointsToAnalysis<VData>(sourcePeg: Hypergraph<VData>): Hypergraph<VData> {
    const scopeResolutionPeg = new Hypergraph();
    scopeResolutionPeg._max = sourcePeg._max;

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
    })).map(ANALYSIS_FACTORY);

    console.log(assignments)

    // 2) Filter supported expressions
    const supportedAssignments = assignments.filter(expr => {
        // TODO
        return true;
    });

    // 3) Add to Andersen graph
    const analysis: PointsToAnalysis<VData> = new AndersenAnalyis();
    supportedAssignments.forEach(expr => {

    });

    // 4) Solve constraints
    const result = analysis.solveConstraints();

    // 5) Apply to HyperGraph
    result.forEach((key, value) => {
       // TODO: manipulate peg
    });

    // Profit
    return scopeResolutionPeg;
}

interface AnalysisExpression<VData> {
    assignmentExpr: Vertex<VData>;
    scope: Vertex<VData>;
    name: string;
    repr: string;
}

const ANALYSIS_FACTORY = ([assignmentExpr, scope]) => _createAnalysisExpression(assignmentExpr, scope);
function _createAnalysisExpression<VData>(assignmentExpr: Vertex<VData>, scope: Vertex<VData>): AnalysisExpression<VData> {
    const name = "";

    return {
        assignmentExpr,
        scope,
        name,
        repr: toSubtreeString(assignmentExpr),
    };
}

interface PointsToAnalysis<VData> {
    addConstraint(expr: AnalysisExpression<VData>);
    solveConstraints(): ReadonlyMap<AnalysisExpression<VData>, Vertex<VData>>;
}

class AndersenAnalyis<VData> implements PointsToAnalysis<VData> {
    addConstraint(expr: AnalysisExpression<VData>) {
    }

    solveConstraints(): ReadonlyMap<AnalysisExpression<VData>, Hypergraph.Vertex<VData>> {
        return new Map();
    }
}
