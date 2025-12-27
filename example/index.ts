import { randomInt } from 'node:crypto';
import { styleText } from 'node:util';

import { createConsole } from 'styled-json-console';
import { mergeStyleOptions } from 'styled-json-console/mergeStyleOptions';

const myConsole = createConsole({
  inspectOptions: {
    depth: null,
    colors: true,
    numericSeparator: true,
    showHidden: true,
    showProxy: true,
  },
  eol: '\n\n',
  // First entry is for stdout, second for stderr
  json: [
    {
      space: 0,
      style: {
        bracket: ['white'],
        quoteKey: ['cyan'],
        quoteString: ['green'],
        key: ['cyan'],
        string: ['green'],
        number: ['yellowBright'],
        boolean: ['blueBright'],
        null: ['redBright'],
      },
      replacer(key, value) {
        if (key === 'level' && value === 'ERROR') {
          return styleText(['bold', 'red'], value);
        }

        return value;
      },
    },
    // stderr settings are merged with stdout settings so you can override only what you want
    {
      space: 2,
      style: mergeStyleOptions(['whiteBright'], {
        number: ['magentaBright'],
      }),
    },
  ],
});

const data = {
  level: 'INFO',
  message: 'This is an info message',
  randomNumber: randomInt(0, 2 ** 32 - 1),
  example: true,
  json: JSON.stringify({ a: 1, b: [2], c: { d: 3, e: [4, 5] } }),
  nested: { a: 1, b: [2], c: { d: 3, e: [4, 5] } },
};

myConsole.info(JSON.stringify(data));

myConsole.error(JSON.stringify({ ...data, level: 'ERROR', message: 'This is an error message' }));

// Non JSON data does not get styled, but still respects inspectOptions
myConsole.dir(data);
