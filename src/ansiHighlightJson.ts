import { decodeUnicodeEscapes } from './decodeUnicodeEscapes.js';
import { isNumberChar } from './isNumberChar.js';
import { isNumberStart } from './isNumberStart.js';
import { Style } from './Style.js';

const QUOTE = '"';

export function ansiHighlightJson(jsonString: string, style: Style = new Style()): string {
  const outputChunks: string[] = [];
  const stringLength = jsonString.length;

  let currentIndex = 0;
  let currentDepth = 0;

  while (currentIndex < stringLength) {
    const currentChar = jsonString[currentIndex];

    if (!currentChar) {
      currentIndex++;

      continue;
    }

    // Brackets
    if (currentChar === '{' || currentChar === '[') {
      outputChunks.push(style.bracket(currentChar, currentDepth));

      currentDepth++;
      currentIndex++;

      continue;
    }

    if (currentChar === '}' || currentChar === ']') {
      currentDepth = Math.max(0, currentDepth - 1);

      outputChunks.push(style.bracket(currentChar, currentDepth));

      currentIndex++;

      continue;
    }

    // Separators
    if (currentChar === ',' || currentChar === ':') {
      if (currentChar === ',') {
        outputChunks.push(style.comma(currentChar, currentDepth));
      } else {
        outputChunks.push(style.colon(currentChar, currentDepth));
      }

      currentIndex++;

      continue;
    }

    // Strings
    if (currentChar === QUOTE) {
      const stringStartIndex = currentIndex;

      currentIndex++; // skip opening quote

      let escaped = false;

      while (currentIndex < stringLength) {
        const character = jsonString[currentIndex];

        if (!character) {
          break;
        }

        if (escaped) {
          escaped = false;

          currentIndex++;

          continue;
        }

        if (character === '\\') {
          escaped = true;

          currentIndex++;

          continue;
        }

        if (character === QUOTE) {
          break;
        }

        currentIndex++;
      }

      const stringEndIndex = currentIndex;

      currentIndex++; // consume closing quote

      const charAfterString = jsonString[currentIndex];
      const rawInnerString = jsonString.slice(stringStartIndex + 1, stringEndIndex);
      const decodedInnerString = decodeUnicodeEscapes(rawInnerString);
      const isKey = charAfterString === ':';

      outputChunks.push(
        style.quoteKey(QUOTE, currentDepth),
        isKey ? style.key(decodedInnerString, currentDepth) : style.string(decodedInnerString, currentDepth),
        style.quoteString(QUOTE, currentDepth),
      );

      continue;
    }

    // Numbers
    if (isNumberStart(currentChar)) {
      const numberStartIndex = currentIndex;

      currentIndex++;

      for (; currentIndex < stringLength; currentIndex++) {
        const character = jsonString[currentIndex];

        if (!character || !isNumberChar(character)) {
          break;
        }
      }

      outputChunks.push(style.number(jsonString.slice(numberStartIndex, currentIndex), currentDepth));

      continue;
    }

    // Booleans / null
    if (
      (currentChar === 't' && jsonString.startsWith('true', currentIndex)) ||
      (currentChar === 'f' && jsonString.startsWith('false', currentIndex)) ||
      (currentChar === 'n' && jsonString.startsWith('null', currentIndex))
    ) {
      if (currentChar === 't') {
        outputChunks.push(style.boolean('true', currentDepth));
        currentIndex += 4;
      } else if (currentChar === 'f') {
        outputChunks.push(style.boolean('false', currentDepth));
        currentIndex += 5;
      } else {
        outputChunks.push(style.null('null', currentDepth));
        currentIndex += 4;
      }

      continue;
    }

    // Passthrough (whitespace, etc.)
    outputChunks.push(currentChar);

    currentIndex++;
  }

  return outputChunks.join('');
}
