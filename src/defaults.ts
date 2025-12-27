import type { StyleOptions } from './types.js';

export const defaultStyleOptions: Readonly<StyleOptions> = {
  // content
  string: ['green'],
  number: ['yellowBright'],
  boolean: ['blueBright'],
  null: ['redBright'],

  // structural
  bracket: ['white', 'blue', 'yellow', 'cyan', 'green', 'red'],
  comma: ['white'],
  colon: ['white'],

  // quotes
  quoteKey: ['cyan'],
  quoteString: ['green'],

  // keys
  key: ['cyan'],
};
