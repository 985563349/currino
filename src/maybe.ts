type Nothing<T> = {
  map: (f: (x: T) => any) => Nothing<T>;
  fold: (f: (x: T) => any) => T;
  inspect: () => string;
}

type Just<T> = {
  map: <U>(f: (x: T) => U) => MaybeType<U>;
  fold: <U>(f: (x: T) => U) => U;
  inspect: () => string;
}

type MaybeType<T> = T extends null | undefined ? Nothing<T> : Just<T>;

interface CurrinoMaybe {
  <T>(x: T): MaybeType<T>;
}

export const Maybe: CurrinoMaybe = (x): any => ({
  map: (f: any) => Maybe(x == null ? x : f(x)),
  fold: (f: any) => f(x == null ? x : f(x)),
  inspect: () => `Maybe(${x})`, 
});
