import type { AllowedKeyType, DeepMappingKeys } from './types/common';
import { curry } from './curry';
import { mapKeys } from './mapKeys';

type MapKeysIteratee<T> = (node: T) => Record<AllowedKeyType, any>;
type MapTreeMapping<T> = Partial<Record<keyof T, AllowedKeyType>>;

interface CurrinoMapTree {
  <T extends Record<AllowedKeyType, any>>(iteratee: MapKeysIteratee<T>): CurrinoMapTree1x1<T>;
  <T extends Record<AllowedKeyType, any>>(iteratee: MapKeysIteratee<T>, childrenKey: AllowedKeyType): CurrinoMapTree1x2<T>;
  <T extends Record<AllowedKeyType, any>, R extends Record<AllowedKeyType, any>>(iteratee: MapKeysIteratee<T>, childrenKey: AllowedKeyType, root: T): R;
  <T extends Record<AllowedKeyType, any>, M extends MapTreeMapping<T> = MapTreeMapping<T>>(mapping: M): CurrinoMapTree2x1<T, M>;
  <T extends Record<AllowedKeyType, any>, M extends MapTreeMapping<T> = MapTreeMapping<T>>(mapping: M, childrenKey: AllowedKeyType): CurrinoMapTree2x2<T, M>;
  <T extends Record<AllowedKeyType, any>, M extends MapTreeMapping<T> = MapTreeMapping<T>, R extends DeepMappingKeys<T, M> = DeepMappingKeys<T, M>>(mapping: M, childrenKey: AllowedKeyType, root: T): R;
}

interface CurrinoMapTree1x1<T> {
  (childrenKey: AllowedKeyType): CurrinoMapTree1x2<T>;
  <R extends Record<AllowedKeyType, any>>(childrenKey: AllowedKeyType, root: T): R;
}

interface CurrinoMapTree1x2<T> {
  <R extends Record<AllowedKeyType, any>>(root: T): R;
}

interface CurrinoMapTree2x1<T, M extends MapTreeMapping<T>> {
  (childrenKey: AllowedKeyType): CurrinoMapTree2x2<T, M>;
  <R extends DeepMappingKeys<T, M>>(childrenKey: AllowedKeyType, root: T): R;
}

interface CurrinoMapTree2x2<T, M extends MapTreeMapping<T>> {
  <R extends DeepMappingKeys<T, M>>(root: T): R;
}

export const mapTree: CurrinoMapTree = curry((mapping: any, childrenKey: any, root: any) => {
  const result = typeof mapping === 'function' ? mapping(root) : mapKeys(mapping, root);

  if (result) {
    const children = result[childrenKey];

    if (Array.isArray(children)) {
      result[childrenKey] = children.map((node) => mapTree(mapping, childrenKey, node));
    }
  }

  return result;
});
