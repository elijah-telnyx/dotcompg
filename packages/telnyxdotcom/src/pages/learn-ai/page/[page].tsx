import { getGlossaryOverViewData, constants } from 'lib/AirTable/learn-ai';

import type { GetStaticPaths } from 'next';
import env from 'constants/env';

export { default, getStaticProps } from '../index';

export const getStaticPaths: GetStaticPaths = async () => {
  const query = {
    page: 1,
    limitPerPage: constants.MAX_GLOSSARY_POSTS_PER_PAGE,
    options: {
      fields: ['slug', 'title', 'metaDescription', 'tag', 'tagColor', 'authorName', 'authorImage'],
      sort: [{ field: 'title', direction: 'desc' as const }],
    },
  };

  const entries = await getGlossaryOverViewData(query);

  if (entries) {
    const paths = new Array(constants.MAX_GLOSSARY_POSTS_PER_PAGE)
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
      fallback: env.generatePagesFallback.learnAi as boolean | 'blocking',
      paths,
    };
  }

  return { paths: [], fallback: env.generatePagesFallback.learnAi as boolean | 'blocking' };
};
