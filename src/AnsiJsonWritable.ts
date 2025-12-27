import { Writable, type WritableOptions } from 'node:stream';

import { ansiHighlightJson } from './ansiHighlightJson.js';
import { isColorEnabled } from './isColorEnabled.js';
import { Style } from './Style.js';

import type { JsonReplacerFn, StyleOptions, StyleTextFormatArray } from './types.js';

export type ModifyOutputFn = (output: string, style: Style) => string;

export type AnsiJsonWritableOptions = WritableOptions & {
  output?: NodeJS.WritableStream;
  space?: number | string;
  eol?: string;
  replacer?: JsonReplacerFn;
  styleOptions?: Partial<StyleOptions> | StyleTextFormatArray;
  modifyOutput?: ModifyOutputFn;
};

export class AnsiJsonWritable extends Writable {
  readonly #buffer: string[] = [];

  readonly #output: NodeJS.WritableStream;

  readonly #space?: number | string;

  readonly #replacer?: JsonReplacerFn;

  readonly #eol: string;

  readonly #style: Style;

  readonly #colorEnabled: boolean;

  readonly #modifyOutput?: ModifyOutputFn;

  constructor(options?: AnsiJsonWritableOptions) {
    const {
      output = process.stdout,
      space = 2,
      eol = '\n',
      replacer,
      styleOptions,
      modifyOutput,
      ...rest
    } = options ?? {};

    super({ ...rest, decodeStrings: false });

    this.#output = output;
    this.#space = space;
    this.#replacer = replacer;
    this.#eol = eol;
    this.#style = new Style(styleOptions);
    this.#colorEnabled = isColorEnabled();
    this.#modifyOutput = modifyOutput;
  }

  #colorize(text: string): string {
    return this.#colorEnabled ? ansiHighlightJson(text, this.#style) : text;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public _write(chunk: string, _encoding: BufferEncoding, callback: () => void): void {
    this.#buffer.push(chunk);

    // newline = flush
    if (chunk.includes('\n')) {
      const full = this.#buffer.join('');

      this.#buffer.length = 0;

      let output = full;
      let parsed: unknown;

      try {
        parsed = JSON.parse(full.trim());
      } catch {
        this.#output.write(full);

        return callback();
      }

      if (parsed !== null && typeof parsed === 'object') {
        output = this.#colorize(JSON.stringify(parsed, this.#replacer, this.#space));

        if (this.#modifyOutput) {
          output = this.#modifyOutput(output, this.#style);
        }
      }

      this.#output.write(output + this.#eol);
    }

    callback();
  }
}
