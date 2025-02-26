import { getRawDocument } from 'services/strapiApiService';
import type { APIResponseByDocumentID, GetOptions, QueryFilter, Strapi } from './types';
import {
  getRestAPIUid,
  getQueryString,
  flattenBlogComposableArticleDocument,
  flattenCtaBannerDocument,
  addPageToCopy,
  flattenBlogPostDocumentToBlogCard,
  flattenBlogOverviewDocument,
  flattenRelatedArticlesDocuments,
} from './utils';
import { ids } from './documents';
import { NotFoundError } from 'utils/pageGeneration/CustomError';
import { generateResourcesPagination } from 'utils/calculateResourcesPagination';
import { constants } from './constants';

export type BlogField =
  | 'slug'
  | 'category'
  | 'topic'
  | 'featureImage'
  | 'thumbnail'
  | 'metaImage'
  | 'metaImage'
  | 'author'
  | 'sections'
  | 'modifiedDate'
  | 'publishDate'
  | 'dynamicSections';

export type BlogOverviewField = 'featuredPosts' | 'sections';

export interface BlogPageQuery {
  slug: string;
  category?: string;
  topic?: string;
}

export interface BlogRelatedPageQuery {
  category?: string;
  topic?: string;
  page?: number;
  pageSize?: number;
  query?: string;
  excludeDocumentId?: string;
}

async function getDocument<
  TContentTypeUID extends Strapi.UID.ContentType,
  TField extends string = string,
  TDocumentID extends string | undefined = undefined
>(
  contentType: TContentTypeUID,
  options: GetOptions,
  query?: QueryFilter<TField>,
  documentId?: string
): Promise<APIResponseByDocumentID<TContentTypeUID, TDocumentID>> {
  return getRawDocument(getRestAPIUid(contentType, options), getQueryString(query, options), documentId)
    .then((r) => r.json())
    .then((apiResponse) => apiResponse as APIResponseByDocumentID<TContentTypeUID, TDocumentID>);
}

/**
 *
 * @param args Defined as a BlogQuery object to match existing structure
 */
export async function getBlogPost({ slug }: BlogPageQuery, options: GetOptions) {
  return getDocument<'api::rc-post.rc-post', BlogField>('api::rc-post.rc-post', options, {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    pagination: {
      page: 0,
      pageSize: 1,
    },
    populate: {
      category: {
        fields: ['name', 'color'],
      },
      topic: {
        fields: ['name', 'color'],
      },
      author: {
        fields: ['firstName', 'lastName', 'description', 'linkedin', 'role'],
        populate: ['media', 'media.file'],
      },
      featureImage: {
        populate: ['file'],
      },
      thumbnail: {
        populate: ['file'],
      },
      metaImage: {
        populate: ['file'],
      },
      sections: {
        fields: [
          'title',
          'tagline',
          'heading',
          'lead',
          'copy',
          'backgroundColor',
          'spacingTop',
          'spacingBottom',
          'fullWidth',
        ],
      },
      dynamicSections: {
        on: {
          'blog.markdown-section': {
            populate: '*',
          },
          'blog.rc-media-image': {
            populate: '*',
          },
          'blog.text-callout': {
            populate: '*',
          },
          'blog.video': {
            populate: {
              media: {
                populate: {
                  media: {
                    populate: '*',
                  },
                  poster: {
                    populate: '*',
                  },
                },
              },
            },
          },
          'blog.tabs-group': {
            populate: {
              tabs: {
                populate: {
                  media: {
                    populate: ['file'],
                  },
                },
              },
            },
          },
        },
      },
    },
  })
    .then((response) => response.data[0])
    .then((document) => {
      if (!document) {
        throw new NotFoundError(JSON.stringify({ Blog: true, slug }));
      }

      return document;
    });
}

export async function getBlogPosts(
  { topic, category, page, pageSize, excludeDocumentId, query }: BlogRelatedPageQuery,
  options: GetOptions
) {
  return getDocument<'api::rc-post.rc-post', BlogField>('api::rc-post.rc-post', options, {
    sort: 'publishDate:desc',
    filters: {
      ...(topic && {
        topic: {
          slug: {
            $eq: topic,
          },
        },
      }),
      ...(category && {
        category: {
          slug: {
            $eq: category,
          },
        },
      }),
      ...(excludeDocumentId && {
        documentId: {
          $ne: excludeDocumentId,
        },
      }),
      ...(query && {
        title: {
          $containsi: query,
        },
      }),
    },
    pagination: {
      page,
      pageSize,
    },
    populate: {
      category: {
        fields: ['name', 'color'],
      },
      topic: {
        fields: ['name', 'color'],
      },
      author: {
        fields: ['firstName', 'lastName'],
        populate: ['media', 'media.file'],
      },
    },
  });
}

export async function getBlogCTABanner(options: GetOptions) {
  return getDocument<'api::section-cta-banner.section-cta-banner', string, string>(
    'api::section-cta-banner.section-cta-banner',
    options,
    {},
    ids['section-cta-banner']
  ).then((response) => response.data);
}

export const getReleaseNoteTags = async (options: GetOptions) => {
  return getDocument<'api::component-release-notes-tag.component-release-notes-tag'>(
    'api::component-release-notes-tag.component-release-notes-tag',
    options,
    {
      sort: 'title:asc',
      pagination: {
        pageSize: 50,
      },
    }
  ).then((res) => {
    const data = res.data.map((item) => ({
      name: item.title,
      value: item.slug,
    }));
    return { ...res, data };
  });
};

export const getReleaseNoteItems = async (options: GetOptions, query: QueryFilter) => {
  return getDocument<'api::component-release-note-item.component-release-note-item'>(
    'api::component-release-note-item.component-release-note-item',
    options,
    {
      sort: 'publishDate:desc',
      filters: {
        ...query.filters,
      },
      pagination: {
        ...query.pagination,
      },
    }
  ).then((res) => {
    const data = res.data.map((i) => ({
      ...i,
      link: {
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
        text: 'Read more',
        href: `/release-notes/${i.slug}`,
      },
      copy: i.text,
    }));
    return { ...res, data };
  });
};

export const getReleaseNoteItem = async (options: GetOptions, slug: string) => {
  return getDocument<'api::component-release-note-item.component-release-note-item'>(
    'api::component-release-note-item.component-release-note-item',
    options,
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
    }
  );
};

export async function getBlogPage({ slug }: BlogPageQuery, options: GetOptions) {
  const blogDocument = await getBlogPost({ slug }, options);

  const blogPostsByTopicQuery: BlogRelatedPageQuery = {
    page: 1,
    pageSize: constants.BLOG_POSTS_RELATED_ARTICLES_LIMIT / 2,
    topic: blogDocument.topic?.slug,
    excludeDocumentId: blogDocument.documentId,
  };

  const blogPostsByCategoryQuery: BlogRelatedPageQuery = {
    page: 1,
    pageSize: constants.BLOG_POSTS_RELATED_ARTICLES_LIMIT / 2,
    category: blogDocument.category?.slug,
    excludeDocumentId: blogDocument.documentId,
  };

  return Promise.all([
    getBlogCTABanner(options).then(flattenCtaBannerDocument),
    Promise.all([getBlogPosts(blogPostsByTopicQuery, options), getBlogPosts(blogPostsByCategoryQuery, options)]).then(
      ([relatedArticlesTopicResponse, relatedArticlesCategoryResponse]) =>
        flattenRelatedArticlesDocuments([...relatedArticlesTopicResponse.data, ...relatedArticlesCategoryResponse.data])
    ),
    flattenBlogComposableArticleDocument(blogDocument),
  ]).then(([ctaBanner, relatedArticles, blog]) => {
    return {
      ctaBanner,
      relatedArticles,
      ...blog,
    };
  });
}

export async function getBlogOverview(options: GetOptions) {
  return getDocument<
    'api::page-resource-center-landing-page-container.page-resource-center-landing-page-container',
    BlogOverviewField,
    string
  >('api::page-resource-center-landing-page-container.page-resource-center-landing-page-container', options, {
    populate: {
      featuredPosts: {
        fields: ['title', 'slug'],
        populate: [
          'featureImage',
          'featureImage.file',
          'thumbnail',
          'thumbnail.file',
          'category',
          'topic',
          'author',
          'author.media',
          'author.media.file',
        ],
      },
      sections: {
        on: {
          'blog.rc-section-articles-carousel': {
            populate: {
              section: {
                populate: {
                  items: {
                    populate: [
                      'featureImage',
                      'featureImage.file',
                      'thumbnail',
                      'thumbnail.file',
                      'category',
                      'topic',
                      'author',
                      'author.media',
                      'author.media.file',
                    ],
                  },
                },
              },
            },
          },
          'blog.rc-section-articles-list': {
            populate: {
              section: {
                populate: '*',
              },
            },
          },
          'blog.rc-section-form': {
            populate: {
              section: {
                populate: '*',
              },
            },
          },
        },
      },
    },
  }).then((response) => response.data);
}

export async function getBlogOverviewPage(query: BlogRelatedPageQuery, options: GetOptions) {
  return Promise.all([getBlogOverview({ ...options, singleType: true }), getBlogPosts(query, options)]).then(
    async ([blogOverviewResponseData, blogPostsResponse]) => {
      const { topic, query: search } = query;

      const { heading, ...blogOverviewPage } = await flattenBlogOverviewDocument(
        blogOverviewResponseData,
        blogPostsResponse,
        { topic, search }
      );

      const articlesItems = await Promise.all(
        blogPostsResponse.data.map((data) => flattenBlogPostDocumentToBlogCard(data, { idKey: 'slug' }))
      );
      const pagination = generateResourcesPagination({
        totalArticles: blogPostsResponse.meta.pagination.total,
        currentPage: blogPostsResponse.meta.pagination.page,
        topic,
        search,
      });

      const appendPage = addPageToCopy(query.page);

      return {
        ...blogOverviewPage,
        seo: {
          title: 'Telnyx Blog | CPaas & UCaaS Resources',
          description:
            'Find data-driven research, comprehensive guides and all things SIP trunking, voice and SMS APIs, wireless and more.',
          ogType: 'webpage',
        },
        heading: appendPage(heading, { format: 'after', hiddenPage: true }),
        articles: {
          pagination: { ...pagination, htmlAs: 'a' as keyof JSX.IntrinsicElements },
          items: articlesItems,
        },
        // use as page params/query params
        topic: query.topic,
        search,
      };
    }
  );
}
