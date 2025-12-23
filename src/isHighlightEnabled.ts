export function isHighlightEnabled(): boolean {
  const env = process.env['JSON_HIGHLIGHT'];

  return env === undefined || env === '1';
}
