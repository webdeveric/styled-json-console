import type { StyleKey } from './types.js';

export const isStyleKey = (value: unknown): value is StyleKey => {
  return (
    value === 'string' ||
    value === 'number' ||
    value === 'boolean' ||
    value === 'bracket' ||
    value === 'comma' ||
    value === 'colon' ||
    value === 'quoteKey' ||
    value === 'quoteString' ||
    value === 'key' ||
    value === 'null'
  );
};
