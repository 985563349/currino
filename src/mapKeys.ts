import type { ObjectIteratee, AllowedKeyType } from './types/common';
import { curry } from './curry';

interface CurrinoMapKeys {
  <T extends Record<AllowedKeyType, any>>(iteratee: ObjectIteratee<T, AllowedKeyType>): CurrinoMapKeys1x1<T>;
  <T extends Record<AllowedKeyType, any>, R = Record<AllowedKeyType, T[keyof T]>>(iteratee: ObjectIteratee<T, AllowedKeyType>, data: T): R;
}

interface CurrinoMapKeys1x1<T> {
  <R = Record<AllowedKeyType, T[keyof T]>>(data: T): R
}

export const mapKeys: CurrinoMapKeys = curry((iteratee: any, object: any) => {
  const result: any = {};

  Object.keys(object).forEach((key) => {
    const value = object[key];
    const newKey = iteratee(value, key, object);
    result[newKey] = value;
  });

  return result;
});
