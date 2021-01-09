import {Hypergraph} from "./hypergraph";
import {HMatcher} from "./pattern";
import PatternDefinition = HMatcher.PatternDefinition;
import {EXPRESSIONS, SCOPES, VARIABLE_DECLARATION} from "./syntax";
import Vertex = Hypergraph.Vertex;

/* u --(EXPRESSIONS)-->* v --(lscope)--> s */
/*
    m.l(EXPRESSIONS).t(u => {
        m.sl_rtc(u, 'lscope').t(lscope => {
            peg2.add([{label: 'nscope', sources: [u], target: lscope}]);
        });
    });
 */
export const NSCOPE_PATTERN_DEFINITIONS: PatternDefinition[] = [
    {labelPred: EXPRESSIONS},
    {labelPred: 'lscope', through: "sources", modifier: "rtc"},
];

export function resolveLexicalScope<VData>(peg: Hypergraph<VData>, vertex: Vertex): Hypergraph<VData> {
    const scopeResolutionPeg = new Hypergraph();
    scopeResolutionPeg._max = peg._max;

    const m = new HMatcher(peg);

    const DEFINITION_LABEL = 'DEFINITION';
    const {label} = vertex;

    const patternDefinition: PatternDefinition[] = [
        {   // Start with our vertex
            vertex,
            vertexLabelPat: label,
        },
        {   // Find all scopes it is defined under
            labelPred: SCOPES,
            through: "sources",
            modifier: "rtc",
            excluding: DEFINITION_LABEL,
        },
        {   // For each scope, find the variables declared (in this scope only) (TODO: this + arguments)
            labelPred: VARIABLE_DECLARATION,
            through: "targets",
            modifier: "rtc",
            excluding: [...SCOPES, DEFINITION_LABEL],
            vertexLabelPat: label,
        },
    ];

    const visited = new Set();

    m.resolvePatternDefinitions(patternDefinition, (route) => {
        const [use, ...rest] = route;
        const def = rest.pop();

        const key = `${use.id}|${def.id}`;

        // Key exists - TODO: make this automatic?
        if (visited.has(key) || vertex.outgoing.find(({label, target}) => label === DEFINITION_LABEL && target.id === def.id)) {
            return;
        }

        visited.add(key);
        scopeResolutionPeg.add([{label: DEFINITION_LABEL, sources: [use], target: def}]);
    });

    return scopeResolutionPeg;
}
