import type { ObjectIterator, AllowedKeyType, MappingKey } from './types/common';
import { curry } from './curry';

type MapKeysMapping<T> = Partial<Record<keyof T, AllowedKeyType>>;
type MapKeysIterator<T> = ObjectIterator<T, AllowedKeyType>;

interface CurrinoMapKeys {
  <
    T extends object,
    R extends MappingKey<T, M>,
    M extends MapKeysMapping<T> = MapKeysMapping<T>
  >(mapping: M, data: T): R;
  <
    T extends object,
    R extends MappingKey<T, M>,
    M extends MapKeysMapping<T> = MapKeysMapping<T>
  >(mapping: M): (data: T) => R;
  <
    T extends object,
    R extends Record<ReturnType<I>, any>,
    I extends MapKeysIterator<T> = MapKeysIterator<T>
  >(iterator: I, data: T): R;
  <
    T extends object,
    R extends Record<ReturnType<I>, any>,
    I extends MapKeysIterator<T> = MapKeysIterator<T>
  >(iterator: I): (data: T) => R;
}

export const mapKeys: CurrinoMapKeys = curry((mapping: any, data: any) => {
  const object = Object(data);

  const result: Record<string, any> = {};

  Object.keys(object).forEach((key) => {
    const value = object[key];
    const newKey =
      (typeof mapping === 'function' ? mapping(value, key, object) : mapping[key]) ?? key;
    result[newKey] = value;
  });

  return result;
});
