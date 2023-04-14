import type { AllowedKeyType } from './types/common';
import { curry } from './curry';
import { forEachRight } from './forEachRight';

interface CurrinoFindTree {
  <T extends Record<AllowedKeyType, any>>(predicate: (node: T) => boolean | void): CurrinoFindTree1x1<T>;
  <T extends Record<AllowedKeyType, any>>(predicate: (node: T) => boolean | void, childrenKey: AllowedKeyType): CurrinoFindTree1x2<T>;
  <T extends Record<AllowedKeyType, any>>(predicate: (node: T) => boolean | void, childrenKey: AllowedKeyType, root: T): T | null;
}

interface CurrinoFindTree1x1<T> {
  (childrenKey: AllowedKeyType): CurrinoFindTree1x2<T>;
  (childrenKey: AllowedKeyType, root: T): T | null;
}

interface CurrinoFindTree1x2<T> {
  (root: T) : T | null;
}

export const findTree: CurrinoFindTree = curry((predicate: any, childrenKey: any, root: any) => {
  const stack: any[] = [root];

  while (stack.length) {
    const node = stack.pop()!;

    if (predicate(node)) {
      return node;
    }

    if (Array.isArray(node[childrenKey])) {
      forEachRight((item) => stack.push(item), node[childrenKey]);
    }
  }

  return null;
});
