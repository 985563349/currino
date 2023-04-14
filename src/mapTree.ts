import type { AllowedKeyType, DeepMappingKey } from './types/common';
import { curry } from './curry';
import { mapKeys } from './mapKeys';

type MapTreeMapping<T> = Partial<Record<keyof T, AllowedKeyType>>;
type MapKeysIteratee<T> = (node: T) => Record<AllowedKeyType, any>;

interface CurrinoMapTree {
  <T extends Record<AllowedKeyType, any>, R extends Record<AllowedKeyType, any>>(iteratee: MapKeysIteratee<T>, childrenKey: AllowedKeyType, root: T): R;
  <T extends Record<AllowedKeyType, any>, R extends Record<AllowedKeyType, any>>(iteratee: MapKeysIteratee<T>, childrenKey: AllowedKeyType): (root: T) => R;
  <T extends Record<AllowedKeyType, any>, R extends Record<AllowedKeyType, any>>(iteratee: MapKeysIteratee<T>): (childrenKey: AllowedKeyType) => (root: T) => R;
  <T extends Record<AllowedKeyType, any>, R extends DeepMappingKey<T, M>, M extends MapTreeMapping<T> = MapTreeMapping<T>>(mapping: M, childrenKey: AllowedKeyType, root: T): R;
  <T extends Record<AllowedKeyType, any>, R extends DeepMappingKey<T, M>, M extends MapTreeMapping<T> = MapTreeMapping<T>>(mapping: M, childrenKey: AllowedKeyType): (root: T) => R;
  <T extends Record<AllowedKeyType, any>, R extends DeepMappingKey<T, M>, M extends MapTreeMapping<T> = MapTreeMapping<T>>(mapping: M): (childrenKey: AllowedKeyType) => (root: T) => R;
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
