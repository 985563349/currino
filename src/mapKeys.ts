import type { ObjectIteratee, AllowedKeyType, MappingKeys } from './types/common';
import { curry } from './curry';

type MapKeysIteratee<T> = ObjectIteratee<T, AllowedKeyType>;
type MapKeysMapping<T> = Partial<Record<keyof T, AllowedKeyType>>;

interface CurrinoMapKeys {
  <T extends Record<AllowedKeyType, any>>(iteratee: MapKeysIteratee<T>): CurrinoMapKeys1x1<T>;
  <T extends Record<AllowedKeyType, any>, R extends Record<AllowedKeyType, any>>(iteratee: MapKeysIteratee<T>, data: T): R;
  <T extends Record<AllowedKeyType, any>, M extends MapKeysMapping<T> = MapKeysMapping<T>>(mapping: M): CurrinoMapKeys2x1<T, M>;
  <T extends Record<AllowedKeyType, any>, M extends MapKeysMapping<T> = MapKeysMapping<T>, R extends MappingKeys<T, M> = MappingKeys<T, M>>(mapping: M, data: T): R;
}

interface CurrinoMapKeys1x1<T> {
  <R extends Record<AllowedKeyType, any>>(data: T): R;
}

interface CurrinoMapKeys2x1<T, M extends MapKeysMapping<T>> {
  <R extends MappingKeys<T, M>>(data: T): R;
}

export const mapKeys: CurrinoMapKeys = curry((mapping: any, data: any) => {
  const object = Object(data);

  const result: any = {};

  Object.keys(object).forEach((key) => {
    const value = object[key];
    const newKey =
      (typeof mapping === 'function' ? mapping(value, key, object) : mapping[key]) ?? key;
    result[newKey] = value;
  });

  return result;
});
