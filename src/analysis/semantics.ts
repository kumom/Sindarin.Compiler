import {Hypergraph} from "./hypergraph";
import {HMatcher} from "./pattern";
import RoutePatternDefinition = HMatcher.RoutePatternDefinition;
import * as Syntax from "./syntax";
import Vertex = Hypergraph.Vertex;
import PatternDefinition = HMatcher.PatternDefinition;

// Not really, but close enough :shrug
const VARIABLE_NAME_REGEX = /^[a-z_][a-z\d_]*$/i;
const NUMBER_REGEX = /^\d*$/;
function isScopeName(name) {
    return name && VARIABLE_NAME_REGEX.test(name) && !NUMBER_REGEX.test(name) && !Syntax.RESERVED_KEYWORDS.has(name);
}


const DEFINITION_LABEL = 'DEFINITION';

interface ScopeResolutionOptions {
    routeOverrides?: RoutePatternDefinition;
    patternsUnderScope?: PatternDefinition[];
    excludedScopes?: string[];
}

export function getClosestScopeRouteDefinition(pattern: PatternDefinition, options: ScopeResolutionOptions): RoutePatternDefinition {
    const {routeOverrides, patternsUnderScope=[], excludedScopes=[]} = options;

    return {
        firstOnly: true,  // Only choose closest match
        reflexive: false,
        definitions: [
            pattern,  // Start with our expression
            {  // Find all scopes it is defined under
                labelPred: Syntax.SCOPES,
                through: "outgoing",
                modifier: "rtc",
                excluding: [DEFINITION_LABEL, Syntax.PARAMETER, ...excludedScopes],
            },
            ...patternsUnderScope,
        ],
        ...routeOverrides,
    };
}

export function getClosestScopeNameRouteDefinition(pattern: PatternDefinition, options?: ScopeResolutionOptions): RoutePatternDefinition {
    if (options && options.patternsUnderScope) {
        throw new Error("Can't specify patterns under scope in this case");
    }

    return getClosestScopeRouteDefinition(pattern, {
        ...options,
        patternsUnderScope: [{
            index: 0,
            labelPred: isScopeName,
        }]
    })
}

function _getClosestScopeRouteDefinitionForVertex<VData>(vertex: Vertex<VData>, ...patternsUnderScope: PatternDefinition[]): RoutePatternDefinition {
    const {label} = vertex;
    return getClosestScopeRouteDefinition({
        vertex,
        vertexLabelPat: label,
    }, {
        patternsUnderScope,
    });
}

export function resolveLexicalScope<VData>(sourcePeg: Hypergraph<VData>, resultPeg: Hypergraph<VData>, vertex: Vertex<VData>): boolean {
    const m = new HMatcher(sourcePeg);

    const {label} = vertex;

    // THIS can only be resolved in runtime context in some cases
    // can be optimized for classes though
    if (!label || label === "this" || !VARIABLE_NAME_REGEX.test(label)) {
        return false;
    }

    const pattern: RoutePatternDefinition = _getClosestScopeRouteDefinitionForVertex(vertex, {
        // For each scope, find the variables/parameters declared (in this scope only)
        labelPred: [Syntax.VARIABLE_DECLARATION, Syntax.PARAMETER],
        through: "incoming",
        modifier: "rtc",
        excluding: [...Syntax.SCOPES, DEFINITION_LABEL],
        vertexLabelPat: label,
    });

    m.resolvePatternDefinitions(pattern, (route) => {
        const [use, ...rest] = route;
        const def = rest.pop();

        // No sense in reflexivity here
        if (use === def) {
            return;
        }

        // Already applied transformation to graph
        if (vertex.outgoing.find(({label, target}) => label === DEFINITION_LABEL && target.id === def.id)) {
            return;
        }

        resultPeg.add([{label: DEFINITION_LABEL, sources: [use], target: def}]);
    });

    return true;
}
