import { describe, expect, test } from 'vitest';
import { sum } from '../src';

describe('sum', () => {
  test('should get the sum of two numbers', () => {
    expect(sum(1, 1)).toBe(2);
  });
});
