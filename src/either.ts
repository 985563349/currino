const Either = (l, r) => ({
  map: (f) => (r == null ? Either(f(l), r) : Either(l, f(r))),
  fold: (f) => f(r == null ? l : r),
  inspect: () => `Either(${l}, ${r})`,
});
