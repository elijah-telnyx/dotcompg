import { constants, getUseCaseOptions } from 'lib/Contentful';

import type { GetStaticPaths } from 'next';
import { IS_PRODUCTION } from 'env';
import env from 'constants/env';

export const getStaticPaths: GetStaticPaths = async () => {
  const entry = await getUseCaseOptions({}, { preview: !IS_PRODUCTION });

  const maxPages = entry.totalPages > constants.SOLUTIONS_PAGE_LOAD ? constants.SOLUTIONS_PAGE_LOAD : entry.totalPages;

  if (entry?.items?.length) {
    const paths = new Array(maxPages)
      .fill(null)
      .map((pages, index) => ({
        params: {
          page: String(index + 1),
        },
      }))
      // remove first page
      .slice(1);

    return {
      fallback: env.generatePagesFallback.solutions as boolean | 'blocking',
      paths,
    };
  }

  return { paths: [], fallback: env.generatePagesFallback.no as boolean | 'blocking' };
};

export { getStaticProps } from '../index';

export { default } from '../index';
