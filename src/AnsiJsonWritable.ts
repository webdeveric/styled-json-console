import { Writable, type WritableOptions } from 'node:stream';

import { isArray } from '@webdeveric/utils/predicate/isArray';
import { isObject } from '@webdeveric/utils/predicate/isObject';

import { ansiHighlightJson } from './ansiHighlightJson.js';
import { isHighlightEnabled } from './isHighlightEnabled.js';
import { Style, type StyleOptions } from './Style.js';

import type { JsonReplacerFn } from './types.js';

export type AnsiJsonWritableOptions = WritableOptions & {
  output?: NodeJS.WriteStream;
  space?: number | string;
  eol?: string;
  replacer?: JsonReplacerFn;
  styleOptions?: Partial<StyleOptions>;
};

export class AnsiJsonWritable extends Writable {
  readonly #buffer: string[] = [];

  readonly #output: NodeJS.WriteStream;

  readonly #space?: number | string;

  readonly #replacer?: JsonReplacerFn;

  readonly #eol: string;

  readonly #style: Style;

  constructor(options?: AnsiJsonWritableOptions) {
    const { output = process.stdout, space = 2, eol = '\n', replacer, styleOptions, ...rest } = options ?? {};

    super({ ...rest, decodeStrings: false });

    this.#output = output;
    this.#space = space;
    this.#replacer = replacer;
    this.#eol = eol;
    this.#style = new Style(styleOptions);
  }

  protected getWindowSize(): [columns: number, rows: number] {
    const [columns, rows] = this.#output.getWindowSize();

    return [columns, rows];
  }

  protected colorize(text: string): string {
    return this.#output.isTTY && isHighlightEnabled() ? ansiHighlightJson(text, this.#style) : text;
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

      if (isObject(parsed) || isArray(parsed)) {
        output = this.colorize(JSON.stringify(parsed, this.#replacer, this.#space));
      }

      // const [columns] = this.getWindowSize();

      // this.#output.write('\n' + styleText(['bgBlackBright', 'blackBright'], '-'.repeat(columns)) + '\n');

      this.#output.write(output + this.#eol);
    }

    callback();
  }
}
