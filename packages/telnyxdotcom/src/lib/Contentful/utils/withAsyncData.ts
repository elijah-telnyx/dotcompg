import type { Entry } from 'contentful';
import * as contentTypes from '../contentTypes';
import type { flattenEntry } from './flatten';

export const withAsyncData = async <T extends Entry<unknown>>(entryPromise: ReturnType<typeof flattenEntry<T>>) => {
  return entryPromise.then(async (sectionProps) => {
    const needExternalData = isAsyncSection(sectionProps.contentType);
    if (!needExternalData) return sectionProps;
    /**
     * get the data from the external source
     * example:
     *
     * if (sectionProps.contentType === contentTypes.asyncSectionTypes.heroDemo) {
     *   const heroDemo = sectionProps as DemoHeroProps;
     *   switch (heroDemo.demoType) {
     *     case 'inference': {
     *       const modelOptions = await getAIModels();
     *       return { ...sectionProps, childrenProps: { modelOptions } };
     *     }
     *   }
     * }
     */

    return sectionProps;
  });
};

const isAsyncSection = (contentType?: string) => {
  if (!contentType) {
    return false;
  }
  return contentType in contentTypes.asyncSectionTypes;
};
