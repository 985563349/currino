import type { Key } from './types/common';
import { forEachRight } from './forEachRight';

export function findTree<T extends Record<Key, any>>(
  iteratee: (node: T) => boolean | void,
  childrenKey: keyof T,
  root: T
): T | null {
  const stack: T[] = [root];

  while (stack.length) {
    const node = stack.pop()!;

    if (iteratee(node)) {
      return node;
    }

    if (Array.isArray(node[childrenKey])) {
      forEachRight((item) => {
        stack.push(item);
      }, node[childrenKey] as T[]);
    }
  }

  return null;
}
