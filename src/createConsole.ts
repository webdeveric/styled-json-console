import { Console, type ConsoleConstructorOptions } from 'node:console';

import { AnsiJsonWritable, type ModifyOutputFn } from './AnsiJsonWritable.js';

import type { StyleOptions } from './Style.js';
import type { JsonReplacerFn } from './types.js';

export type JsonConsoleOptions = {
  style?: Partial<StyleOptions>;
  space?: number | string;
  replacer?: JsonReplacerFn;
};

export type CreateConsoleOptions = ConsoleConstructorOptions & {
  eol?: string;
  modifyOutput?: ModifyOutputFn;
  json?: JsonConsoleOptions | [stdout: JsonConsoleOptions, stderr?: JsonConsoleOptions];
};

/**
 * Creates a Console instance that supports ANSI styling and JSON formatting.
 */
export function createConsole(options: Partial<CreateConsoleOptions> = {}): Console {
  const { stdout = process.stdout, stderr = process.stderr, eol, modifyOutput, json, ...consoleOptions } = options;

  const stdOutJson = Array.isArray(json) ? json[0] : json;
  const stdErrJson = Array.isArray(json)
    ? {
        ...stdOutJson,
        ...json[1],
        style: {
          ...stdOutJson?.style,
          ...json[1]?.style,
        },
      }
    : json;

  return new Console({
    stdout: new AnsiJsonWritable({
      output: stdout,
      space: stdOutJson?.space,
      replacer: stdOutJson?.replacer,
      eol,
      modifyOutput,
      styleOptions: stdOutJson?.style,
    }),
    stderr: new AnsiJsonWritable({
      output: stderr,
      space: stdErrJson?.space,
      replacer: stdErrJson?.replacer,
      eol,
      modifyOutput,
      styleOptions: stdErrJson?.style,
    }),
    ...consoleOptions,
  });
}
