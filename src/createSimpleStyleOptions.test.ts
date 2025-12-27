import { describe, it, expect } from 'vitest';

import { createSimpleStyleOptions } from './createSimpleStyleOptions.js';

import type { StyleOptions } from './types.js';

describe('createSimpleStyleOptions', () => {
  it('creates style options with the given value for all style keys', () => {
    expect(createSimpleStyleOptions(['red'])).toEqual({
      boolean: ['red'],
      bracket: ['red'],
      colon: ['red'],
      comma: ['red'],
      key: ['red'],
      null: ['red'],
      number: ['red'],
      quoteKey: ['red'],
      quoteString: ['red'],
      string: ['red'],
    } satisfies StyleOptions);
  });
});
