import { AllowedKeyType } from './types/common';

export function searchTree<T extends Record<AllowedKeyType, any>>(
  predicate: (node: T) => boolean,
  childrenKey: keyof T,
  root: T
): T | null {
  if (predicate(root)) {
    return root;
  }

  if (Array.isArray(root[childrenKey])) {
    const children: T[] = [];

    for (let i = 0; i < root[childrenKey].length; i++) {
      const current = searchTree(predicate, childrenKey, root[childrenKey][i]);
      if (current) {
        children.push(current);
      }
    }

    return children.length > 0 ? { ...root, children } : null;
  }

  return null;
}
