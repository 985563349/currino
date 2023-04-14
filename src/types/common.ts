export type AllowedKeyType = keyof any;

export type MappingKey<T, M extends Partial<Record<keyof T, AllowedKeyType>>> = {
  [P in keyof T as P extends keyof M ? (M[P] extends AllowedKeyType ? M[P] : never) : P]: T[P];
};

export type DeepMappingKey<T, M extends Partial<Record<keyof T, AllowedKeyType>>> = {
  [P in keyof T as P extends keyof M ? (M[P] extends AllowedKeyType ? M[P] : never) : P]: T[P] extends Array<infer Rest>
    ? M extends Partial<Record<keyof Rest, AllowedKeyType>>
      ? Array<DeepMappingKey<Rest, M>>
      : T[P] extends object
      ? T[P] extends Function
        ? T[P]
        : M extends Partial<Record<keyof T[P], AllowedKeyType>>
        ? DeepMappingKey<T[P], M>
        : T[P]
      : T[P]
    : T[P];
};

export type ArrayLikeIteratee<T, R> = (value: T, index: number, array: ArrayLike<T>) => R;

export type ObjectIteratee<T, R> = (value: T[keyof T], key: string, object: T) => R;

export type GraphIteratee<T, R> = (value: T, path: AllowedKeyType[], graph: T) => R
