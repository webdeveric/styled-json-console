import type { styleText } from 'node:util';

export type JsonReplacerFn = (this: unknown, key: string, value: unknown) => unknown;

export type StyleTextFormat = Parameters<typeof styleText>[0];
