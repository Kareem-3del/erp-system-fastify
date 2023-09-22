const v1Regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const v2Regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[2][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const v3Regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[3][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const v4Regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const v5Regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const anyRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUUID(
  value: any,
  version?: 1 | 2 | 3 | 4 | 5 | 'all',
): boolean {
  switch (version) {
    case 1:
      return v1Regex.test(value);
    case 2:
      return v2Regex.test(value);
    case 3:
      return v3Regex.test(value);
    case 4:
      return v4Regex.test(value);
    case 5:
      return v5Regex.test(value);
    case 'all':
      return anyRegex.test(value);
    default:
      return anyRegex.test(value);
  }
}
