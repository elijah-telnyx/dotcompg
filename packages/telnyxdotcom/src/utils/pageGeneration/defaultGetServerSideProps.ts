import type { GetServerSidePropsContext } from 'next';

import * as utils from './utils';
import type { ContextProps } from './defaultGetStaticProps';
import type { TrackingData } from '@growthbook/growthbook';
import { errorLogger } from 'utils/errorHandler/errorLogger';
import { getGrowthBookData } from 'services/growthBookService';
import { CustomErrorHandler } from './CustomError';
import { PREVIEW_MODE_DEFAULT } from 'env';

export interface Params {
  page: string;
  getData: (
    context: GetServerSidePropsContext<ContextProps>,
    trackingData: TrackingData[]
  ) => Promise<unknown> | unknown;
  scripts?: {
    pipedata?: boolean;
  };
}

export const defaultGetServerSideProps = <PageEntryProps extends { [key: string]: any }>({
  page,
  getData,
  scripts = {},
}: Params) => {
  const nextJSGetServerSideProps = async (context: GetServerSidePropsContext<PageEntryProps, ContextProps>) => {
    if (!getData) {
      throw new Error(
        `Page ${utils.formatPageNameWithParams(page, context?.params as ContextProps)} is missing getData`
      );
    }

    const preview = PREVIEW_MODE_DEFAULT || Boolean(context.preview);
    let trackingData: TrackingData[] = [];

    try {
      trackingData = await getGrowthBookData({ context });

      const pageEntry = (await getData({ ...context, preview }, trackingData)) as PageEntryProps;

      if (pageEntry.notFound) {
        return {
          notFound: true,
        };
      }

      return {
        // convertUndefinedToNull is required for SSG
        // SSG can't serialize undefined to JSON
        props: {
          ...(utils.convertUndefinedToNull(pageEntry) as PageEntryProps),
          ...scripts,
          preview,
          trackingData,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        errorLogger({ error, url: page });
        const handled = CustomErrorHandler(error);
        if (handled) {
          return handled;
        }
      }
      throw error;
    }
  };
  return nextJSGetServerSideProps;
};
