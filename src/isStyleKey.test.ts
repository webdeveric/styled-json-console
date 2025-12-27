import { describe, expect, it } from 'vitest';

import { isStyleKey } from './isStyleKey.js';

describe('isStyleKey()', () => {
  it.each(['string', 'number', 'boolean', 'bracket', 'comma', 'colon', 'quoteKey', 'quoteString', 'key', 'null'])(
    'returns true for %j',
    (input) => {
      expect(isStyleKey(input)).toBe(true);
    },
  );

  it.each([null, undefined, 42, {}, [], 'not valid'])('returns false for %j', (input) => {
    expect(isStyleKey(input)).toBe(false);
  });
});
