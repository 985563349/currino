export const Maybe = (x) => ({
  map: (f) => Maybe(x == null ? x : f(x)),
  fold: (f) => f(x),
});
