type MaybeFunctor<T> = {
  map: <U>(f: (x: T) => U) => MaybeFunctor<T | U>;
  fold: <U>(f: (x: T) => U) => U;
};

export const Maybe = <T>(x: T): MaybeFunctor<T> => ({
  map: (f) => Maybe(x == null ? x : f(x)),
  fold: (f) => f(x),
});

