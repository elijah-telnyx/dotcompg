import type { ComposableArticleProps } from 'ui/components/ComposableArticle';
import type { ComposableArticleHeroProps } from 'ui/components/ComposableArticleHero';
import type { MediaProps } from 'ui/components/Media';
import type { MetaTagsProps } from 'components/MetaTags';
import type { CtaBannerProps } from 'ui/components/CTABanner';
import type { CarouselCardProps } from 'ui/components/CarouselCard';
import type { BackgroundColor } from 'ui/styles/constants/backgroundColorOptions';
import type { APIResponseByDocumentID, ComponentResponseData } from '../types';
import type { SectionComponentProps } from '../types/pages';
import { slugify } from 'ui/utils/slugify';
import { BASE_URL } from 'env';
import {
  getFallbackBlogBreadcrumbLinkProps,
  getFallbackBlogFormProps,
  getFallbackBlogJumpLinks,
  getFallbackBlogMediaField,
  getFilter,
} from './blog';
import { DEFAULT_TOPIC_CATEGORY } from '../constants';
import { generateResourcesPagination } from 'utils/calculateResourcesPagination';
import type { VideoProps } from 'ui/components/Media/components/Video';

// this doesn't parse media options (fill, alt, video options and so on) yet, as such fields don't exist yet
export async function flattenMedia(value: ComponentResponseData<'blog.rc-media-image'>) {
  const MAX_ICON_WIDTH_PIXELS = 256;
  const { id, title, description, file, ...mediaFields } = value;

  let mediaProps = {
    src: '',
    alt: '',
  } as MediaProps<'media'>;

  if (file) {
    mediaProps.src = file.url?.startsWith('//') ? `https:${file.url}` : file.url;
    mediaProps.alt = file.alternativeText || description || title;
    mediaProps.height = file.height;
    mediaProps.width = file.width;
  }

  if (mediaProps.src.endsWith('.svg') && Number(mediaProps.width) <= MAX_ICON_WIDTH_PIXELS) {
    try {
      const svgFetch = () => fetch(mediaProps.src).then((response) => response.text());

      mediaProps = {
        ...mediaProps,
        svg: await svgFetch(),
      } as MediaProps<'svg'>;

      return mediaProps;
    } catch (error) {
      console.log(mediaProps.src);
      console.error(error);
    }
  }

  if (mediaProps.src.endsWith('.mp4')) {
    try {
      return mediaProps as MediaProps<'mp4'>;
    } catch (error) {
      console.error(error);
    }
  }

  mediaProps = {
    ...mediaProps,
    ...mediaFields,
  } as MediaProps<'img'>;

  return mediaProps;
}

export async function flattenVideo({
  playsOn,
  poster,
  ...value
}: ComponentResponseData<'blog.video'>['media']): Promise<VideoProps> {
  const video = value.media;

  const playsOnMap: Record<string, boolean> = {
    controls: playsOn === 'controls',
    autoPlay: playsOn === 'autoplay',
    playsOnHover: playsOn === 'hover',
  };

  return {
    preload: value.preload ? 'metadata' : 'none',
    loop: value.loop,
    playsInline: value.playsInline,
    poster: poster.url,
    type: video.mime,
    src: video.url,
    ...playsOnMap,
  };
}

export const flattenBlogComposableArticleDocument = async (
  document: APIResponseByDocumentID<'api::rc-post.rc-post', string>['data']
): Promise<
  ComposableArticleHeroProps &
    ComposableArticleProps & { id: string; contentType?: string | undefined; seo: MetaTagsProps }
> => {
  const { id, documentId, ...fields } = document;
  let icon;
  let sections: any[] = [];

  const media = fields.featureImage || fields.thumbnail;

  if (fields.author?.media?.file) {
    icon = (await flattenMedia(fields.author.media)) as MediaProps<'media'>;
  }

  if (fields.sections?.length) {
    sections = fields.sections.map((section) => ({
      __component: 'blog.markdown-section',
      id: String(section.id),
      children: section.copy,
      backgroundColor: section.backgroundColor,
    }));
  }

  if (fields.dynamicSections?.length) {
    sections = await Promise.all(
      fields.dynamicSections.map(async (section) => {
        switch (section.__component) {
          case 'blog.markdown-section':
            return {
              __component: section.__component,
              id: String(section.id),
              children: section.copy,
              backgroundColor: section.backgroundColor,
            };
          case 'blog.rc-media-image':
            return {
              __component: section.__component,
              id: String(section.id),
              media: await flattenMedia(section),
            };
          case 'blog.video':
            return {
              ...section,
              __component: section.__component,
              id: String(section.id),
              media: await flattenVideo(section.media),
            };
          case 'blog.tabs-group':
            return {
              __component: section.__component,
              id: String(section.id),
              tabs:
                section.tabs &&
                (await Promise.all(
                  section.tabs.map(async (tab) => ({
                    ...tab,
                    media: tab.media?.file && (await flattenMedia(tab.media)),
                  }))
                )),
            };
          default:
            return section;
        }
      })
    );
  }

  if (sections.length === 0) {
    sections = sections.concat({ __component: 'blog.markdown-section', children: fields.content });
  }

  const metaTagsFeatureImage = fields?.metaImage || fields?.featureImage;
  const authorCopy = `${fields.author?.firstName} ${fields.author?.lastName}`;
  const authorId = `author-${slugify(authorCopy)}`;
  const updatedAt = fields.modifiedDate?.toString() || fields.updatedAt?.toString() || '';

  return {
    id: documentId,
    contentType: 'api::rc-post.rc-post',
    seo: {
      title: fields.seoTitle || '',
      description: fields.seoDescription,
      ogType: 'article',
      publishDate: fields.publishDate.toString(),
      updatedDate: updatedAt,
      robots: fields.applyNoIndex ? 'follow,noindex' : undefined,
      ...(metaTagsFeatureImage?.file && {
        featuredImage: (await flattenMedia(metaTagsFeatureImage)) as MediaProps<'media'>,
      }),
    },
    backgroundColor: fields.backgroundColor,
    spacingTop: 'continuous',
    spacingBottom: 'contrasting',
    hasOverflow: false,
    topic: fields?.topic || fields?.category,
    updatedAt,
    breadcrumbLink: getFallbackBlogBreadcrumbLinkProps(),
    tagline: `${fields.topic?.name || fields?.category?.name} • Last Updated ${new Date(
      updatedAt
    ).toLocaleDateString()}`,
    heading: fields.title,
    copy: fields.excerpt,
    author: {
      id: authorId,
      copy: authorCopy,
      description: fields.author?.description
        ? {
            children: fields.author?.description,
          }
        : undefined,
      icon,
      linkedin: fields.author?.linkedin,
      role: fields.author?.role,
    },
    authorLinkHref: fields.author?.description && `#${authorId}`,
    media:
      media?.file &&
      ({
        src: String(media.file.url),
        alt: media.file?.alternativeText || media.description || media.title,
      } as MediaProps<'img'>),
    useParallax: Boolean(media?.useParallax),

    sections,
    form: fields.marketoForm
      ? {
          heading: fields.marketoForm.heading,
          formId: Number(fields.marketoForm.formId),
          onSuccessRedirectsTo: fields.marketoForm.onSuccessRedirectsTo,
        }
      : getFallbackBlogFormProps(),
    socialShareTitle: fields.seoTitle || fields.title,
    socialShareDescription: fields.seoDescription || fields.excerpt,
    socialShareUrl: `${BASE_URL}/resources/${fields.slug}`,
    jumplinks: getFallbackBlogJumpLinks(sections),
  };
};

export const flattenCtaBannerDocument = (
  document: APIResponseByDocumentID<'api::section-cta-banner.section-cta-banner', string>['data']
): CtaBannerProps => {
  const { id: _id, ctaButtons = [], form, ...ctaBanner } = document;

  if (!form) {
    return { ...ctaBanner, ctaButtons };
  }

  const { id, formId, ...marketoForm } = form;

  return {
    ...ctaBanner,
    ctaButtons,
    form: {
      ...marketoForm,
      formId: Number(formId),
    },
  };
};

export const flattenBlogOverviewDocument = async (
  document: APIResponseByDocumentID<
    'api::page-resource-center-landing-page-container.page-resource-center-landing-page-container',
    string
  >['data'],
  postsDocuments: APIResponseByDocumentID<'api::rc-post.rc-post'>,
  query: { topic?: string; search?: string }
) => {
  const {
    id,
    documentId,
    featuredPosts: featuredPostsResponseData,
    sections: sectionsResponseData = [],
    ...blogOverviewPage
  } = document;
  const sections: SectionComponentProps = {};

  for (const sectionComponent of sectionsResponseData) {
    if (!sectionComponent.section) continue;

    const { id: _sectionId, documentId: sectionDocumentId = '', ...sectionItem } = sectionComponent.section;
    const item: Record<string, unknown> = {
      contentType: sectionComponent.__component,
      id: sectionDocumentId,
    };

    if (sectionComponent.__component === 'blog.rc-section-articles-list') {
      const articlesItems = await Promise.all(
        postsDocuments.data.map((data) => flattenBlogPostDocumentToBlogCard(data, { idKey: 'slug' }))
      );
      const pagination = generateResourcesPagination({
        totalArticles: postsDocuments.meta.pagination.total,
        currentPage: postsDocuments.meta.pagination.page,
        ...query,
      });

      sections['blog.rc-section-articles-list'] = [
        ...(sections['blog.rc-section-articles-list'] || []),
        {
          ...item,
          ...sectionItem,
          heading: sectionComponent.section.heading || '',
          copy: sectionComponent.section.copy || '',
          topicFilter: (sectionComponent.section.topicFilter || []).map(getFilter),
          categoryFilter: (sectionComponent.section.categoryFilter || []).map(getFilter),
          articles: {
            pagination: { ...pagination, htmlAs: 'a' as keyof JSX.IntrinsicElements },
            items: articlesItems,
          },
        },
      ];
    }

    if (sectionComponent.__component === 'blog.rc-section-articles-carousel') {
      const items = await Promise.all(
        (sectionComponent.section.items || []).map((data) =>
          flattenBlogPostDocumentToBlogCard(data, { includeMedia: true })
        )
      );

      sections['blog.rc-section-articles-carousel'] = [
        ...(sections['blog.rc-section-articles-carousel'] || []),
        {
          ...item,
          ...sectionItem,
          items,
        },
      ];
    }

    if (sectionComponent.__component === 'blog.rc-section-form') {
      sections['blog.rc-section-form'] = [
        ...(sections['blog.rc-section-form'] || []),
        {
          ...item,
          ...sectionItem,
          form: {
            ...(sectionComponent.section.form || {}),
            id: sectionComponent.section.form?.documentId,
            formId: Number(sectionComponent.section.form?.formId),
          },
        },
      ];
    }
  }

  return {
    ...blogOverviewPage,
    id: documentId,
    contentType: 'api::rc-post.rc-post',
    featuredPosts: await Promise.all(
      (featuredPostsResponseData || []).map((data) =>
        flattenBlogPostDocumentToBlogCard(data, { includeContentType: true, includeMedia: true })
      )
    ),
    sections,
  };
};

export const flattenBlogPostDocumentToBlogCard = async (
  document: APIResponseByDocumentID<'api::rc-post.rc-post', string>['data'],
  options: {
    includeContentType?: boolean;
    includeMedia?: boolean;
    idKey?: 'documentId' | 'slug';
  } = { idKey: 'documentId' }
): Promise<CarouselCardProps & { id: string }> => {
  const { id, documentId, ...blogPage } = document;
  const author = blogPage.author;
  const authorMedia = blogPage.author?.media;
  const topic = blogPage.topic;
  const category = blogPage.category;
  const tagline = topic
    ? {
        name: topic.name,
        color: topic.color || DEFAULT_TOPIC_CATEGORY.color,
      }
    : category
    ? {
        name: category.name,
        color: category.color || DEFAULT_TOPIC_CATEGORY.color,
      }
    : DEFAULT_TOPIC_CATEGORY;
  let media;

  if (options.includeMedia) {
    media = blogPage.thumbnail?.file
      ? blogPage.thumbnail
      : blogPage.featureImage?.file
      ? blogPage.featureImage
      : getFallbackBlogMediaField(blogPage.title);
  }

  return {
    id: options.idKey === 'documentId' ? documentId : blogPage.slug,
    ...(options.includeContentType && { contentType: 'api::rc-post.rc-post' }),
    tagline,
    heading: blogPage.title,
    href: `/resources/${blogPage.slug}`,
    author: {
      media: authorMedia?.file && ((await flattenMedia(authorMedia)) as MediaProps<'media'>),
      name: `${author?.firstName} ${author?.lastName}`,
    },

    media:
      media?.file &&
      ({
        src: String(media.file.url),
        alt: media.file.alternativeText || media.description || media.title,
      } as MediaProps<'img'>),
  };
};

export const flattenRelatedArticlesDocuments = async (
  documents: APIResponseByDocumentID<'api::rc-post.rc-post'>['data']
): Promise<{
  backgroundColor: BackgroundColor;
  heading: string;
  items: (CarouselCardProps & { id: string })[];
}> => {
  return {
    backgroundColor: 'black',
    heading: 'Related articles',
    // related by topic and category
    items: await Promise.all(documents.map((data) => flattenBlogPostDocumentToBlogCard(data, { idKey: 'slug' }))),
  };
};
