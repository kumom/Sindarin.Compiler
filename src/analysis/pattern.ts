import {Hypergraph} from './hypergraph';
import {Ast} from '../ide/panels/ast-panel';

import Edge = Hypergraph.Edge;
import Vertex = Hypergraph.Vertex;

// @ts-ignore
function* lazyFlatMap<T, TResult>(arr: T[] | Generator<T, any, unknown>, map: (obj: T) => Generator<TResult, any, unknown>): Generator<TResult, any, unknown> {
    for (let obj of arr) {
        yield* map(obj);
    }
}

// @ts-ignore
function* lazyFilter<T>(arr: T[] | Generator<T, any, unknown>, filter: (obj: T) => boolean): Generator<T, any, unknown> {
    for (let obj of arr) {
        if (filter(obj)) {
            yield obj;
        }
    }
}

class HMatcher<VData = any> {
    g: Hypergraph<VData>

    constructor(g: Hypergraph<VData>) {
        this.g = g;
    }

    private _matched(genf: () => Generator<Edge>) {
        return new Matched(this, genf);
    }

    /**
     * Matches edges by label.
     * @param label
     */
    l(label: LabelPat) {
        const p = HMatcher.toEdgePred(label);
        return this._matched(() => lazyFilter(this.g.edges, p))
    }

    /**
     * Matches a specific vertex, and yields outgoing edges
     * @param v
     */
    v(v: Vertex<VData>) {
        function* aux() {
            yield* v.outgoing;
        }

        return this._matched(() => aux());
    }

    /**
     * Matches by edge source & label.
     * @param source start point
     * @param label
     */
    sl(source: Vertex<VData>, label: LabelPat) {
        const p = HMatcher.toEdgePred(label);
        return this._matched(() => lazyFilter(source.outgoing, p));
    }

    /**
     * Matches by edge source & label. (but only the first one, if it matches)
     * @param source start point
     * @param label
     */
    sl_first(source: Vertex<VData>, label: LabelPat) {
        const p = HMatcher.toEdgePred(label);
        return this._matched(() => lazyFilter(source.outgoing.slice(0, 1), p));
    }

    /**
     * Matches by edge label & target -- reflexive-transitive.
     * @param target path end point
     * @param label label(s) of all edges along path
     */
    lt_rtc(target: Vertex<VData>, label: LabelPat, excluding?: LabelPat) {
        const p = HMatcher.toEdgePred(label);
        const pExclude = HMatcher.toEdgePred(excluding, { negate: true });

        function* aux(v: Vertex) {
            for (let e of lazyFilter(v.incoming, pExclude)) {
                const handled = p(e) ? yield e : false;
                if (!handled) {
                    yield* lazyFlatMap(e.sources, aux);
                }
            }
        }

        return this._matched(() => aux(target));
    }

    /**
     * Matches by edge source & label -- reflexive-transitive.
     * @param source start point
     * @param label label(s) of all edges along path
     */
    sl_rtc(source: Vertex<VData>, label: LabelPat, excluding?: LabelPat) {
        const p = HMatcher.toEdgePred(label);
        const pExclude = HMatcher.toEdgePred(excluding, { negate: true });

        function* aux(v: Vertex) {
            for (let e of lazyFilter(v.outgoing, pExclude)) {
                const handled = p(e) ? yield e : false;
                if (!handled) {
                    yield* aux(e.target);
                }
            }
        }

        return this._matched(() => aux(source));
    }

    /**
     * Perform complex traversal via a list of PatternDefinition objects
     * @param definitions how to traverse the graph
     */
    resolvePatternDefinitions(definitions: HMatcher.PatternDefinition[], handler: (route: Vertex<VData>[]) => void) {
        if (!definitions || !definitions.length) {
            throw new Error("Cannot resolve match without definitions");
        }

        const [firstDefinition, ...restOfDefinitions] = definitions;

        const {labelPred, vertex, through, modifier, excluding} = firstDefinition;
        if (through || modifier || excluding) {
            throw new Error("First definition can only define `labelPred` or `vertex`")
        }

        const startingSet = vertex ? this.v(vertex) : this.l(labelPred);
        startingSet.resolvePatternDefinitions(handler, restOfDefinitions);
    }
}


namespace HMatcher {

    export interface PatternDefinition {
        labelPred?: LabelPat;  // Label matcher
        vertex?: Vertex; // For first definition only!

        through?: "sources" | "targets";  // Traversal direction
        modifier?: "rtc" | "first"; // Traversal type
        excluding?: LabelPat; // Exclude labels
    }

    const THROUGH_TO_METHOD = {
        "sources": "sl",
        "targets": "lt",
    };

    export type LabelPat = string | string[] | Set<string> | RegExp | LabelPred
    export type LabelPred = (l: string) => boolean
    export type EdgePred = (e: Edge) => boolean

    interface EdgePredOptions {
        negate?: boolean;
    }

    export function toEdgePred(l: LabelPat, options?: EdgePredOptions): EdgePred {
        if (options?.negate) {
            const { negate, ...rest } = options;
            const edgePred = this.toEdgePred(l, rest);
            return e => !edgePred(e);
        }

        if (!l) {
            return () => false;
        }

        const labelPred = toLabelPred(l);
        return e => labelPred(e.label);
    }

    export function toLabelPred(l: LabelPat): LabelPred {
        if (typeof l == 'string') return (s: string) => s == l;
        else if (Array.isArray(l)) return (s: string) => l.includes(s);
        else if (l instanceof Set) return (s: string) => l.has(s);
        else if (l instanceof RegExp) return (s: string) => !!s.match(l);
        else return l;
    }

    export const LANY: LabelPat = () => true;

    export class Matched<VData = any> {
        matcher: HMatcher<VData>;
        gen: Generator<Edge>;

        constructor(matcher: HMatcher<VData>, genf: () => Generator<Edge>) {
            this.matcher = matcher;
            this.gen = genf();
        }

        e(cont: (e: Edge) => void | boolean) {  // iterates edges
            for (let e of this.gen) cont(e)
        }

        t(cont: (t: Vertex<VData>) => void | boolean) {  // iterates edge targets
            this.e(e => cont(e.target));
        }

        s(cont: (t: Vertex<VData>) => void | boolean) {  // iterates edge sources
            this.e(e => {
                for (let u of e.sources) cont(u);
            });
        }

        si(idx: number, cont: (t: Vertex<VData>) => void | boolean) {  // iterates edge sources with given index
            this.e(e => {
                let u = e.sources[idx];
                u && cont(u);
            });
        }

        first<T>(f: (e: Edge) => T) {
            for (let e of this.gen) {
                var va = f(e);
                if (va) return va;
            }
        }

        t_first() {
            return this.first(e => e.target);
        }

        s_first(idx: number = 0) {
            return this.first(e => e.sources[idx]);
        }

        resolvePatternDefinitions(handler: (route: Vertex<VData>[]) => void, definitions: PatternDefinition[], route?: Vertex<VData>[]) {
            const [nextDefinition, ...restOfDefinitions] = definitions && definitions.length ? definitions : [null];

            this.t(u => {
                const extendedRoute = route ? [...route, u] : [u];

                if (!nextDefinition) {
                    handler(extendedRoute);
                    return;
                }

                const {labelPred, vertex, through, modifier, excluding} = nextDefinition;

                if (vertex) {
                    throw new Error("Inner match definitions cannot define `vertex`");
                }

                if (!through) {
                    throw new Error("Inner match definitions must define `through`");
                }

                if (modifier != "rtc" && excluding) {
                    throw new Error("Inner match definitions must be `rtc` to define `excluding`");
                }

                const methodBase = THROUGH_TO_METHOD[through];
                const method = modifier ? `${methodBase}_${modifier}` : methodBase;

                if (!this.matcher[method]) {
                    throw new Error(`Method ${method} does not exist on HMatcher`);
                }

                const subquery: Matched<VData> = this.matcher[method](u, labelPred, excluding);
                subquery.resolvePatternDefinitions(handler, restOfDefinitions, extendedRoute);
            });
        }
    }

    export class Memento {
        edges: { [key: string]: Edge } = {}

        /** @oops I'd like to use a static type with `keyof` here somehow */

        e(key: string) {
            const self = this;
            return <VData>(m: Matched<VData>) => new Matched<VData>(m.matcher, function* () {
                for (let e of m.gen) {
                    self.edges[key] = e;
                    yield e;
                }
            });
        }
    }

    /**
     * Curried filter decorator for continuations (convenience function).
     * @param pred filter predicate
     */
    export function filtered<T>(pred: (t: T) => boolean) {
        return <S>(cont: (t: T) => S) => (t: T) => pred(t) ? cont(t) : undefined;
    }

    export function byLabel<T extends { label: string }>(label: string | string[]) {
        if (!Array.isArray(label)) label = [label];
        return filtered<T>(u => label.includes(u.label));
    }

    /**
     * Ast-specific functionality.
     * (Ideally, all the data should be in the graph, but sometimes it is not.)
     */
    export namespace Ast {
        export function by<D extends { ast: Ast }>(pred: (ast: Ast) => boolean) {
            return filtered<Vertex<D>>(u => {
                let ast = u.data?.ast;
                return !!ast && pred(ast);
            });
        }

        export function byNodeType<D extends { ast: Ast }>(nodeType: string) {
            return by<D>(ast => ast.type === nodeType);
        }
    }
}

import LabelPat = HMatcher.LabelPat;
import Matched = HMatcher.Matched;


export {HMatcher}
