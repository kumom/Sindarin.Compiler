export function diff<T>(s1: Set<T>, s2: Iterable<T>) {
  s1 = new Set(s1);
  for (const el of s2) {
    s1.delete(el);
  }
  return s1;
}

export function union<T>(s1: Set<T>, s2: Iterable<T>) {
  s1 = new Set(s1);
  for (const el of s2) {
    s1.add(el);
  }
  return s1;
}

export function unionAll<T>(ss: Iterable<Set<T>>) {
  const u = new Set<T>();
  for (const s of ss) {
    addAll(u, s);
  }
  return u;
}

export function addAll<T>(s1: Set<T>, s2: Iterable<T>) {
  let changed = false;
  for (const el of s2) {
    if (!s1.has(el)) {
      changed = true;
      s1.add(el);
    }
  }
  return changed;
}
