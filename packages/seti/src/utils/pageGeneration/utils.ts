import type { ContextProps } from "./defaultGetStaticProps";

export const formatPageNameWithParams = (
  page: string,
  params: ContextProps
): string =>
  Object.entries(params).reduce((pageName, [key, value]) => {
    return pageName.replace(`[${key}]`, value);
  }, page);

/**
 * @TODO:
 * make this function return a generic based on the type received
 */
export const convertUndefinedToNull = (
  obj: object
): { [key: string]: any } | null => {
  const type = typeof obj;
  if (type === "undefined" || obj === null) return null;
  if (type === "object") {
    if (Array.isArray(obj)) {
      return obj.map(convertUndefinedToNull);
    } else {
      return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [k, convertUndefinedToNull(v)])
      );
    }
  }
  return obj;
};
