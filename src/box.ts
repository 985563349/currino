type Functor<T> = {
  map: <U>(f: (x: T) => U) => Functor<U>;
  fold: <U>(f: (x: T) => U) => U;
};

export const Box = <T>(x: T): Functor<T> => ({
  map: (f) => Box(f(x)),
  fold: (f) => f(x),
});
