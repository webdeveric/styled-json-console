export function isColorEnabled(): boolean {
  if (
    process.env['FORCE_COLOR'] === '0' ||
    process.env['NO_COLOR'] !== undefined ||
    process.env['NODE_DISABLE_COLORS'] !== undefined
  ) {
    return false;
  }

  return true;
}
