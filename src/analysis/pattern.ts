
import { Hypergraph } from './hypergraph';
import { Ast } from '../ide/panels/ast-panel';

import Edge = Hypergraph.Edge;
import Vertex = Hypergraph.Vertex;



class HMatcher<VData = any> {
    g: Hypergraph<VData>

    constructor(g: Hypergraph<VData>) {
        this.g = g;
    }

    /**
     * Matches edges by label.
     * @param label 
     */
    l(label: string | string[]) {
        const edges = this.g.edges;
        if (!Array.isArray(label)) label = [label];
        return new Matched(function *() {
            for (let e of edges)
                if (label.includes(e.label)) yield e;
        });
    }

    /**
     * Matches by edge source & label.
     * @param source start point
     * @param label 
     */
    sl(source: Vertex<VData>, label: string | string[]) {
        if (!Array.isArray(label)) label = [label];
        return new Matched(function *() {
            for (let e of source.outgoing)
                if (label.includes(e.label)) yield e;
        });
    }

    /**
     * Matches by edge label & target -- reflexive-transitive.
     * @param target path end point
     * @param label label(s) of all edges along path
     */
    lt_rtc(target: Vertex<VData>, label: string | string[]) {
        if (!Array.isArray(label)) label = [label];
        function *aux(v: Vertex) {
            for (let e of v.incoming) {
                if (label.includes(e.label)) {
                    var handled = yield e;
                    if (!handled) {
                        for (let u of e.sources) yield* aux(u);
                    }
                }
            }
        }
        return new Matched(() => aux(target));
    }

}


namespace HMatcher {

    export class Matched<VData = any> {
        gen: Generator<Edge>
        constructor(genf: () => Generator<Edge>) {
            this.gen = genf();
        }
        e(cont: (e:Edge) => void | boolean) {  // iterates edges
            for (let e of this.gen) cont(e)
        }
        t(cont: (t:Vertex<VData>) => void | boolean) {  // iterates edge targets
            this.e(e => cont(e.target));
        }
        s(cont: (t:Vertex<VData>) => void | boolean) {  // iterates edge sources
            this.e(e => { for (let u of e.sources) cont(u); });
        }
        si(idx: number, cont: (t:Vertex<VData>) => void | boolean) {  // iterates edge sources with given index
            this.e(e => { let u = e.sources[idx]; u && cont(u); });
        }
        first<T>(f: (e:Edge) => T) {
            for (let e of this.gen) {
                var va = f(e);
                if (va) return va;
            }
        }
        t_first() { return this.first(e => e.target); }
        s_first(idx: number = 0) { return this.first(e => e.sources[idx]); }
    }

    export class Memento {
        edges: {[key: string]: Edge} = {}  /** @oops I'd like to use a static type with `keyof` here somehow */

        e(key: string) {
            const self = this;
            return <VData>(m: Matched<VData>) => new Matched<VData>(function* () {
                for (let e of m.gen) { self.edges[key] = e; yield e; }
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

    /**
     * Ast-specific functionality.
     * (Ideally, all the data should be in the graph, but sometimes it is not.)
     */
    export namespace Ast {
        export function by<D extends {ast: Ast}>(pred: (ast: Ast) => boolean) {
            return filtered((u: Vertex<D>) => {
                let ast = u.data?.ast;
                return !!ast && pred(ast);
            });
        }

        export function byNodeType<D extends {ast: Ast}>(nodeType: string) {
            return by<D>(ast => ast.type === nodeType);
        }
    }
}

import Matched = HMatcher.Matched;



export { HMatcher }