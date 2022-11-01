import { describe, expect, test } from 'vitest';
import { Box } from '../src';

describe('box', () => {
  test('should get twice the original value', () => {
    expect(
      Box(1)
        .map((x) => x * 2)
        .fold((x) => x)
    ).toBe(2);
  });
});
