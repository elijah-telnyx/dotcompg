import { constants, getBlogPosts } from 'lib/Strapi';

import type { GetStaticPaths } from 'next';
import env from 'constants/env';

export { default, getStaticProps } from '../index';

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getBlogPosts({ page: 1, pageSize: constants.MAX_BLOG_POSTS_PER_PAGE }, {});

  if (entries) {
    const paths = new Array(constants.MAX_PRE_GENERATED_BLOG_POSTS_PAGES)
      .fill(null)
      .map((pages, index) => ({
        params: {
          page: String(index + 1),
        },
      }))
      // remove the first item from the array, which is the first page
      // it should be handled by the index page
      .slice(1);

    return {
      fallback: env.generatePagesFallback.resources as boolean | 'blocking',
      paths,
    };
  }

  return { paths: [], fallback: env.generatePagesFallback.resources as boolean | 'blocking' };
};
