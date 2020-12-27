

export function diff<T>(s1: Set<T>, s2: Iterable<T>) {
    s1 = new Set(s1); for (let el of s2) s1.delete(el);
    return s1;
}

export function union<T>(s1: Set<T>, s2: Iterable<T>) {
    s1 = new Set(s1); for (let el of s2) s1.add(el);
    return s1;
}

export function unionAll<T>(ss: Iterable<Set<T>>) {
    var u = new Set<T>(); for (let s of ss) addAll(u, s);
    return u;
}

export function addAll<T>(s1: Set<T>, s2: Iterable<T>) {
    var changed = false;
    for (let el of s2) if (!s1.has(el)) { changed = true; s1.add(el); }
    return changed;
}

