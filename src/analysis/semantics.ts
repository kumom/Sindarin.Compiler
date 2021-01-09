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

    const patternDefinition: PatternDefinition[] = [
        {   // Start with our vertex
            vertex,
        },
        {   // Find all scopes it is defined under
            labelPred: SCOPES,
            through: "targets",
            modifier: "rtc",
        },
        {   // For each scope, find the variables declared (in this scope only) (TODO: this + arguments)
            labelPred: VARIABLE_DECLARATION,
            through: "sources",
            modifier: "rtc",
            excluding: SCOPES,
        },
        {   // For each variable declaration, only take those that define our param
            // TODO: for assignment it's the first, but this is not always the case (e.g. arg, this)
            labelPred: vertex.label,
            through: "sources",
            modifier: "first",
        }
    ];

    m.resolvePatternDefinitions(patternDefinition, (route) => {
        const [use, ...rest] = route;
        const def = rest.pop();

        scopeResolutionPeg.add([{label: 'DEFINITION', sources: [use], target: def}]);
    });

    return scopeResolutionPeg;
}
