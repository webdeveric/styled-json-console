import { createSimpleStyleOptions } from './createSimpleStyleOptions.js';
import { defaultStyleOptions } from './defaults.js';

import type { StyleOptions, StyleTextFormatArray } from './types.js';

export function mergeStyleOptions(
  base?: Partial<StyleOptions> | StyleTextFormatArray,
  override?: Partial<StyleOptions> | StyleTextFormatArray,
): StyleOptions {
  if (Array.isArray(override)) {
    return createSimpleStyleOptions(override);
  }

  if (Array.isArray(base)) {
    return {
      ...createSimpleStyleOptions(base),
      ...override,
    };
  }

  return { ...defaultStyleOptions, ...base, ...override };
}
