export const isEmptyObject = (obj: Record<string, any>) => {
  return Boolean(Object.keys(obj).length);
};
