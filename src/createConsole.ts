import { Console, type ConsoleConstructorOptions } from 'node:console';

import { AnsiJsonWritable } from './AnsiJsonWritable.js';

import type { StyleOptions } from './Style.js';
import type { JsonReplacerFn } from './types.js';

export type CreateConsoleOptions = ConsoleConstructorOptions & {
  eol?: string;
  json?: {
    style?: Partial<StyleOptions>;
    space?: number | string;
    replacer?: JsonReplacerFn;
  };
};

export function createConsole(options: Partial<CreateConsoleOptions> = {}): Console {
  const { stdout = process.stdout, stderr = process.stderr, eol, json, ...consoleOptions } = options;

  return new Console({
    stdout: new AnsiJsonWritable({
      output: stdout,
      space: json?.space,
      replacer: json?.replacer,
      eol,
      styleOptions: json?.style,
    }),
    stderr: new AnsiJsonWritable({
      output: stderr,
      space: json?.space,
      replacer: json?.replacer,
      eol,
      styleOptions: json?.style,
    }),
    ...consoleOptions,
  });
}
