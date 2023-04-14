import { AllowedKeyType } from './types/common';
import { curry } from './curry';

interface CurrinoSearchTree {
  <T extends Record<AllowedKeyType, any>>(predicate: (node: T) => boolean, childrenKey: AllowedKeyType, root: T): T | null;
  <T extends Record<AllowedKeyType, any>>(predicate: (node: T) => boolean, childrenKey: AllowedKeyType): (root: T) => T | null;
  <T extends Record<AllowedKeyType, any>>(predicate: (node: T) => boolean): (childrenKey: AllowedKeyType) => (root: T) => T | null;
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
