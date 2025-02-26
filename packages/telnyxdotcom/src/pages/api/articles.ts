import type { NextApiHandler } from 'next';
import { constants, getBlogPosts } from 'lib/Contentful';
import { parseBlogEntryItemsToBlogCardsItems } from 'lib/Contentful/resources';
import { calculateResourcesPagination } from 'utils/calculateResourcesPagination';
import { PREVIEW_MODE_DEFAULT } from 'env';

export type ArticlesResponse = {
  status: string;
  items: ReturnType<typeof parseBlogEntryItemsToBlogCardsItems>[];
  pagination: ReturnType<typeof calculateResourcesPagination>;
};

const handler: NextApiHandler<ArticlesResponse> = async (req, res) => {
  const preview = req.preview || PREVIEW_MODE_DEFAULT;
  const { topic: topic2, ...query } = req.query;

  const articlesData = await getBlogPosts(
    {
      page: 1,
      limit: constants.MAX_BLOG_POSTS_PER_PAGE,
      ...query,
      topic2: topic2?.toString(),
    },
    { preview }
  );
  const currentPage = Number(query.page) || 1;
  const pagination = calculateResourcesPagination(articlesData.total, currentPage);

  res.status(200).json({
    status: 'ok',
    pagination,
    items: articlesData.items.map(parseBlogEntryItemsToBlogCardsItems),
  });
};

export default handler;
