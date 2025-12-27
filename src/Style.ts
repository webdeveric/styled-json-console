import { styleText, type StyleTextOptions } from 'node:util';

import { defaultStyleOptions } from './defaults.js';
import { mergeStyleOptions } from './mergeStyleOptions.js';

import type { StyleKey, StyleOptions, StyleTextFormat, StyleTextFormatArray } from './types.js';

export type StyleFn = (value: string, depth: number) => string;

export type BaseStyle = {
  [K in StyleKey]: StyleFn;
};

export class Style implements BaseStyle {
  readonly #options: StyleOptions;

  readonly #styleTextOptions: StyleTextOptions = { validateStream: false };

  constructor(options?: Partial<StyleOptions> | StyleTextFormatArray) {
    this.#options = mergeStyleOptions(defaultStyleOptions, options);
  }

  #getStyleTextFormat(type: keyof StyleOptions, depth: number): StyleTextFormat {
    const formats = this.#options[type];

    return formats[depth % formats.length]!; // Non-empty array, so the non-null assertion is safe
  }

  #style(type: keyof StyleOptions, value: string, depth: number): string {
    return styleText(this.#getStyleTextFormat(type, depth), value, this.#styleTextOptions);
  }

  /**
   * Force bright (disable faint) ANSI code around the input string.
   */
  forceBright(input: string): string {
    return `\x1b[0m${input}`; // `styleText()` does not provide this option
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
