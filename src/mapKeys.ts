import type { ObjectIterator, Key, MappingKey } from './types/common';

export function mapKeys<T, M extends Key>(mapping: ObjectIterator<T, M>, data: T): Record<Key, any>;
export function mapKeys<T, M extends Partial<Record<keyof T, Key>>>(
  mapping: M,
  data: T
): MappingKey<T, M>;

export function mapKeys(mapping: any, data: any) {
  const object = Object(data);

  const result: Record<string, any> = {};

  Object.keys(object).forEach((key) => {
    const value = object[key];
    const newKey =
      (typeof mapping === 'function' ? mapping(value, key, object) : mapping[key]) ?? key;
    result[newKey] = value;
  });

  return result;
}
