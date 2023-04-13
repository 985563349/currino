export const Identity = (x) => ({
  map: (f) => Identity(f(x)),
  fold: (f) => f(x),
  inspect: () => `Identity(${x})`,
});
