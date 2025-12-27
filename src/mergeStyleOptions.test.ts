import { describe, expect, it } from 'vitest';

import { defaultStyleOptions } from './defaults.js';
import { mergeStyleOptions } from './mergeStyleOptions.js';

import type { StyleOptions } from './types.js';

describe('mergeStyleOptions()', () => {
  it('merges two StyleOptions objects', () => {
    expect(
      mergeStyleOptions(
        {
          string: ['red'],
        },
        {
          string: ['blue'],
        },
      ),
    ).toEqual({
      ...defaultStyleOptions,
      string: ['blue'],
    } satisfies StyleOptions);
  });

  it('Builds StyleOptions when overrides is an array', () => {
    expect(
      mergeStyleOptions(
        {
          string: ['red'],
        },
        ['blue'],
      ),
    ).toEqual({
      boolean: ['blue'],
      bracket: ['blue'],
      colon: ['blue'],
      comma: ['blue'],
      key: ['blue'],
      null: ['blue'],
      number: ['blue'],
      quoteKey: ['blue'],
      quoteString: ['blue'],
      string: ['blue'],
    } satisfies StyleOptions);
  });

  it('Builds StyleOptions from base if it is an array', () => {
    expect(mergeStyleOptions(['red'], { string: ['blue'] })).toEqual({
      boolean: ['red'],
      bracket: ['red'],
      colon: ['red'],
      comma: ['red'],
      key: ['red'],
      null: ['red'],
      number: ['red'],
      quoteKey: ['red'],
      quoteString: ['red'],
      string: ['blue'],
    } satisfies StyleOptions);
  });
});
