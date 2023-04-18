import { describe, test, expect } from 'vitest';
import { eachTree } from '../src';

describe('eachTree', () => {
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
        ],
      },
    ],
  };

  test('performs the passed in function on each node of the tree', () => {
    const sideEffect = {};

    eachTree(
      (node) => {
        sideEffect[node.name] = node.id;
      }, 'children', tree);

    expect(sideEffect).toStrictEqual({ '0': '0', '0-0': '0-0', '0-1': '0-1', '0-1-0': '0-1-0' });
  });

  test('returns the original tree', () => {
    let s = '';

    expect(
      eachTree(
        (node) => {
          s += node.id;
        }, 'children', tree)
    ).toBe(tree);

    expect(s).toBe('00-00-10-1-0');
  });

  test('early exit of iteration', () => {
    let s = '';

    eachTree(
      (node) => {
        if (node.id === '0-1') return false;
        s += node.id;
      },
      'children',
      tree
    );

    expect(s).toBe('00-0');
  });

  test('curried', () => {
    let s = '';

    expect(
      eachTree((node) => {
        s += node.id;
      }, 'children')(tree)
    ).toBe(tree);

    expect(s).toBe('00-00-10-1-0');
  });
});
