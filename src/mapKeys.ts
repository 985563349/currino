import {
  Dictionary,
  List,
  ListIteratee,
  NotVoid,
  ObjectIteratee,
} from './types/common';

export function mapKeys<T>(
  template: Record<number, NotVoid> | ListIteratee<T>,
  data: List<T>
): Dictionary<T>;

export function mapKeys<T extends object>(
  template: Record<keyof T, NotVoid> | ObjectIteratee<T>,
  data: T | null | undefined
): Dictionary<T[keyof T]>;

export function mapKeys(template: any, data: any) {
  const object = Object(data);

  const result: any = {};

  Object.keys(object).forEach((key) => {
    const value = object[key];
    const newKey =
      typeof template === 'function'
        ? template(value, key, object)
        : template[key];
    result[newKey] = value;
  });

  return result;
}
