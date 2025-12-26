import type { styleText } from 'node:util';

export type JsonReplacerFn = (this: unknown, key: string, value: unknown) => unknown;

export type StyleTextFormat = Parameters<typeof styleText>[0];

/**
 * @internal
 */
type TextFormatStrings = Exclude<StyleTextFormat, string[]>;

export type StyleTextBgColor = Extract<TextFormatStrings, `bg${string}`>;

export type StyleTextColor = StyleTextBgColor extends `bg${infer Color}` ? Uncapitalize<Color> : never;

export type StyleTextModifier = Exclude<TextFormatStrings, StyleTextBgColor | StyleTextColor>;
