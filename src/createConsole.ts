import { Console, type ConsoleConstructorOptions } from 'node:console';

import { AnsiJsonWritable, type ModifyOutputFn } from './AnsiJsonWritable.js';

import type { StyleOptions } from './Style.js';
import type { JsonReplacerFn } from './types.js';

export type CreateConsoleOptions = ConsoleConstructorOptions & {
  eol?: string;
  modifyOutput?: ModifyOutputFn;
  json?: {
    style?: Partial<StyleOptions>;
    space?: number | string;
    replacer?: JsonReplacerFn;
  };
};

export function createConsole(options: Partial<CreateConsoleOptions> = {}): Console {
  const { stdout = process.stdout, stderr = process.stderr, eol, modifyOutput, json, ...consoleOptions } = options;

  return new Console({
    stdout: new AnsiJsonWritable({
      output: stdout,
      space: json?.space,
      replacer: json?.replacer,
      eol,
      modifyOutput,
      styleOptions: json?.style,
    }),
    stderr: new AnsiJsonWritable({
      output: stderr,
      space: json?.space,
      replacer: json?.replacer,
      eol,
      modifyOutput,
      styleOptions: json?.style,
    }),
    ...consoleOptions,
  });
}
