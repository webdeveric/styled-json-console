import { styleText, type StyleTextOptions } from 'node:util';

import type { StyleTextFormat } from './types.js';

export type StyleOptions = Record<
  'string' | 'number' | 'boolean' | 'bracket' | 'comma' | 'colon' | 'quoteKey' | 'quoteString' | 'key' | 'null',
  [item: StyleTextFormat, ...rest: StyleTextFormat[]] // At least one item
>;

const defaultStyleOptions: StyleOptions = {
  // content
  string: ['green'],
  number: ['yellow'],
  boolean: ['magenta'],
  null: ['gray'],

  // structural
  bracket: ['blue', 'yellow', ['white', 'bgBlack'], 'cyan', 'green', 'red'],
  comma: ['white'],
  colon: ['white'],

  // quotes
  quoteKey: ['gray'],
  quoteString: ['gray'],

  // keys
  key: ['cyan'],
};

export class Style {
  private readonly options: StyleOptions;

  private readonly styleTextOptions: StyleTextOptions = { validateStream: false };

  constructor(options?: Partial<StyleOptions>) {
    this.options = { ...defaultStyleOptions, ...options };
  }

  #getStyleTextFormat(type: keyof StyleOptions, depth: number): StyleTextFormat {
    const formats = this.options[type];

    return formats[depth % formats.length]!; // Non-empty array, so the non-null assertion is safe
  }

  #style(type: keyof StyleOptions, value: string, depth: number): string {
    return styleText(this.#getStyleTextFormat(type, depth), value, this.styleTextOptions);
  }

  bracket(char: string, depth: number): string {
    return this.#style('bracket', char, depth);
  }

  comma(char: string, depth: number): string {
    return this.#style('comma', char, depth);
  }

  colon(char: string, depth: number): string {
    return this.#style('colon', char, depth);
  }

  // quotes
  quoteKey(char: string, depth: number): string {
    return this.#style('quoteKey', char, depth);
  }

  quoteString(char: string, depth: number): string {
    return this.#style('quoteString', char, depth);
  }

  // content
  key(value: string, depth: number): string {
    return this.#style('key', value, depth);
  }

  string(value: string, depth: number): string {
    return this.#style('string', value, depth);
  }

  number(value: string, depth: number): string {
    return this.#style('number', value, depth);
  }

  boolean(value: string, depth: number): string {
    return this.#style('boolean', value, depth);
  }

  null(value: string, depth: number): string {
    return this.#style('null', value, depth);
  }
}
