import { describe, expect, test } from 'vitest';
import { mapKeys } from '../src';

describe('mapKeys', () => {
  const object = { id: 0, name: 'jee' };

  test('should map keys to new objects', () => {
    expect(mapKeys({ id: 'value', name: 'label' }, object)).toStrictEqual({
      label: 'jee',
      value: 0,
    });
  });

  test('should map keys to new objects (by function)', () => {
    expect(mapKeys((_, key) => (key === 'id' ? 'value' : key), object)).toStrictEqual({
      value: 0,
      name: 'jee',
    });
  });
});
