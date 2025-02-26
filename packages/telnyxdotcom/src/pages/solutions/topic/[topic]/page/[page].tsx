import { constants, getSolutionsFilterTopics } from 'lib/Contentful';

import type { GetStaticPaths } from 'next';
import { IS_PRODUCTION } from 'env';
import env from 'constants/env';

export const getStaticPaths: GetStaticPaths = async () => {
  const entry = await getSolutionsFilterTopics({ preview: !IS_PRODUCTION });

  if (entry?.items?.length) {
    const paths = new Array(constants.SOLUTIONS_PAGE_LOAD)
      .fill(null)
      .flatMap((pages, index) =>
        entry.items.map(({ value }) => ({
          params: {
            topic: value,
            page: String(index + 1),
          },
        }))
      ) // remove first page
      .slice(1);

    return {
      fallback: env.generatePagesFallback.solutions as boolean | 'blocking',
      paths,
    };
  }

  return { paths: [], fallback: env.generatePagesFallback.no as boolean | 'blocking' };
};

export { getStaticProps } from '../../../index';

export { default } from '../../../index';
