import type { GetStaticPaths } from 'next';
import { IS_PRODUCTION } from 'env';
import env from 'constants/env';
import { getSolutionsFilterTopics } from 'lib/Contentful';

export const getStaticPaths: GetStaticPaths = async () => {
  const entry = await getSolutionsFilterTopics({ preview: !IS_PRODUCTION });

  if (entry?.items?.length) {
    const paths = entry.items.map(({ value }) => ({
      params: {
        topic: value,
      },
    }));

    return {
      fallback: env.generatePagesFallback.solutions as boolean | 'blocking',
      paths,
    };
  }

  return { paths: [], fallback: env.generatePagesFallback.no as boolean | 'blocking' };
};

export { getStaticProps } from '../index';

export { default } from '../index';
