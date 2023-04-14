import type { AllowedKeyType, GraphIteratee } from './types/common';
import { forEach } from './forEach';
import { curry } from './curry';

interface CurrinoEachTree {
  <T extends Record<AllowedKeyType, any>>(iteratee: GraphIteratee<T, boolean | void>): CurrinoEachTree1x1<T>;
  <T extends Record<AllowedKeyType, any>>(iteratee: GraphIteratee<T, boolean | void>, childrenKey: AllowedKeyType): CurrinoEachTree1x2<T>;
  <T extends Record<AllowedKeyType, any>>(iteratee: GraphIteratee<T, boolean | void>, childrenKey: AllowedKeyType, root: T): T;
}

interface CurrinoEachTree1x1<T> {
  (children: AllowedKeyType): CurrinoEachTree1x2<T>;
  (children: AllowedKeyType, root: T): T;
}

interface CurrinoEachTree1x2<T> {
  (root: T): T;
}

export const eachTree: CurrinoEachTree = curry((iteratee: any, childrenKey: any, root: any) => {
  const traverse = (node: any, path: any[] = []) => {
    if (iteratee(node, path, root) === false) {
      return;
    }

    const children = node[childrenKey];

    if (Array.isArray(children)) {
      forEach((item, i) => traverse(item, [...path, childrenKey, i]), children);
    }
  };

  traverse(root);

  return root;
});
