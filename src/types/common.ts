export type Key = string | number | symbol;

export type MappingKey<T, M extends Partial<Record<keyof T, Key>>> = {
  [P in keyof T as P extends keyof M ? (M[P] extends Key ? M[P] : never) : P]: T[P];
};

export type DeepMappingKey<T, M extends Partial<Record<keyof T, Key>>> = {
  [P in keyof T as P extends keyof M ? (M[P] extends Key ? M[P] : never) : P]: T[P] extends object
    ? T[P] extends Function
      ? T[P]
      : M extends Partial<Record<keyof T[P], Key>>
      ? DeepMappingKey<T[P], M>
      : T[P] extends Array<infer Rest>
      ? M extends Partial<Record<keyof Rest, Key>>
        ? Array<DeepMappingKey<Rest, M>>
        : T[P]
      : T[P]
    : T[P];
};

export type ArrayLikeIterator<T, R> = (value: T, index: number, array: ArrayLike<T>) => R;

export type ObjectIterator<T, R> = (value: T[keyof T], key: string, object: T) => R;
