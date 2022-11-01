export type NotVoid = unknown;

export type PropertyName = string | number | symbol;

export type List<T> = ArrayLike<T>;

export interface Dictionary<T> {
  [index: string]: T;
}

export type PartialShallow<T> = {
  [P in keyof T]?: T[P] extends object ? object : T[P];
};

export type ListIterator<T, R> = (
  value: T,
  index: number,
  collection: List<T>
) => R;

export type ObjectIterator<T, R> = (
  value: T[keyof T],
  key: string,
  collection: T
) => R;

export type IterateeShorthand<T> =
  | PropertyName
  | [PropertyName, any]
  | PartialShallow<T>;

export type ListIteratee<T> = ListIterator<T, NotVoid> | IterateeShorthand<T>;

export type ObjectIteratee<T> =
  | ObjectIterator<T, NotVoid>
  | IterateeShorthand<T[keyof T]>;
