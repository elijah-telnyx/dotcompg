export const copyObjectWithoutReference = (obj: Record<string, unknown>) =>
  JSON.parse(JSON.stringify(obj));
