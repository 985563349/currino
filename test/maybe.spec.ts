import { describe, expect, test } from 'vitest';
import { Maybe } from '../src';

describe('maybe', () => {
  test('should get twice the original value', () => {
    expect(
      Maybe(1)
        .map((x) => x * 2)
        .fold((x) => x)
    ).toBe(2);
  });

  test('should get null', () => {
    expect(
      Maybe(null)
        .map((x) => x * 2)
        .fold((x) => x)
    ).toBeNull();
  });
});
