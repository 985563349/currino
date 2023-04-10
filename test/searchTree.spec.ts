import { describe, expect, test } from 'vitest';
import { searchTree } from '../src';

describe('searchTree', () => {
  const tree = {
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
          {
            id: '0-1-1',
            name: '0-1-1',
          },
        ],
      },
    ],
  };

  test('should match path', () => {
    const expected = {
      id: '0',
      children: [
        {
          id: '0-1',
          children: [
            {
              id: '0-1-1',
            },
          ],
        },
      ],
    };

    expect(searchTree((node) => node.id === '0-1-1', 'children', tree)).toMatchObject(expected);
  });

  test('should match empty array', () => {
    expect(searchTree((node) => node.id === '0-1-2', 'children', tree)).toBeNull();
  });
});
