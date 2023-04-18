import { describe, expect, test } from 'vitest';
import { forEach } from '../src';

describe('forEach', () => {
  const list = [
    { x: 1, y: 2 },
    { x: 3, y: 4 },
    { x: 5, y: 6 },
  ];

  test('performs the passed in function on each element of the list', () => {
    const sideEffect = {};

    forEach((elem) => {
      sideEffect[elem.x] = elem.y;
    }, list);

    expect(sideEffect).toStrictEqual({ 1: 2, 3: 4, 5: 6 });
  });

  test('returns the original list', () => {
    let s = '';

    expect(
      forEach((elem) => {
        s += elem.x;
      }, list)
    ).toBe(list);

    expect(s).toBe('135');
  });

  test('early exit of iteration', () => {
    let s = '';

    forEach((elem) => {
      if (elem.x === 5) return false;
      s += elem.x;
    }, list);

    expect(s).toBe('13');
  });

  test('curried', () => {
    let s = '';

    expect(
      forEach((elem) => {
        s += elem.x;
      })(list)
    ).toBe(list);

    expect(s).toBe('135');
  });
});
