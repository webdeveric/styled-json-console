/**
 * Checks if a character is part of a number representation.
 */
export function isNumberChar(char: string): boolean {
  const code = char.charCodeAt(0);

  return (
    (code >= 48 && code <= 57) || // 0-9
    code === 46 || // '.'
    code === 45 || // '-'
    code === 43 || // '+'
    code === 101 || // 'e'
    code === 69 // 'E'
  );
}
