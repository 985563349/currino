import { describe, expect, test } from 'vitest';
import { limit } from '../src';

describe('limit', () => {
  test('should get all asynchronous results', async () => {
    const sideEffect = await limit(2, [
      () => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(1), 300);
        });
      },
      () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => reject(2), 100);
        });
      },
      () => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(3), 200);
        });
      },
    ]);

    expect(sideEffect).toStrictEqual([
      { status: 'fulfilled', value: 1 },
      { status: 'rejected', reason: 2 },
      { status: 'fulfilled', value: 3 },
    ]);
  });

  test('curried', async () => {
    const sideEffect = await limit(2)([() => Promise.resolve(1), () => Promise.reject(2)]);

    expect(sideEffect).toStrictEqual([
      { status: 'fulfilled', value: 1 },
      { status: 'rejected', reason: 2 },
    ]);
  });
});
