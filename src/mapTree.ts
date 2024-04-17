import type { AllowedKeyType } from './types/common';
import { curry } from './curry';

type MapKeysIteratee<T> = (node: T) => Record<AllowedKeyType, any>;

interface CurrinoMapTree {
  <T extends Record<AllowedKeyType, any>>(iteratee: MapKeysIteratee<T>): CurrinoMapTree1x1<T>;
  <T extends Record<AllowedKeyType, any>>(iteratee: MapKeysIteratee<T>, childrenKey: AllowedKeyType): CurrinoMapTree1x2<T>;
  <T extends Record<AllowedKeyType, any>, R = Record<AllowedKeyType, any>>(iteratee: MapKeysIteratee<T>, childrenKey: AllowedKeyType, root: T): R;
}

interface CurrinoMapTree1x1<T> {
  (childrenKey: AllowedKeyType): CurrinoMapTree1x2<T>;
  <R = Record<AllowedKeyType, any>>(childrenKey: AllowedKeyType, root: T): R;
}

interface CurrinoMapTree1x2<T> {
  <R = Record<AllowedKeyType, any>>(root: T): R;
}

export const mapTree: CurrinoMapTree = curry((iteratee: any, childrenKey: any, root: any) => {
  const result = iteratee(root);

  if (result) {
    const children = result[childrenKey];

    if (Array.isArray(children)) {
      result[childrenKey] = children.map((node) => mapTree(iteratee, childrenKey, node));
    }
  }

  return result;
});
