import {Hypergraph} from "./hypergraph";
import {HMatcher} from "./pattern";
import RoutePatternDefinition = HMatcher.RoutePatternDefinition;
import {SCOPES, VARIABLE_DECLARATION} from "./syntax";
import Vertex = Hypergraph.Vertex;

// Not really, but close enough :shrug
const VARIABLE_NAME_REGEX = /^[a-z_][a-z\d_]*$/i;

const DEFINITION_LABEL = 'DEFINITION';


export function resolveLexicalScope<VData>(sourcePeg: Hypergraph<VData>, resultPeg: Hypergraph<VData>, vertex: Vertex): boolean {
    const m = new HMatcher(sourcePeg);

    const {label} = vertex;

    if (!label || !VARIABLE_NAME_REGEX.test(label)) {
        return false;
    }

    const pattern: RoutePatternDefinition = {
        firstOnly: true,  // Only choose closest match
        definitions: [
            {   // Start with our vertex
                vertex,
                vertexLabelPat: label,
            },
            {   // Find all scopes it is defined under
                labelPred: SCOPES,
                through: "outgoing",
                modifier: "rtc",
                excluding: [DEFINITION_LABEL, VARIABLE_DECLARATION],
            },
            {   // For each scope, find the variables declared (in this scope only) (TODO: this + arguments)
                labelPred: VARIABLE_DECLARATION,
                through: "incoming",
                modifier: "rtc",
                excluding: [...SCOPES, DEFINITION_LABEL],
                vertexLabelPat: label,
            },
        ],
    }


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
