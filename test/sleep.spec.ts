import { describe, expect, test } from 'vitest';
import { sleep } from '../src';

describe('sleep', () => {
  test('sleep for 1 second', () => {
    const start = Date.now();
    sleep(1000);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(1000);
  });
});
