import { stripVTControlCharacters } from 'node:util';

import { describe, it, expect } from 'vitest';

import { ansiHighlightJson } from './ansiHighlightJson.js';

describe('ansiHighlightJson()', () => {
  it('colors a simple object', () => {
    const json = '{"foo":"bar"}';
    const result = ansiHighlightJson(json);

    expect(stripVTControlCharacters(result)).toBe(json);
  });

  it('colors numbers correctly', () => {
    const json = '{"num":12345,"neg":-678.9,"exp":1.23e+2}';
    const result = ansiHighlightJson(json);

    expect(stripVTControlCharacters(result)).toBe(json);
  });

  it('colors booleans and null', () => {
    const json = '{"a":true,"b":false,"c":null}';
    const result = ansiHighlightJson(json);

    expect(stripVTControlCharacters(result)).toBe(json);
  });

  it('colors arrays correctly', () => {
    const json = '{"arr":[1,2,3,true,false,null]}';
    const result = ansiHighlightJson(json);

    expect(stripVTControlCharacters(result)).toBe(json);
  });

  it('handles nested objects', () => {
    const json = '{"a":{"b":{"c":123}}}';
    const result = ansiHighlightJson(json);

    expect(stripVTControlCharacters(result)).toBe(json);
  });

  it('handles escaped quotes', () => {
    const json = '{"quote":"He said \\"Hello\\""}';
    const result = ansiHighlightJson(json);

    expect(stripVTControlCharacters(result)).toBe(json);
  });

  it('passes through existing ANSI sequences', () => {
    const json = '{"text":"\x1b[1mINFO\x1b[22m"}';
    const result = ansiHighlightJson(json);

    expect(stripVTControlCharacters(result)).toBe('{"text":"INFO"}');
  });

  it('colors empty object and array', () => {
    const json = '{"emptyObj":{},"emptyArr":[]}';
    const result = ansiHighlightJson(json);

    expect(stripVTControlCharacters(result)).toBe(json);
  });

  it('colors complex mix', () => {
    const json = JSON.stringify({
      level: 'INFO',
      message: 'Hello "world"',
      timestamp: new Date().toISOString(),
      ok: true,
      count: 42,
      data: [1, 2, 3],
      nested: { a: false, b: null },
    });
    const result = ansiHighlightJson(json);

    expect(stripVTControlCharacters(result)).toBe(json);
  });
});
