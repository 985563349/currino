import { describe, expect, test } from 'vitest';
import { findTree } from '../src/findTree';

describe('findTree', () => {
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
      },
    ],
  };

  test('should match object', () => {
    expect(findTree((node) => node.id === '0-1', 'children', tree)).toMatchObject({
      id: '0-1',
      name: '0-1',
    });
  });

  test('should match null', () => {
    expect(findTree((node) => node.id === '0-2', 'children', tree)).toBeNull();
  });
});
