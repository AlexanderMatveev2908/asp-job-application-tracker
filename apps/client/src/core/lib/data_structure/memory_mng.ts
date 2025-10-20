export class MemoryMng {
  // eslint-disable-next-line complexity
  public static cpy<T>(arg: T): T {
    if (arg === null || typeof arg === 'function' || typeof arg !== 'object') return arg;

    if (arg instanceof Date) return new Date(arg) as T;

    if (arg instanceof RegExp) return new RegExp(arg.source, arg.flags) as T;

    if (arg instanceof Set) return new Set(Array.from(arg, (v: T) => MemoryMng.cpy(v))) as T;

    if (arg instanceof Map)
      return new Map(
        Array.from(arg.entries(), ([k, v]: [T, T]) => [MemoryMng.cpy(k), MemoryMng.cpy(v)])
      ) as T;

    if (Array.isArray(arg)) return arg.map((v: T) => MemoryMng.cpy(v)) as T;

    const obj: Record<string, unknown> = {};

    for (const k in arg)
      if (Object.prototype.hasOwnProperty.call(arg, k)) obj[k] = MemoryMng.cpy(obj[k]);

    return obj as T;
  }

  // eslint-disable-next-line complexity
  public static isSame<T>(a: T, b: T): boolean {
    if (a === b) return true;

    if ([a, b].some((el: T) => typeof el !== 'object' || el === null)) return false;

    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();

    if (a instanceof RegExp && b instanceof RegExp)
      return a.source === b.source && a.flags === b.flags;

    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) if (!MemoryMng.isSame(a[i], b[i])) return false;

      return true;
    }

    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;

      for (const item of a) {
        let found = false;
        for (const other of b) {
          // eslint-disable-next-line max-depth
          if (MemoryMng.isSame(item, other)) {
            found = true;
            break;
          }
        }
        if (!found) return false;
      }
      return true;
    }

    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      for (const [key, valueA] of a.entries()) {
        if (!b.has(key)) return false;
        const valueB = b.get(key);
        if (!MemoryMng.isSame(valueA, valueB)) return false;
      }
      return true;
    }

    const keysA = Object.keys(a as object);
    const keysB = Object.keys(b as object);
    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
      const valA = (a as Record<string, unknown>)[key];
      const valB = (b as Record<string, unknown>)[key];
      if (!MemoryMng.isSame(valA, valB)) return false;
    }

    return true;
  }

  public static freeze<T>(arg: T): T {
    if (arg === null || typeof arg !== 'object') return arg;

    if (Object.isFrozen(arg)) return arg;

    if (Array.isArray(arg)) {
      arg.forEach((v: T) => MemoryMng.freeze(v));
    } else if (arg instanceof Map) {
      arg.forEach((v: T, k: T) => {
        MemoryMng.freeze(k);
        MemoryMng.freeze(v);
      });
    } else if (arg instanceof Set) {
      arg.forEach((v: T) => MemoryMng.freeze(v));
    } else {
      for (const k in arg)
        if (Object.prototype.hasOwnProperty.call(arg, k))
          MemoryMng.freeze((arg as Record<string, unknown>)[k]);
    }

    return Object.freeze(arg);
  }
}
