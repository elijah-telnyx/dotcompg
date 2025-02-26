import * as contentTypes from "../contentTypes";
import type { flattenEntry } from "./flatten";
import type { Entry } from "contentful";

export const withAsyncData = async <T extends Entry<unknown>>(
  entryPromise: ReturnType<typeof flattenEntry<T>>
) => {
  return entryPromise.then(async (sectionProps) => {
    const needExternalData = isAsyncSection(sectionProps.contentType);
    if (!needExternalData) return sectionProps;
    return sectionProps;
  });
};

const isAsyncSection = (contentType?: string) => {
  if (!contentType) {
    return false;
  }
  return contentType in contentTypes.asyncSectionTypes;
};
