import { describe, expect, test } from 'vitest';
import { curry } from '../src';

describe('curry', () => {
  test('curries a single value', () => {
    const f = curry((a, b, c) => a + b * c); // f(3, 4, 5) == 23
    const g = f(3);
    expect(g(4, 5)).toBe(23);
  });

  test('curries multiple values', () => {
    const f = curry((a, b, c) => a + b * c); // f(3, 4, 5) == 23
    const g = f(3, 4);
    expect(g(5)).toBe(23);
    expect(f(3, 4, 5)).toBe(23);
  });

  test('allows further currying of a curried function', () => {
    const f = curry((a, b, c) => a + b * c); // f(3, 4, 5) == 23
    const g = f(3);
    expect(g(4, 5)).toBe(23);
    const h = g(4);
    expect(h(5)).toBe(23);
    expect(g(4)(5)).toBe(23);
  });

  test('preserves context', () => {
    const ctx = { c: 5 };
    const f = curry(function (a, b) { return a + b * this.c });
    expect(f.call(ctx, 3, 4)).toBe(23);
    expect(f.call(ctx, 3).call(ctx, 4)).toBe(23);
  });
});
