/**
 * Checks if a character can be the start of a number (a digit or a minus sign).
 */
export function isNumberStart(char: string): boolean {
  const code = char.charCodeAt(0);

  return code === 45 || (code >= 48 && code <= 57);
}
