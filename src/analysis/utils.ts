import * as Syntax from "./syntax";

export function* lazyFlatMap<T, TResult>(arr: Iterable<T>, map: (obj: T) => Generator<TResult>): Generator<TResult> {
    if (!arr) return;

    for (let obj of arr) {
        yield* map(obj);
    }
}

export function* lazyFilter<T>(arr: Iterable<T>, filter: (obj: T) => boolean): Generator<T> {
    if (!arr) return;

    for (let obj of arr) {
        if (filter(obj)) {
            yield obj;
        }
    }
}

const DEFAULT_VALUES = {
    "null": null,
    "undefined": undefined,
};

export function toSubtreeString(vertex: Vertex, sep = " ", includeSyntaxTokens = false): string {
    const allTokens = toSubtreeStringVertexGen(vertex);
    const relevantTokens = includeSyntaxTokens ? allTokens : lazyFilter(allTokens, Syntax.isNonSyntaxToken);
    const result = Array.from(relevantTokens).join(sep);

    return result in DEFAULT_VALUES ? DEFAULT_VALUES[result] : result;
}

function* toSubtreeStringVertexGen(vertex: Vertex): Generator<string> {
    const {label} = vertex;
    if (label) {
        yield label;
    }

    yield* lazyFlatMap(vertex.incoming, toSubtreeStringEdgeGen);
}

function* toSubtreeStringEdgeGen(edge: Edge): Generator<string> {
    yield edge.label;
    yield* lazyFlatMap(edge.sources, toSubtreeStringVertexGen);
}
