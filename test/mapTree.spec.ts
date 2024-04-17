import { describe, test, expect } from 'vitest';
import { mapTree } from '../src';

describe('mapTree', () => {
  const tree = {
    id: '0',
    name: '0',
    children: [
      {
        id: '0-0',
        name: '0-0',
      },
    ],
  };

  test('should map keys to new objects', () => {
    const expected = {
      title: '0',
      key: '0',
      children: [
        {
          title: '0-0',
          key: '0-0',
        },
      ],
    };

    expect(
      mapTree(
        (node) => ({ title: node.name, key: node.id, children: node.children }),
        'children',
        tree
      )
    ).toMatchObject(expected);
  });

  test('curried', () => {
    const expected = {
      title: '0',
      key: '0',
      children: [
        {
          title: '0-0',
          key: '0-0',
        },
      ],
    };

    expect(
      mapTree((node) => ({
        title: node.name,
        key: node.id,
        children: node.children,
      }))('children')(tree)
    ).toMatchObject(expected);
  });
});
