import type { AllowedKeyType } from './types/common';
import { forEach } from './forEach';

export function eachTree<T extends Record<AllowedKeyType, any>>(
  callback: (node: T, path: AllowedKeyType[], root: T) => boolean | void,
  childrenKey: keyof T,
  root: T
) {
  const traverse = (node: T, path: AllowedKeyType[] = []) => {
    if (callback(node, path, root) === false) {
      return;
    }

    const children = node[childrenKey];

    if (Array.isArray(children)) {
      forEach((item, i) => traverse(item, [...path, childrenKey, i]), children as T[]);
    }
  };

  traverse(root);

  return root;
}
