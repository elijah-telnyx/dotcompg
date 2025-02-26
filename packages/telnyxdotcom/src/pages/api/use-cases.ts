import type { NextApiHandler } from 'next';
import { getUseCaseOptions } from 'lib/Contentful';
import { PREVIEW_MODE_DEFAULT } from 'env';
import { errorLogger } from 'utils/errorHandler/errorLogger';

import type { SearchResponseProps } from 'ui/components/GridCards';
import type { CardProps } from 'ui/components/Cards';
export type { SearchResponseProps };

const handler: NextApiHandler<SearchResponseProps<CardProps>> = async (req, res) => {
  const preview = req.preview || PREVIEW_MODE_DEFAULT;
  const { page: pageQuery = 1, search: searchQuery, ...restQuery } = req.query;
  const page = Array.isArray(pageQuery) ? pageQuery[0] : pageQuery;
  const search = Array.isArray(searchQuery) ? searchQuery[0] : searchQuery;

  // Extract and normalize `filterQuery` keys, due to the way they are passed in the query
  // Expected format example: {Industries: 'Health Care,Logistics and transportation', Department: 'Marketing,Customer support'}
  const filterQuery = Object.keys(restQuery).reduce((acc, key) => {
    const match = key.match(/^filterQuery\[(.*)\]$/);
    if (match) {
      acc[match[1]] = restQuery[key] as string;
    }
    return acc;
  }, {} as Record<string, string>);

  try {
    const articlesData = await getUseCaseOptions({ page, filterQuery }, { preview }, search);

    const { items, currentPage, totalPages } = articlesData;

    res.status(200).json({
      status: 'ok',
      items,
      pagination: { currentPage, totalPages },
    });
  } catch (error) {
    errorLogger({
      error: new Error(`Error fetching use cases', ${error}`),
    });
    return;
  }
};

export default handler;
