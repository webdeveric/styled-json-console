import type { styleText } from 'node:util';

export type JsonReplacerFn = (this: unknown, key: string, value: unknown) => unknown;

export type StyleTextFormat = Parameters<typeof styleText>[0];

/**
 * An array of `StyleTextFormat` with at least one item.
 */
export type StyleTextFormatArray = [item: StyleTextFormat, ...rest: StyleTextFormat[]];

/**
 * @internal
 */
type TextFormatStrings = Exclude<StyleTextFormat, string[]>;

export type StyleTextBgColor = Extract<TextFormatStrings, `bg${string}`>;

export type StyleTextColor = StyleTextBgColor extends `bg${infer Color}` ? Uncapitalize<Color> : never;

export type StyleTextModifier = Exclude<TextFormatStrings, StyleTextBgColor | StyleTextColor>;

export type StyleKey =
  | 'string'
  | 'number'
  | 'boolean'
  | 'bracket'
  | 'comma'
  | 'colon'
  | 'quoteKey'
  | 'quoteString'
  | 'key'
  | 'null';

export type StyleOptions = Record<StyleKey, StyleTextFormatArray>;
