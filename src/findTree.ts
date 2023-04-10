import type { AllowedKeyType } from './types/common';
import { forEachRight } from './forEachRight';

export function findTree<T extends Record<AllowedKeyType, any>>(
  predicate: (node: T) => boolean | void,
  childrenKey: keyof T,
  root: T
): T | null {
  const stack: T[] = [root];

  while (stack.length) {
    const node = stack.pop()!;

    if (predicate(node)) {
      return node;
    }

    if (Array.isArray(node[childrenKey])) {
      forEachRight((item) => stack.push(item), node[childrenKey] as T[]);
    }
  }

  return null;
}
