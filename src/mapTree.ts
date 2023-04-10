import type { AllowedKeyType, DeepMappingKey } from './types/common';
import { mapKeys } from './mapKeys';

export function mapTree<
  T extends Record<AllowedKeyType, any>,
  R extends DeepMappingKey<T, M>,
  M extends Partial<Record<keyof T, AllowedKeyType>> = Partial<Record<keyof T, AllowedKeyType>>
>(mapping: M, childrenKey: AllowedKeyType, root: T): R;
export function mapTree<
  T extends Record<AllowedKeyType, any>,
  R extends ReturnType<M>,
  M extends (node: T) => Record<AllowedKeyType, any> = (node: T) => Record<AllowedKeyType, any>
>(mapping: M, childrenKey: AllowedKeyType, root: T): R;

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
