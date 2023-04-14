import { AllowedKeyType } from './types/common';
import { curry } from './curry';

interface CurrinoSearchTree {
  <T extends Record<AllowedKeyType, any>>(predicate: (node: T) => boolean): CurrinoSearchTree1x1<T>;
  <T extends Record<AllowedKeyType, any>>(predicate: (node: T) => boolean, childrenKey: AllowedKeyType): CurrinoSearchTree1x2<T>;
  <T extends Record<AllowedKeyType, any>>(predicate: (node: T) => boolean, childrenKey: AllowedKeyType, root: T): T | null;
}

interface CurrinoSearchTree1x1<T> {
  (childrenKey: AllowedKeyType): CurrinoSearchTree1x2<T>;
  (childrenKey: AllowedKeyType, root: T): T | null;
}

interface CurrinoSearchTree1x2<T> {
  (root: T) : T | null;
}

export const searchTree: CurrinoSearchTree = curry((predicate: any, childrenKey: any, root: any) => {
  if (predicate(root)) {
    return root;
  }

  if (Array.isArray(root[childrenKey])) {
    const children: any[] = [];

    for (let i = 0; i < root[childrenKey].length; i++) {
      const current = searchTree(predicate, childrenKey, root[childrenKey][i]);
      if (current) {
        children.push(current);
      }
    }

    return children.length > 0 ? { ...root, children } : null;
  }

  return null;
});
