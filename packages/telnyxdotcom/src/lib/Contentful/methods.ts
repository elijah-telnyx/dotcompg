import { getClient, entries, constants, type GetClientOptions } from 'lib/Contentful';
import type {
  UseCasesPage,
  BlogPage,
  FilterItem,
  ReleaseNotesTag,
  ReleaseNotesQuery,
  LegalPage,
  LegalPagesVersion,
  SolutionsOverviewPage,
  ReleaseNotesSlugPage,
} from 'lib/Contentful/types';
import type { CtaBannerProps, MediaProps } from 'ui/components/@types';
import type { CardProps } from 'ui/components/Cards';
import { formatDateISO, getFallbackMediaField, getNameFromSlug } from './utils';

import { flattenEntry, flattenBlogEntry, flattenMedia } from './utils/flatten';
import { NotFoundError } from 'utils/pageGeneration/CustomError';
import { BASE_URL } from 'env';

import type { MediaWithSysId, MediaPropsForCarousel } from './contentTypes';
import type { CarouselProps } from 'ui/components/Carousel';
import type { CarouselSectionProps } from 'ui/components/@types';

export * from './methods/pages';

const formatBlogLinkResponse = (slug: string) => ({
  href: `/resources/${slug}`,
  text: 'Read article',
  type: 'link',
  linkKind: 'cta',
  linkIcon: {
    src: '',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g clip-path="url(#clip0_2558_1236)">
        <path d="M1 9L-4.37114e-08 9L4.37114e-08 11L1 11L1 9ZM1 11L13 11L13 9L1 9L1 11Z" fill="black"/>
        <path d="M19.2111 9.10557C19.9482 9.4741 19.9482 10.5259 19.2111 10.8944L12.4472 14.2764C11.7823 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 11.7823 5.39116 12.4472 5.72361L19.2111 9.10557Z" fill="black"/>
    </g>
    <defs>
        <clipPath id="clip0_2558_1236">
            <rect width="20" height="20" fill="white"/>
        </clipPath>
    </defs>
</svg>`,
    alt: 'internal',
  },
});

export interface BlogQuery {
  page: number | string;
  limit: number | string;
  slug?: string;
  order?: string;
  category?: string;
  topic?: string;
  topic2?: string;
  query?: string;
  skip?: number | string;
  excludeId?: string;
}

export const getBlogPosts = (args: BlogQuery, opts?: GetClientOptions) => {
  const { order = '-fields.publishDate' } = args;

  let params: object = {
    query: args.query,
    content_type: 'rcPost',
    limit: args.limit,
    skip: Number(args.limit) * (Number(args.page) - 1),
    order,
  };

  if (args.slug) {
    params = {
      ...params,
      include: 3,
      'fields.slug': args.slug,
    };
  }

  if (args.category) {
    params = {
      ...params,
      'fields.category.sys.contentType.sys.id': 'rcCategory',
      'fields.category.fields.name': getNameFromSlug(args.category),
    };
  }

  if (args.topic) {
    params = {
      ...params,
      'fields.topic.sys.contentType.sys.id': 'rcTopic',
      'fields.topic.fields.filterSlug': args.topic,
    };
  }

  if (args.topic2) {
    params = {
      ...params,
      'fields.topic2.sys.contentType.sys.id': 'rcTopic',
      'fields.topic2.fields.filterSlug': args.topic2,
    };
  }

  if (args.skip) {
    params = {
      ...params,
      skip: args.skip,
    };
  }

  if (args.excludeId) {
    params = {
      ...params,
      'sys.id[ne]': args.excludeId,
    };
  }

  return getClient({ blog: true, ...opts }).getEntries<BlogPage>(params);
};

const getBlogCTABanner = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<CtaBannerProps>(entries.blogCtaBanner, { include: 3 })
    .then((sectionData) => {
      if (!sectionData.fields.ctaButtons.length) {
        throw new Error(`Error fetching Blog CTA Banner ${entries.blogCtaBanner}`);
      }

      return flattenEntry<typeof sectionData>(sectionData);
    });
};

interface Query {
  slug: string;
}

export const getBlogPage = ({ slug }: Query, opts?: GetClientOptions) => {
  return Promise.all([
    getBlogCTABanner(opts),
    getBlogPosts({ page: 1, limit: 1, slug }, opts)
      .then((entries) => {
        const entry = entries.items[0];
        if (!entry) {
          throw new NotFoundError(JSON.stringify({ Blog: true, slug }));
        }
        return entry;
      })
      .then((blogEntry) => flattenBlogEntry(blogEntry)),
  ]).then(([ctaBanner, blog]) => ({ ctaBanner, ...blog }));
};

export const getSolutionsPageSysInfo = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<SolutionsOverviewPage>(entries.solutionsOverview, {
      select: ['sys.updatedAt', 'sys.contentType'],
    })
    .then(({ sys }) => sys);
};

// This function is used to create field queries for filtering use cases
// Expected Format example: { 'fields.Department[in]': 'Marketing,Customer Service', 'fields.industries[in]': 'Health Care,Financial Services' }
const generateFieldQueries = (filterSearch: { [key: string]: string }) => {
  return Object.entries(filterSearch).reduce((acc, [key, value]) => {
    if (!value) return acc;
    return {
      ...acc,
      [`fields.${key.toLowerCase()}[in]`]: value,
    };
  }, {});
};

export const getUseCaseOptions = (
  query: {
    page?: string | number;
    topic?: string;
    filterQuery?: { [key: string]: string };
  } = {},
  opts?: GetClientOptions,
  search?: string
) => {
  const { page = 1, topic, filterQuery } = query;
  const limit = constants.SOLUTIONS_USE_CASES_PAGE_LIMIT;

  return getClient(opts)
    .getEntries<UseCasesPage>({
      content_type: 'pageUseCase',
      limit,
      skip: limit * (Number(page) - 1),
      'fields.seo[exists]': true,
      'fields.hero[exists]': true,
      ...(topic && { 'fields.category': topic }),
      ...(filterQuery && generateFieldQueries(filterQuery)),
      include: 3,
      order: 'fields.sort',
      ...(search && { query: search }),
    })
    .then(({ total, items }) => {
      const numberOfPages = Math.ceil(total / limit);

      return Promise.all(items.map((item) => mapUseCasesPageToCardItem(item.fields))).then((items) => ({
        items,
        currentPage: page,
        totalPages: numberOfPages,
      }));
    });
};

export const getSolutionsFilterTopics = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<FilterItem>(entries.solutionsTopicFilter, { include: 4 })
    .then((itemData) => {
      if (!itemData.fields.items?.length) {
        throw new Error(`Error fetching Solutions Topic Filters ${entries.solutionsTopicFilter}`);
      }

      return Promise.all(itemData.fields.items.map((filterItem) => flattenEntry<typeof filterItem>(filterItem))).then(
        (items) => ({
          value: itemData.fields.value,
          items,
        })
      );
    });
};

const mapUseCasesPageToCardItem = async (page: UseCasesPage): Promise<CardProps> => {
  return {
    heading: page.hero.fields.heading,
    copy: page.seo.fields.description,
    media: (page.seo.fields.featuredImage
      ? await flattenMedia(page.seo.fields.featuredImage)
      : {
          src: getFallbackMediaField('').fields.file!.url,
          alt: '',
        }) as MediaProps<'img'>,
    link: {
      href: '/use-cases/' + page.slug,
      text: 'See use case',
      type: 'link',
      linkKind: 'cta',
      linkIcon: {
        src: '',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <g clip-path="url(#clip0_2558_1236)">
              <path d="M1 9L-4.37114e-08 9L4.37114e-08 11L1 11L1 9ZM1 11L13 11L13 9L1 9L1 11Z" fill="black"/>
              <path d="M19.2111 9.10557C19.9482 9.4741 19.9482 10.5259 19.2111 10.8944L12.4472 14.2764C11.7823 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 11.7823 5.39116 12.4472 5.72361L19.2111 9.10557Z" fill="black"/>
          </g>
          <defs>
              <clipPath id="clip0_2558_1236">
                  <rect width="20" height="20" fill="white"/>
              </clipPath>
          </defs>
      </svg>`,
        alt: '',
      } as MediaProps<'svg'>,
    },
  };
};

export const getReleasesNotes = async (args: ReleaseNotesQuery, opts?: GetClientOptions) => {
  const { order = '-fields.publishDate' } = args;
  let params: object = {
    content_type: 'componentReleaseNotesItem',
    limit: args.limit,
    skip: Number(args.limit) * (Number(args.page) - 1) || 0,
    order,
    tags: args.tags || [],
  };

  if (args.slug) {
    params = {
      ...params,
      include: 1,
      'fields.slug': args.slug,
      'fields.content[exists]': true,
    };
  }

  if (args.tags && args.tags.length) {
    const tagList = await getReleasesNotesTags();
    const selectedTag = tagList.items.filter((tag) => args.tags?.includes(tag.fields.slug));
    const selectedTagList = selectedTag.map((tag) => tag.sys.id);
    params = {
      ...params,
      'fields.tags.sys.id[in]': selectedTagList.join(','),
    };
  }

  return getClient({ blog: true, ...opts })
    .getEntries<ReleaseNotesSlugPage>(params)
    .then((entries) => {
      const releaseNotesList = entries.items.map((item) => ({
        ...item.fields,
        link: {
          ...formatBlogLinkResponse(item.fields.slug),
          text: 'Read more',
          href: `/release-notes/${item.fields.slug}`,
        },
        copy: item.fields.text,
      }));
      return {
        items: releaseNotesList,
        pagination: {
          totalPages: Math.ceil(entries.total / Number(args.limit)),
        },
        entries,
      };
    });
};

export const getReleasesNotesTags = () => {
  const params: object = {
    content_type: 'componentReleaseNotesTag',
    limit: constants.PAGES_MINIMUM_LIMIT,
  };
  return getClient({ blog: true }).getEntries<ReleaseNotesTag>(params);
};

export const getLegalPagesVersion = (query: { pages: string[] } = { pages: [] }, opts?: GetClientOptions) => {
  const { pages } = query;

  return getClient(opts)
    .getEntries<LegalPage>({
      content_type: 'pageLegal',
      select: ['sys.updatedAt', 'fields.slug', 'metadata.tags'],
      'fields.seo.sys.contentType.sys.id': 'seo',
      'fields.seo.fields.canonical[exists]': false,
      'metadata.tags.sys.id[in]': pages.toString(),
      order: '-fields.slug',
    })
    .then((response) => {
      const pagesTags: string[] = [];

      // find the first for each unique tag is enough because it's already ordered DESC through contentful query
      const firstTaggedPageEntries = response.items.filter(({ metadata }) => {
        if (!pagesTags.includes(metadata.tags[0].sys.id)) {
          pagesTags.push(metadata.tags[0].sys.id);
          return true;
        }
      });

      return firstTaggedPageEntries.reduce((acc, entry) => {
        const tag = entry.metadata.tags[0].sys.id;
        const slug = entry.fields.slug.replace(/^\//, '');

        return {
          ...acc,
          [tag]: {
            lastmod: formatDateISO(entry.sys.updatedAt),
            url: `${BASE_URL}/legal/${tag}/${slug}`,
          },
        };
      }, {} as LegalPagesVersion);
    });
};

export const getCarouselItems = async ({ carouselEntryId }: { carouselEntryId: string }) => {
  const customerCarouselData = await getClient().getEntry<CarouselSectionProps>(carouselEntryId, false);
  const customerCarousel = await flattenEntry(customerCarouselData);

  const carouselItems: CarouselProps['items'] = await Promise.all(
    customerCarousel.items.map(async (item) => {
      const typedItem = item as MediaWithSysId;
      const mediaId = typedItem?.media?.sys?.id;
      if (!mediaId) {
        return item;
      }
      const mediaItem = await getClient().getEntry<CarouselSectionProps>(mediaId, false);
      const mediaFields = await flattenEntry(mediaItem);

      const { media } = mediaFields as { media?: MediaPropsForCarousel };

      return {
        ...item,
        media,
      };
    })
  );

  return carouselItems;
};
