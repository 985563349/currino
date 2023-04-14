type IdentityType<T> = {
  map: <U>(f: (x: T) => U) => IdentityType<U>;
  fold: <U>(f: (x: T) => U) => U;
  inspect: () => string;
}

interface CurrinoIdentity {
  <T>(x: T): IdentityType<T>;
}

export const Identity: CurrinoIdentity = (x) => ({
  map: (f) => Identity(f(x)),
  fold: (f) => f(x),
  inspect: () => `Identity(${x})`,
});
