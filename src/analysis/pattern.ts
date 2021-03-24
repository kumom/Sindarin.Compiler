import { Hypergraph } from "./hypergraph";
import type { Ast } from "../syntax/parser";

import Edge = Hypergraph.Edge;
import Vertex = Hypergraph.Vertex;

// @ts-ignore
function* lazyFlatMap<T, TResult>(
  arr: T[] | Generator<T, any, unknown>,
  map: (obj: T) => Generator<TResult, any, unknown>
): Generator<TResult, any, unknown> {
  for (let obj of arr) {
    yield* map(obj);
  }
}

// @ts-ignore
function* lazyFilter<T>(
  arr: T[] | Generator<T, any, unknown>,
  filter: (obj: T) => boolean
): Generator<T, any, unknown> {
  for (let obj of arr) {
    if (filter(obj)) {
      yield obj;
    }
  }
}

type Route<VData> = Vertex<VData>[];

interface PatternDefinitionPayload {
  vertexLabelPat?: LabelPat; // Pattern for vertex label matching
  visited?: Set<string>; // Visited nodes by `getRouteKey`
  firstOnly?: boolean;
}

function getRouteKey<VData>(route: Route<VData>) {
  return route.map((v) => v.id).join("|");
}

class HMatcher<VData = any> {
  g: Hypergraph<VData>;

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
    const p = HMatcher.toObjectWithLabel(label);
    return this._matched(() => lazyFilter<Edge>(this.g.edges, p));
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
    const p = HMatcher.toObjectWithLabel(label);
    return this._matched(() => lazyFilter<Edge>(source.outgoing, p));
  }

  /**
   * Matches by edge label & target -- reflexive-transitive.
   * @param target path end point
   * @param label label(s) of final edge
   */
  lt_rtc(target: Vertex<VData>, label: LabelPat, excluding?: LabelPat) {
    const p = HMatcher.toObjectWithLabel(label);
    const pExclude = HMatcher.toObjectWithLabel(excluding, { negate: true });

    function* aux(v: Vertex) {
      for (let e of lazyFilter<Edge>(v.incoming, pExclude)) {
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
   * @param label label(s) of final edge
   */
  sl_rtc(source: Vertex<VData>, label: LabelPat, excluding?: LabelPat) {
    const p = HMatcher.toObjectWithLabel(label);
    const pExclude = HMatcher.toObjectWithLabel(excluding, { negate: true });

    function* aux(v: Vertex) {
      for (let e of lazyFilter<Edge>(v.outgoing, pExclude)) {
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
  resolvePatternDefinitions(
    pattern: HMatcher.RoutePatternDefinition,
    handler: (route: Route<VData>) => void
  ) {
    const { definitions, firstOnly } = pattern;

    if (!definitions || !definitions.length) {
      throw new Error("Cannot resolve match without definitions");
    }

    const [firstDefinition, ...restOfDefinitions] = definitions;

    const { labelPred, vertex, through, modifier, excluding } = firstDefinition;
    if (through || modifier || excluding) {
      throw new Error(
        "First definition can only define `labelPred` or `vertex`"
      );
    }

    const startingSet = vertex ? this.v(vertex) : this.l(labelPred);
    const vertexLabelPat = vertex ? vertex.label : null;
    const visited = new Set();

    startingSet.resolvePatternDefinitions(handler, restOfDefinitions, {
      vertexLabelPat,
      visited,
      firstOnly,
    });
  }
}

namespace HMatcher {
  export interface RoutePatternDefinition {
    definitions: PatternDefinition[];
    firstOnly?: boolean;
  }

  export interface PatternDefinition {
    labelPred?: LabelPat; // Label matcher
    vertex?: Vertex; // For first definition only!

    through?: "incoming" | "outgoing"; // Traversal direction
    modifier?: "rtc"; // Traversal type
    excluding?: LabelPat; // Exclude labels
    vertexLabelPat?: LabelPat; // Filter for vertices label
  }

  const THROUGH_TO_METHOD = {
    outgoing: "sl",
    incoming: "lt",
  };

  export type LabelPat = string | string[] | Set<string> | RegExp | LabelPred;
  export type LabelPred = (l: string) => boolean;
  export type ObjectWithLabel = (obj: { label: string }) => boolean;

  interface ObjectWithLabelPredOptions {
    negate?: boolean;
  }

  export function toObjectWithLabel(
    l: LabelPat,
    options?: ObjectWithLabelPredOptions
  ): ObjectWithLabel {
    if (options?.negate) {
      const { negate, ...rest } = options;
      const innerPred = this.toObjectWithLabel(l, rest);
      return (e) => !innerPred(e);
    }

    if (!l) {
      return () => false;
    }

    const labelPred = toLabelPred(l);
    return (e) => labelPred(e.label);
  }

  export function toLabelPred(l: LabelPat): LabelPred {
    if (typeof l == "string") return (s: string) => s == l;
    else if (Array.isArray(l)) return (s: string) => l.includes(s);
    else if (l instanceof Set) return (s: string) => l.has(s);
    else if (l instanceof RegExp) return (s: string) => !!s.match(l);
    else return l;
  }

  export const LANY: LabelPat = () => true;
  export const LANY_LABEL: ObjectWithLabel = () => true;

  export class Matched<VData = any> {
    matcher: HMatcher<VData>;
    gen: Generator<Edge>;

    constructor(matcher: HMatcher<VData>, genf: () => Generator<Edge>) {
      this.matcher = matcher;
      this.gen = genf();
    }

    e(cont: (e: Edge) => void | boolean) {
      // iterates edges
      for (let e of this.gen) cont(e);
    }

    t(cont: (t: Vertex<VData>) => void | boolean, labelPat?: LabelPat) {
      // iterates edge targets
      const p = !labelPat ? LANY_LABEL : toObjectWithLabel(labelPat);
      this.e((e) => p(e.target) && cont(e.target));
    }

    s(cont: (t: Vertex<VData>) => void | boolean, labelPat?: LabelPat) {
      // iterates edge sources
      const p = !labelPat ? LANY_LABEL : toObjectWithLabel(labelPat);
      this.e((e) => {
        for (let u of lazyFilter<Vertex>(e.sources, p)) cont(u);
      });
    }

    si(idx: number, cont: (t: Vertex<VData>) => void | boolean) {
      // iterates edge sources with given index
      this.e((e) => {
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
      return this.first((e) => e.target);
    }

    s_first(idx: number = 0) {
      return this.first((e) => e.sources[idx]);
    }

    resolvePatternDefinitions(
      handler: (route: Vertex<VData>[]) => void,
      definitions: PatternDefinition[],
      payload: PatternDefinitionPayload,
      route?: Route<VData>
    ): boolean {
      const [nextDefinition, ...restOfDefinitions] =
        definitions && definitions.length ? definitions : [null];
      const { labelPred, vertex, through, modifier, excluding } =
        nextDefinition || {};

      const methodBase = THROUGH_TO_METHOD[through];
      const method = modifier ? `${methodBase}_${modifier}` : methodBase;
      const isRouteDone = !nextDefinition;

      if (!isRouteDone) {
        if (vertex) {
          throw new Error("Inner match definitions cannot define `vertex`");
        }

        if (!through) {
          throw new Error("Inner match definitions must define `through`");
        }

        if (modifier != "rtc" && excluding) {
          throw new Error(
            "Inner match definitions must be `rtc` to define `excluding`"
          );
        }

        if (!this.matcher[method]) {
          throw new Error(`Method ${method} does not exist on HMatcher`);
        }
      }

      let found = false;
      const { vertexLabelPat, visited, firstOnly } = payload;

      const routeHandler = (u) => {
        if (found && firstOnly) {
          return;
        }

        const extendedRoute = route ? [...route, u] : [u];

        // Dedupe routes
        const routeKey = getRouteKey(extendedRoute);
        if (visited.has(routeKey)) {
          return;
        }

        visited.add(routeKey);

        // Not done yet
        if (!isRouteDone) {
          const subquery: Matched<VData> = this.matcher[method](
            u,
            labelPred,
            excluding
          );
          const nextPayload = {
            ...payload,
            vertexLabelPat: nextDefinition.vertexLabelPat,
          };

          found = subquery.resolvePatternDefinitions(
            handler,
            restOfDefinitions,
            nextPayload,
            extendedRoute
          );
          return;
        }

        found = true;
        handler(extendedRoute);
        return;
      };

      this.s(routeHandler, vertexLabelPat);
      return found;
    }
  }

  export class Memento {
    edges: { [key: string]: Edge } = {};

    /** @oops I'd like to use a static type with `keyof` here somehow */

    e(key: string) {
      const self = this;
      return <VData>(m: Matched<VData>) =>
        new Matched<VData>(m.matcher, function* () {
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
    return <S>(cont: (t: T) => S) => (t: T) => (pred(t) ? cont(t) : undefined);
  }

  export function byLabel<T extends { label: string }>(
    label: string | string[]
  ) {
    if (!Array.isArray(label)) label = [label];
    return filtered<T>((u) => label.includes(u.label));
  }

  /**
   * Ast-specific functionality.
   * (Ideally, all the data should be in the graph, but sometimes it is not.)
   */
  export namespace Ast {
    export function by<D extends { ast: Ast }>(pred: (ast: Ast) => boolean) {
      return filtered<Vertex<D>>((u) => {
        let ast = u.data?.ast;
        return !!ast && pred(ast);
      });
    }

    export function byNodeType<D extends { ast: Ast }>(nodeType: string) {
      return by<D>((ast) => ast.type === nodeType);
    }
  }
}

import LabelPat = HMatcher.LabelPat;
import Matched = HMatcher.Matched;

export { HMatcher };
