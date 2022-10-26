import { describe, expect, test } from 'vitest';
import { searchTree } from '../src';

describe('searchTree', () => {
  const tree = [
    {
      id: '0',
      name: '0',
      children: [
        {
          id: '0-0',
          name: '0-0',
        },
        {
          id: '0-1',
          name: '0-1',
          children: [
            {
              id: '0-1-0',
              name: '0-1-0',
            },
          ],
        },
      ],
    },
    {
      id: '1',
      name: '1',
      children: [
        {
          id: '1-0',
          name: '1-0',
        },
      ],
    },
  ];

  test('should match path', () => {
    expect(searchTree((node) => node.id === '0-1-0', tree)).toMatchObject([
      { id: '0', children: [{ id: '0-1', children: [{ id: '0-1-0' }] }] },
    ]);
  });

  test('should match empty array', () => {
    expect(searchTree((node) => node.id === '0-1-1', tree)).toStrictEqual([]);
  });
});
