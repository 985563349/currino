import type { ObjectIterator, AllowedKeyType, MappingKey } from './types/common';

export function mapKeys<
  T,
  R extends MappingKey<T, M>,
  M extends Partial<Record<keyof T, AllowedKeyType>> = Partial<Record<keyof T, AllowedKeyType>>
>(mapping: M, data: T): R;
export function mapKeys<
  T,
  R extends Record<ReturnType<M>, any>,
  M extends ObjectIterator<T, AllowedKeyType> = ObjectIterator<T, AllowedKeyType>
>(mapping: M, data: T): R;

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
