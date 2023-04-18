import { describe, test, expect } from 'vitest';
import { forEachRight } from '../src';

describe('forEachRight', () => {
  const list = [
    { x: 1, y: 2 },
    { x: 3, y: 4 },
    { x: 5, y: 6 },
  ];

  test('performs the passed in function on each element of the list', () => {
    const sideEffect = {};

    forEachRight((elem) => {
      sideEffect[elem.x] = elem.y;
    }, list);

    expect(sideEffect).toStrictEqual({ 5: 6, 3: 4, 1: 2 });
  });

  test('returns the original list', () => {
    let s = '';

    expect(
      forEachRight((elem) => {
        s += elem.x;
      }, list)
    ).toBe(list);

    expect(s).toBe('531');
  });

  test('early exit of iteration', () => {
    let s = '';

    forEachRight((elem) => {
      if (elem.x === 1) return false;
      s += elem.x;
    }, list);

    expect(s).toBe('53');
  });

  test('curried', () => {
    let s = '';

    expect(
      forEachRight((elem) => {
        s += elem.x;
      })(list)
    ).toBe(list);

    expect(s).toBe('531');
  });
});
