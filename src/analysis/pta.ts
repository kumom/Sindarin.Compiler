import {Hypergraph} from "./hypergraph";
import {HMatcher} from "./pattern";
import RoutePatternDefinition = HMatcher.RoutePatternDefinition;
import {SCOPES, VARIABLE_DECLARATION, PARAMETER, EXPRESSIONS} from "./syntax";
import Vertex = Hypergraph.Vertex;
import PatternDefinition = HMatcher.PatternDefinition;
import {getClosestScopeRouteDefinition} from "./semantics";


// TODO: add actual assignments, parameters and return value linking
const ASSIGNMENT_EXPRESSIONS = [VARIABLE_DECLARATION];


export function performPointsToAnalysis<VData>(sourcePeg: Hypergraph<VData>): Hypergraph<VData> {
    const scopeResolutionPeg = new Hypergraph();
    scopeResolutionPeg._max = sourcePeg._max;

    const m = new HMatcher(sourcePeg);

    // 1) Collect assignments
    const assignments = m.collectPatternDefinition(getClosestScopeRouteDefinition({
        labelPred: ASSIGNMENT_EXPRESSIONS,
        resolve: "targets",
    }));

    console.log(assignments)
    return scopeResolutionPeg;
}
