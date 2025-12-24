import { describe, expect, it } from 'vitest';

import { decodeUnicodeEscapes } from './decodeUnicodeEscapes.js';

describe('decodeUnicodeEscapes()', () => {
  it('decodes basic Unicode escape sequences', () => {
    expect(decodeUnicodeEscapes('Hello\\u0020World\\u0021')).toBe('Hello World!');
  });

  it('decodes multiple Unicode escape sequences', () => {
    expect(decodeUnicodeEscapes('\\u0048\\u0065\\u006C\\u006C\\u006F')).toBe('Hello');
  });

  it('handles strings without Unicode escape sequences', () => {
    const input = 'No escapes here!';

    expect(decodeUnicodeEscapes(input)).toBe(input);
  });

  it('handles empty strings', () => {
    const input = '';

    expect(decodeUnicodeEscapes(input)).toBe(input);
  });

  it('ignores invalid Unicode escape sequences', () => {
    const input = 'Invalid \\uZZZZ sequence';

    expect(decodeUnicodeEscapes(input)).toBe(input);
  });

  it('decodes mixed content', () => {
    expect(decodeUnicodeEscapes('Mixing \\u0041 and A')).toBe('Mixing A and A');
  });
});
