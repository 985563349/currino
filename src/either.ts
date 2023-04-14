type Left<T> = {
  map: (f: (x: T) => any) => Left<T>;
  fold: <U>(f: (x: T) => U) => U;
  inspect: () => string;
}

type Right<T> = {
  map: <U>(f: (x: T) => U) => Right<U>;
  fold: <U>(f: (x: T) => U) => U;
  inspect: () => string;
}

type EitherType<L, R> = R extends null | undefined ? Left<L> : Right<R>;

interface CurrinoEither {
  <L, R>(l: L, r: R): EitherType<L, R>;
}

export const Either: CurrinoEither = (l, r): any => ({
  map: (f: any) => (r == null ? Either(l, r) : Either(l, f(r))),
  fold: (f: any) => f(r == null ? l : r),
  inspect: () => `Either(${l}, ${r})`,
});
