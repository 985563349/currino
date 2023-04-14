export type AllowedKeyType = keyof any;

export type ExtractNullable<T> = T extends null | undefined ? T : never;

export type MappingKeys<T, M extends Partial<Record<keyof T, AllowedKeyType>>> = {
  [P in keyof T as P extends keyof M ? (M[P] extends AllowedKeyType ? M[P] : never) : P]: T[P];
};

export type DeepMappingKeys<T, M extends Partial<Record<keyof T, AllowedKeyType>>> = {
  [P in keyof T as P extends keyof M ? (M[P] extends AllowedKeyType ? M[P] : never): P]: NonNullable<T[P]> extends Array<infer Elem>
    ? M extends Partial<Record<keyof Elem, AllowedKeyType>>
      ? Array<DeepMappingKeys<Elem, M>> | ExtractNullable<T[P]>
      : T[P]
    : NonNullable<T[P]> extends object
      ? T[P] extends Function
        ? T[P]
        : M extends Partial<Record<keyof T[P], AllowedKeyType>>
          ? DeepMappingKeys<T[P], M> | ExtractNullable<T[P]>
          : T[P]
    : T[P]
};

export type ArrayLikeIteratee<T, R> = (value: T, index: number, array: ArrayLike<T>) => R;

export type ObjectIteratee<T, R> = (value: T[keyof T], key: string, object: T) => R;

export type GraphIteratee<T, R> = (value: T, path: AllowedKeyType[], graph: T) => R
