import { defaultStyleOptions } from './defaults.js';
import { isStyleKey } from './isStyleKey.js';

import type { StyleOptions, StyleTextFormatArray } from './types.js';

export function createSimpleStyleOptions(value: StyleTextFormatArray): StyleOptions {
  const options: StyleOptions = { ...defaultStyleOptions };

  for (const key in options) {
    if (isStyleKey(key)) {
      options[key] = value;
    }
  }

  return options;
}
