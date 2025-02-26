import type { Entry } from 'contentful';
import type { ArticleClassification } from '../types';
import getClient from 'lib/Contentful/client';
import entries from 'lib/Contentful/entries';
import constants from 'lib/Contentful/constants';
import { getSitemapData as getLlmLibrarySitemapData } from 'pages/llm-library/[slug]';
import { sitemapData as stateNumberSitemapData } from 'pages/phone-numbers/[slug]';
import { supportSitemapData } from 'lib/Static/data/supportSitemapData';
import { formatDateISO, getRange } from '../utils';

/**
 * @TYPES
 */
interface PageEntry {
  slug: string;
  seo: Entry<{
    robots?: 'follow,noindex' | 'nofollow,noindex' | 'nofollow,index';
  }>;
}

interface LegacyPageEntry {
  slug: string;
  content_type: string;
  applyNoIndex: boolean;
}

export interface SitemapData {
  url: string;
  lastmod: string;
}

export interface RedirectEntry {
  source: string;
  destination: string;
  permanent: boolean;
}

/**
 * @CONFIG
 */
export const LEGACY_PAGE_TYPES = {
  componentReleaseNotesItem: {
    parentUrl: '/release-notes',
    parentPageId: '',
    pageLimit: constants.RELEASE_NOTES_PAGE_LIMIT,
  },
  rcPost: {
    parentUrl: '/resources',
    parentPageId: '',
    pageLimit: constants.MAX_BLOG_POSTS_PER_PAGE,
  },
} as const;

const PRICING_PAGE_TYPE = 'pagePricing';

/**
 * @date 2023-05-09
 *    - /landing pages are on this list because they are not indexable
 *      and currently we use them from the legacy project
 */
export const PAGE_TYPES = {
  pageBlogOverview: {
    parentUrl: '',
    tagUrls: [],
  },
  pagePricingOverview: {
    parentUrl: '',
    tagUrls: [],
  },
  pageSolutionsOverview: {
    parentUrl: '',
    tagUrls: [],
  },
  pageCustomerStories: {
    parentUrl: '/customer-stories',
    tagUrls: [],
  },
  pageLegal: {
    parentUrl: '/legal',
    tagUrls: ['terms-and-conditions-of-service', 'privacy-policy'],
  },
  [PRICING_PAGE_TYPE]: {
    parentUrl: '/pricing',
    tagUrls: [],
  },
  pageProduct: {
    parentUrl: '/products',
    tagUrls: [],
  },
  pageSolution: {
    parentUrl: '/solutions',
    tagUrls: [],
  },
  pageUseCase: {
    parentUrl: '/use-cases',
    tagUrls: [],
  },
  // hardcoded ones
  pageWhyTelnyx: {
    parentUrl: '',
    tagUrls: [],
  },
  pageLanding: {
    parentUrl: '/landing',
    tagUrls: [],
  },
} as const;

const client = getClient();
const legacyCmsClient = getClient({ blog: true });

export async function getRedirects() {
  const redirects = (await client.getEntry<{ redirects: RedirectEntry[] }>(entries.redirects)).fields.redirects;
  return redirects;
}

export const getPages = () => {
  return Promise.all(
    Object.keys(PAGE_TYPES).flatMap((type) => {
      const pageType = type as keyof typeof PAGE_TYPES;
      const pageQuery = {
        content_type: type,
        select: ['sys.updatedAt', 'sys.contentType', 'fields.slug', 'fields.seo', 'metadata.tags'],
        'fields.seo.sys.contentType.sys.id': 'seo',
        // remove entries that have a canonical url
        'fields.seo.fields.canonical[exists]': false,
      };

      if (PAGE_TYPES[pageType].tagUrls.length) {
        return [
          client.getEntries<PageEntry>({
            ...pageQuery,
            // ignore entries tagged as sub pages
            'metadata.tags[exists]': false,
          }),
          client.getEntries<PageEntry>({
            ...pageQuery,
            // logic for entries that have metatags for sub pages
            'metadata.tags.sys.id[in]': PAGE_TYPES[pageType].tagUrls.toString(),
          }),
        ];
      }

      return client.getEntries<PageEntry>(pageQuery);
    })
  );
};

export async function getLegacyRcTopicPages() {
  const pageType = 'rcPost';
  let sitemapDataList: SitemapData[] = [];

  const legacyRcTopicFilters = await legacyCmsClient.getEntry<{
    topicFilter: Entry<ArticleClassification>[];
  }>(entries.resources.filters);

  for (const topicEntry of legacyRcTopicFilters.fields.topicFilter) {
    sitemapDataList.push(parseLegacyRcTopicPageEntry(topicEntry));

    const legacyRcTopicPaginatedPages = await legacyCmsClient.getEntries<LegacyPageEntry>({
      content_type: pageType,
      limit: constants.PAGES_MAXIMUM_LIMIT,
      select: ['sys.updatedAt', 'sys.contentType', 'fields.slug', 'fields.applyNoIndex'],
      'fields.topic2.sys.contentType.sys.id': 'rcTopic',
      'fields.topic2.fields.filterSlug': topicEntry.fields.filterSlug,
    });

    sitemapDataList = [
      ...sitemapDataList,
      ...parseLegacyEntryPaginatedPages(
        pageType,
        legacyRcTopicPaginatedPages.total,
        legacyRcTopicPaginatedPages.items.filter((entry) => !entry.fields.applyNoIndex),
        topicEntry.fields.filterSlug
      ),
    ];
  }

  return sitemapDataList;
}

export const getStaticPages = async (): Promise<SitemapData[]> => {
  const staticPages = [
    { url: '/', lastmod: '2023-03-30' },
    { url: '/products', lastmod: '2023-02-02' },
    { url: '/sign-up', lastmod: '2023-02-16' },
    { url: '/why-telnyx', lastmod: '2023-02-16' },
    { url: '/cookie-policy', lastmod: '2023-04-11' },
    { url: '/release-notes', lastmod: '2023-05-08' },
    { url: '/acceptable-use-policy', lastmod: '2024-03-04' },
    { url: '/report-abuse', lastmod: '2023-04-23' },
    { url: '/law-enforcement-request', lastmod: '2024-06-10' },
    { url: '/company/data-privacy', lastmod: '2024-03-04' },
    { url: '/company/trust-and-security', lastmod: '2024-03-04' },
    { url: 'https://joinslack.telnyx.com', lastmod: '2024-03-05' },
    { url: 'https://peering.telnyx.com', lastmod: '2024-03-05' },
    { url: 'https://portal.telnyx.com', lastmod: '2024-03-05' },
    { url: 'https://portal.telnyx.com/v2/index.html', lastmod: '2024-07-08' },
    { url: 'https://sip.telnyx.com', lastmod: '2024-03-05' },
    { url: 'https://webrtc.telnyx.com', lastmod: '2024-07-08' },
    { url: 'https://flow.telnyx.com', lastmod: '2024-07-08' },
    { url: 'https://status.telnyx.com', lastmod: '2024-07-08' },
    { url: 'https://status.telnyx.com/history', lastmod: '2024-07-08' },
    ...(await getLlmLibrarySitemapData()),
    ...stateNumberSitemapData,
  ];
  return staticPages;
};

export const getLegacyPages = async () => {
  const getPages = (legacyPageType: keyof typeof LEGACY_PAGE_TYPES, applyNoIndex = true) =>
    legacyCmsClient.getEntries<LegacyPageEntry>({
      content_type: legacyPageType,
      limit: constants.PAGES_MAXIMUM_LIMIT,
      select: ['sys.updatedAt', 'sys.contentType', 'fields.slug'],
      // remove entries that have noindex
      'fields.applyNoIndex[ne]': applyNoIndex,
      ...(LEGACY_PAGE_TYPES[legacyPageType].parentPageId
        ? {
            'fields.parentPage[exists]': true,
            'fields.parentPage.sys.id': LEGACY_PAGE_TYPES[legacyPageType].parentPageId,
          }
        : {}),
    });

  // separate req for totals since we filter out noindex pages later
  const pageTotals = await Promise.all(
    Object.keys(LEGACY_PAGE_TYPES).map((type) => {
      const legacyPageType = type as keyof typeof LEGACY_PAGE_TYPES;

      return getPages(legacyPageType, false).then((data) => ({ [legacyPageType]: data.total }));
    })
  ).then((totals) => totals.reduce((acc, total) => ({ ...acc, ...total }), {}));

  return Promise.all(
    Object.keys(LEGACY_PAGE_TYPES).map((type) => {
      const legacyPageType = type as keyof typeof LEGACY_PAGE_TYPES;

      return getPages(legacyPageType).then((data) => ({
        ...data,
        total: pageTotals[legacyPageType],
        content_type: legacyPageType,
      })); // easier to group by
    })
  );
};

const sort = {
  byLatest: (data1: string, data2: string) => data2.localeCompare(data1),
  byEarliest: (data1: string, data2: string) => data1.localeCompare(data2),
};

const parseEntry = (data: Entry<PageEntry>): SitemapData => {
  const { slug } = data.fields;
  const { tags } = data.metadata;
  const pageType = data.sys.contentType.sys.id as keyof typeof PAGE_TYPES;
  const parentUrl = PAGE_TYPES[pageType].parentUrl;
  const tagUrl = tags.length ? `${tags[0].sys.id}/` : '';
  return {
    lastmod: formatDateISO(data.sys.updatedAt),
    url: `${parentUrl}/${tagUrl}${slug.replace(/^\//, '')}`,
  };
};

const parseLegacyEntry = (data: Entry<LegacyPageEntry>): SitemapData => {
  const { slug } = data.fields;
  const pageType = data.sys.contentType.sys.id as keyof typeof LEGACY_PAGE_TYPES;
  const parentUrl = LEGACY_PAGE_TYPES[pageType].parentUrl;
  return {
    lastmod: formatDateISO(data.sys.updatedAt),
    url: `${parentUrl}/${slug.toLocaleLowerCase().replace(/^\//, '')}`,
  };
};

const parseLegacyEntryPaginatedPages = (
  pageType: keyof typeof LEGACY_PAGE_TYPES,
  total: number,
  pageEntries: Entry<LegacyPageEntry>[],
  topic?: string
): SitemapData[] => {
  const pageLimit = LEGACY_PAGE_TYPES[pageType].pageLimit;
  const parentUrl = LEGACY_PAGE_TYPES[pageType].parentUrl;
  const totalPages = Math.ceil(total / pageLimit);
  const lastEntryUpdatedAt = new Date(
    Math.max(...pageEntries.map((data) => new Date(data.sys.updatedAt).getTime()))
  ).toISOString();

  return getRange(2, totalPages).map((pageNumber) => ({
    lastmod: formatDateISO(lastEntryUpdatedAt),
    url: `${parentUrl}${topic ? `/topic/${topic}` : ''}/page/${pageNumber}`,
  }));
};

const parseLegacyRcTopicPageEntry = (data: Entry<ArticleClassification>): SitemapData => {
  const { filterSlug } = data.fields;
  return {
    lastmod: formatDateISO(data.sys.updatedAt),
    url: `${LEGACY_PAGE_TYPES.rcPost.parentUrl}/topic/${filterSlug.toLocaleLowerCase()}`,
  };
};

/*
 * remove entries that contain noindex in robots field
 */
const removeNoIndexPages = ({ fields }: Entry<PageEntry>) => !fields.seo.fields?.robots?.includes('noindex');

export async function getSitemapData() {
  try {
    console.info('Starting sitemap generation...');
    console.info('Getting pages...');

    const [pagesData, legacyPagesData, rcTopicPages, staticPages, redirects] = await Promise.all([
      getPages(),
      getLegacyPages(),
      getLegacyRcTopicPages(),
      getStaticPages(),
      (await getRedirects()).map((redirect) => redirect.source),
    ]);

    console.info('Parsing data...');
    const pages = pagesData.flatMap((page) => {
      return page.items.filter(removeNoIndexPages).reduce<SitemapData[]>((parsedPages, pageEntry) => {
        const parsedEntry = parseEntry(pageEntry);
        return parsedPages.concat(parsedEntry);
      }, []);
    });

    const legacyPages = legacyPagesData.flatMap((page) => {
      const legacyPagesList = page.items.map(parseLegacyEntry);
      const legacyPagesPaginatedLimit = LEGACY_PAGE_TYPES[page.content_type].pageLimit;

      if (legacyPagesPaginatedLimit && page.total > legacyPagesPaginatedLimit) {
        const legacyPaginatedPagesList = parseLegacyEntryPaginatedPages(page.content_type, page.total, page.items);

        return [...legacyPagesList, ...legacyPaginatedPagesList];
      }

      return legacyPagesList;
    });

    console.log('Removing redirected pages and sorting');
    const sitemap = [...pages, ...staticPages, ...legacyPages, ...rcTopicPages, ...supportSitemapData]
      .filter((entry) => !redirects.includes(entry.url))
      .sort((p1, p2) => sort.byLatest(p1.lastmod, p2.lastmod));

    console.info(`Finished generating public/sitemap.xml - ${sitemap.length} entries generated`);
    return sitemap;
  } catch (e) {
    console.error('There was an error generating the sitemap');
    console.error(e);

    throw e;
  }
}
