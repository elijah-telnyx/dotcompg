import { routes } from 'utils/routes';
import { constants } from 'lib/Contentful';

export function calculateResourcesPagination(total: number, currentPage: number) {
  const ITEMS_PER_PAGE = constants.MAX_BLOG_POSTS_PER_PAGE;

  // Calculate total number of pages considering the first page has only 24 items
  const totalPages = total && Math.ceil(total / ITEMS_PER_PAGE);

  return {
    currentPage,
    nextPage: currentPage < totalPages ? currentPage + 1 : undefined,
    previousPage: currentPage > 1 ? currentPage - 1 : undefined,
    totalPages,
  };
}

const generateResourcesPaginationHref = ({
  topic,
  page,
  search,
  category,
}: {
  topic?: string;
  page?: number;
  search?: string;
  category?: string;
}) => {
  if (search) {
    const pagePath = page && page !== 1 ? `&page=${page}` : '';
    return `${routes.resources.search}?s=${search}${pagePath}#articles`;
  }

  const topicPath = topic ? `/topic/${topic}` : '';
  const pagePath = page && page !== 1 ? `/page/${page}` : '';
  const categoryParam = category ? `?category=${category}` : '';

  return `${routes.resources.root}${topicPath}${pagePath}${categoryParam}#articles`;
};

export const generateResourcesPagination = ({
  totalArticles,
  currentPage,
  topic,
  search,
  category,
}: {
  totalArticles: number;
  currentPage: number;
  topic?: string;
  search?: string;
  category?: string;
}) => {
  const paginationData = calculateResourcesPagination(totalArticles, currentPage);

  const totalPages = paginationData.totalPages;

  return {
    pageCounter: {
      currentPage,
      totalPages,
    },
    previous: {
      page: paginationData.previousPage,
      href: generateResourcesPaginationHref({ topic, page: paginationData.previousPage, search, category }),
    },
    next: {
      page: paginationData.nextPage,
      href: generateResourcesPaginationHref({ topic, page: paginationData.nextPage, search, category }),
    },
  };
};
