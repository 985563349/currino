import { Key } from './types/common';

export function searchTree<T extends Record<Key, any>>(
  iteratee: (node: T) => boolean,
  childrenKey: keyof T,
  root: T
): T | null {
  if (iteratee(root)) {
    return root;
  }

  if (Array.isArray(root[childrenKey])) {
    const children: T[] = [];

    for (let i = 0; i < root[childrenKey].length; i++) {
      const current = searchTree(iteratee, childrenKey, root[childrenKey][i]);
      if (current) {
        children.push(current);
      }
    }

    return children.length > 0 ? { ...root, children } : null;
  }

  return null;
}
