import { Console, type ConsoleConstructorOptions } from 'node:console';

import { AnsiJsonWritable } from './AnsiJsonWritable.js';

import type { StyleOptions } from './Style.js';
import type { JsonReplacerFn } from './types.js';

export type CreateConsoleOptions = {
  space?: number | string;
  replacer?: JsonReplacerFn;
  eol?: string;
  inspectOptions?: ConsoleConstructorOptions['inspectOptions'];
  styleOptions?: Partial<StyleOptions>;
};

export function createConsole({
  space = 2,
  replacer,
  eol = '\n',
  inspectOptions = { depth: null, colors: true },
  styleOptions,
}: CreateConsoleOptions = {}): Console {
  return new Console({
    stdout: new AnsiJsonWritable({
      output: process.stdout,
      space,
      replacer,
      eol,
      styleOptions,
    }),
    stderr: new AnsiJsonWritable({
      output: process.stderr,
      space,
      replacer,
      eol,
      styleOptions,
    }),
    inspectOptions,
  });
}
