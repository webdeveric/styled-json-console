import { styleText } from 'node:util';

import type { StyleTextFormat } from './types.js';

export type StyleOptions = Record<
  'string' | 'number' | 'boolean' | 'bracket' | 'comma' | 'colon' | 'quoteKey' | 'quoteString' | 'key' | 'null',
  StyleTextFormat[]
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

  constructor(options?: Partial<StyleOptions>) {
    this.options = { ...defaultStyleOptions, ...options };
  }

  #getStyleTextFormat(type: keyof StyleOptions, depth: number): StyleTextFormat {
    const formats = this.options[type];

    return (formats.length > 1 ? formats[depth % formats.length] : formats[0]) ?? 'blackBright';
  }

  bracket(char: string, depth: number): string {
    return styleText(this.#getStyleTextFormat('bracket', depth), char);
  }

  comma(char: string, depth: number): string {
    return styleText(this.#getStyleTextFormat('comma', depth), char);
  }

  colon(char: string, depth: number): string {
    return styleText(this.#getStyleTextFormat('colon', depth), char);
  }

  // quotes
  quoteKey(char: string, depth: number): string {
    return styleText(this.#getStyleTextFormat('quoteKey', depth), char);
  }

  quoteString(char: string, depth: number): string {
    return styleText(this.#getStyleTextFormat('quoteString', depth), char);
  }

  // content
  key(value: string, depth: number): string {
    return styleText(this.#getStyleTextFormat('key', depth), value);
  }

  string(value: string, depth: number): string {
    return styleText(this.#getStyleTextFormat('string', depth), value);
  }

  number(value: string, depth: number): string {
    return styleText(this.#getStyleTextFormat('number', depth), value);
  }

  boolean(value: string, depth: number): string {
    return styleText(this.#getStyleTextFormat('boolean', depth), value);
  }

  null(value: string, depth: number): string {
    return styleText(this.#getStyleTextFormat('null', depth), value);
  }
}
