import { describe, expect, test } from 'vitest';
import { Either } from '../src';

describe('either', () => {
  test('should get twice the right value', () => {
    expect(
      Either(1, 2)
        .map((x) => x * 2)
        .fold((x) => x)
    ).toBe(4);
  });

  test('should get left value', () => {
    expect(
      Either(1, null)
        .map((x) => x * 2)
        .fold((x) => x)
    ).toBe(1);
  });
});
