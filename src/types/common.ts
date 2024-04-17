export type AllowedKeyType = keyof any;

export type ExtractNullable<T> = T extends null | undefined ? T : never;

export type ArrayLikeIteratee<T, R> = (value: T, index: number, array: ArrayLike<T>) => R;

export type ObjectIteratee<T, R> = (value: T[keyof T], key: string, object: T) => R;

export type GraphIteratee<T, R> = (value: T, path: AllowedKeyType[], graph: T) => R;
