import { describe, expect, test } from 'vitest';
import { Identity } from '../src';

describe('identity', () => {
  test('should get twice the original value', () => {
    expect(
      Identity(1)
        .map((x) => x * 2)
        .fold((x) => x)
    ).toBe(2);
  });
});
