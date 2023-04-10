import type { Key, DeepMappingKey } from './types/common';
import { mapKeys } from './mapKeys';

export function mapTree<T extends Record<Key, any>, M extends (node: T) => Record<Key, any>>(
  mapping: M,
  childrenKey: Key,
  root: T
): ReturnType<M>;
export function mapTree<T extends Record<Key, any>, M extends Partial<Record<keyof T, Key>>>(
  mapping: M,
  childrenKey: Key,
  root: T
): DeepMappingKey<T, M>;

export function mapTree(mapping: any, childrenKey: any, root: any) {
  const result = typeof mapping === 'function' ? mapping(root) : mapKeys(mapping, root);

  if (result) {
    const children = result[childrenKey];

    if (Array.isArray(children)) {
      result[childrenKey] = children.map((node) => mapTree(mapping, childrenKey, node));
    }
  }

  return result;
}
