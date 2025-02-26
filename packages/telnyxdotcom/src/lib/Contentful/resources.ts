import type { ControlledArticlesListSectionProps } from 'components/ControlledArticlesListSection';
import type { Entry } from 'contentful';
import { getBlogPosts, getClient, type BlogQuery, type GetClientOptions } from 'lib/Contentful';
import type { MarketoFormSectionProps } from 'ui/components/@types';
import type { SecondaryCarouselSectionProps } from 'ui/components/SecondaryCarouselSection';
import type { CarouselCardProps } from 'ui/components/CarouselCard';
import type { BackgroundColor } from 'ui/styles/constants/backgroundColorOptions';
import { generateResourcesPagination } from 'utils/calculateResourcesPagination';
import entries from './entries';
import type { BlogPage, Page } from './types';
import { addPageToCopy } from './utils';
import { flattenBlogEntryItem, flattenEntry } from './utils/flatten';

export enum SectionComponentKeys {
  sectionArticlesList = 'sectionArticlesList',
  sectionForm = 'sectionForm',
}

interface BlogOverviewData extends Page {
  heading: string;
  featuredPosts: Entry<BlogPage>[];
  topSectionBackgroundColor: BackgroundColor;
  sections: Entry<SecondaryCarouselSectionProps & ControlledArticlesListSectionProps & MarketoFormSectionProps>[];
}

export const getBlogOverviewData = (opts?: GetClientOptions) => {
  return getClient({ blog: true, ...opts }).getEntry<BlogOverviewData>(entries.resources.blog, { include: 4 });
};

export const getBlogFilters = (opts?: GetClientOptions) => {
  return getClient({ blog: true, ...opts })
    .getEntry<{
      topicFilter: Entry<ControlledArticlesListSectionProps['topicFilter'][number]>[];
      categoryFilter: Entry<ControlledArticlesListSectionProps['categoryFilter'][number]>[];
    }>(entries.resources.filters)
    .then((data) => {
      if (!data.fields.topicFilter) {
        throw new Error(`Error fetching Blog Category Filters ${entries.resources.filters}`);
      }

      const { categoryFilter, topicFilter } = data.fields;

      return {
        category: categoryFilter.map(({ sys, fields }) => {
          return {
            id: sys.id,
            name: fields.name,
            color: fields.color,
            filterSlug: fields.filterSlug,
          };
        }),
        topic: topicFilter.map(({ sys, fields }) => {
          return {
            id: sys.id,
            name: fields.name,
            color: fields.color,
            filterSlug: fields.filterSlug,
          };
        }),
      };
    });
};

const parseBlogOverviewData = ({ sys, fields }: Entry<BlogOverviewData>) => {
  const { seo, featuredPosts, sections, ...pageData } = fields;

  return Promise.all([
    pageData,
    seo && flattenEntry<typeof seo>(seo),
    Promise.all(featuredPosts.map(flattenBlogEntryItem)),
    Promise.all(sections.map((section) => flattenEntry<typeof section>(section))),
  ]).then(([pageData, seo, featuredPosts, sections]) => {
    return {
      id: sys.id,
      ...pageData,
      seo,
      featuredPosts,
      sections,
    };
  });
};

export const getBlogPageData = ({ query }: { query: BlogQuery }, opts?: GetClientOptions) => {
  return Promise.all([getBlogOverviewData(opts), getBlogPosts(query, opts)]).then(async ([pageData, articlesData]) => {
    const { topic2: topic, query: search, page = 1 } = query;

    const parsedArticles = articlesData.items.map(parseBlogEntryItemsToBlogCardsItems);
    const { heading, ...parsedPageData } = await parseBlogOverviewData(pageData);

    const pagination = generateResourcesPagination({
      totalArticles: articlesData.total,
      currentPage: Number(page),
      topic,
      search,
    });

    const appendPage = addPageToCopy(query.page);

    return {
      ...parsedPageData,
      seo: {
        title: 'Telnyx Blog | CPaas & UCaaS Resources',
        description:
          'Find data-driven research, comprehensive guides and all things SIP trunking, voice and SMS APIs, wireless and more.',
        ogType: 'webpage',
      },
      heading: appendPage(heading, { format: 'after', hiddenPage: true }),

      articles: {
        pagination: { ...pagination, htmlAs: 'a' as keyof JSX.IntrinsicElements },
        items: parsedArticles,
      },
      // use as page params/query params
      topic,
      search,
    };
  });
};

export const parseBlogEntryItemsToBlogCardsItems = (blogEntry: Entry<BlogPage>): CarouselCardProps & { id: string } => {
  const blogPage = blogEntry.fields;
  const author = blogPage.author.fields;
  const authorMedia = author.media?.fields;

  const topic = blogPage?.topic2?.fields || blogPage.topic;
  const category = blogPage?.category?.fields;

  return {
    id: blogPage.slug,
    tagline: topic || category,
    heading: blogPage.title,
    href: `/resources/${blogPage.slug}`,
    author: {
      media: {
        src: authorMedia?.file?.url || '',
        alt: authorMedia?.description || authorMedia?.description || '',
      },
      name: `${author.firstName} ${author.lastName}`,
    },
  };
};
