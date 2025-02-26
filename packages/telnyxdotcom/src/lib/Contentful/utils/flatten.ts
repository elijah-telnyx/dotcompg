import type { MetaTagsProps } from 'components/MetaTags';
import type { Entry } from 'contentful';
import type { ArticleProps } from 'ui/components/Article';

import type { MediaProps } from 'ui/components/Media';
import type { BlogPage, MediaFields } from '../types';
import type { CarouselCardProps } from 'ui/components/CarouselCard';

import { getFallbackBlogBreadcrumbLinkProps, getFallbackMediaField } from '../utils';
import * as contentTypes from '../contentTypes';

// inline memory cache to avoid hitting API over and over again for the same entry
// fine as long as flattenMedia is __only__ called at build time or revalidation step and this cache remains small
let svgMediaMapCache: Record<string, string | undefined> = {};

export const flattenMedia = async (value: Entry<MediaFields>) => {
  const MAX_ICON_WIDTH_PIXELS = 256;
  const {
    media,
    externalMediaLink,
    title,
    description,
    file,
    alt: mediaAlt,
    height: mediaHeight,
    width: mediaWidth,
    fm: mediaFormat,
    fill: mediaFill,
    mobileMedia,
    videoOptions: mediaVideoOptions,
    ...mediaFields
  } = value.fields;
  let mediaProps = {
    src: '',
    alt: '',
  } as MediaProps<'media'>;

  if (file) {
    mediaProps.src = file.url?.startsWith('//') ? `https:${file.url}` : file.url;
    mediaProps.alt = description || title;
    mediaProps.height = file.details.image?.height;
    mediaProps.width = file.details.image?.width;
  }

  if (media) {
    mediaProps.alt = media.fields.description;
    mediaProps.src = media.fields.file.url?.startsWith('//') ? `https:${media.fields.file.url}` : media.fields.file.url;
    mediaProps.height = media.fields.file.details.image?.height;
    mediaProps.width = media.fields.file.details.image?.width;
  }

  if (mediaAlt) {
    mediaProps.alt = mediaAlt;
  }
  if (mediaHeight) {
    mediaProps.height = mediaHeight;
  }
  if (mediaWidth) {
    mediaProps.width = mediaWidth;
  }
  if (mediaFormat) {
    mediaProps.fm = mediaFormat;
  }
  if (mediaFill) {
    mediaProps.fill = mediaFill;
    mediaProps.height = undefined;
    mediaProps.width = undefined;
  }
  if (mobileMedia) {
    mediaProps.mobileSrc = mobileMedia.fields.file.url;
  }

  if (mediaVideoOptions?.length) {
    mediaProps = {
      ...mediaProps,
      ...mediaVideoOptions.reduce((options, name) => ({ ...options, [name]: true }), {}),
    };
  }

  if (mediaProps.src.endsWith('.svg') && Number(mediaProps.width) <= MAX_ICON_WIDTH_PIXELS) {
    try {
      const svgFetch = () => fetch(mediaProps.src).then((response) => response.text());

      mediaProps = {
        ...mediaProps,
        svg: await (svgMediaMapCache[mediaProps.src] || svgFetch()),
      } as MediaProps<'svg'>;

      svgMediaMapCache = {
        ...svgMediaMapCache,
        [mediaProps.src]: mediaProps.svg,
      };
      return mediaProps;
    } catch (error) {
      console.log(mediaProps.src);
      console.error(error);
    }
  }

  if (mediaProps.src.endsWith('.mp4')) {
    try {
      if (externalMediaLink) {
        mediaProps.src = externalMediaLink;
      }
      const videoFields = await flattenEntryFields(mediaFields);

      return { ...mediaProps, ...videoFields } as MediaProps<'mp4'>;
    } catch (error) {
      console.error(error);
    }
  }

  mediaProps = {
    ...mediaProps,
    ...mediaFields,
  } as MediaProps<'img'>;

  return mediaProps;
};

const FIELD_TO_IGNORE = ['entryTitle'];

export const flattenEntryFields = async (fields: object): Promise<object> => {
  let fieldData = {};

  for (const [key, value] of Object.entries(fields)) {
    if (FIELD_TO_IGNORE.includes(key)) {
      continue;
    }
    if (value?.fields?.media || value.sys?.type === 'Asset') {
      fieldData = {
        ...fieldData,
        [key]: await flattenMedia(value),
      };
    } else if (Array.isArray(value) && value[0]?.fields) {
      fieldData = {
        ...fieldData,
        [key]: await Promise.all(value.map((valueEntry) => flattenEntry(valueEntry, false))),
      };
    } else if (value.fields) {
      fieldData = { ...fieldData, [key]: await flattenEntry(value, false) };
    } else {
      fieldData = { ...fieldData, [key]: value };
    }
  }

  return fieldData;
};

export const flattenEntry = async <T extends Entry<unknown>>(
  entry: T,
  useContentType = true
): Promise<T['fields'] & { id: string; contentType?: string | undefined }> => {
  try {
    if (!entry?.fields) throw new Error(`An entry was not passed to be flatten. ${JSON.stringify(entry)}`);

    const {
      sys: { id, contentType },
      fields,
    } = entry;

    if (contentType.sys.id === contentTypes.rcPost) {
      return {
        ...(await flattenBlogEntryItem(entry as Entry<BlogPage>)),
        contentType: undefined,
      };
    }
    const fieldData = await flattenEntryFields(fields);
    return {
      id,
      ...(contentType && useContentType && { contentType: contentType.sys.id }),
      ...fieldData,
    };
  } catch (e) {
    console.error('Error over flattenEntry');
    console.error(e);
    // this will ignore the section over the render
    return { id: '' };
  }
};

const getOnSuccessRedirectsTo = (onSuccessRedirectsTo?: { slug: string }) => {
  if (!onSuccessRedirectsTo?.slug) return undefined;
  if (onSuccessRedirectsTo.slug.startsWith('/')) return onSuccessRedirectsTo.slug;
  return `/${onSuccessRedirectsTo.slug}`;
};

export const flattenBlogEntry = async (
  entry: Entry<BlogPage>
): Promise<ArticleProps & { id: string; contentType?: string | undefined; seo: MetaTagsProps }> => {
  if (!entry?.fields) throw new Error(`A Blog entry was not passed to be flatten. ${JSON.stringify(entry)}`);
  const {
    sys: { id, contentType, updatedAt },
    fields,
  } = entry;
  let icon;

  const media = fields.featureImage || fields.thumbnail || getFallbackMediaField(fields.title);

  if (fields.author.fields.media) {
    icon = (await flattenMedia(fields.author.fields.media)) as MediaProps<'media'>;
  }

  const hero = fields.heroBanner?.fields;
  const metaTagsFeatureImage = fields?.metaImage || fields?.featureImage;

  return {
    id,
    ...(contentType && { contentType: contentType.sys.id }),
    seo: {
      title: fields.seoTitle,
      description: fields.seoDescription,
      ogType: 'article',
      publishDate: fields.publishDate,
      updatedDate: updatedAt,
      robots: fields.applyNoIndex ? 'follow,noindex' : undefined,
      ...(metaTagsFeatureImage && {
        featuredImage: (await flattenMedia(metaTagsFeatureImage)) as MediaProps<'media'>,
      }),
    },
    backgroundColor: 'cream',
    spacingTop: 'continuous',
    spacingBottom: 'contrasting',
    hasOverflow: false,
    breadcrumbLink: getFallbackBlogBreadcrumbLinkProps(),
    tagline: `${fields.category?.fields.name} • PUBLISHED ${new Date(fields.publishDate).toLocaleDateString()}`,
    heading: fields.title,
    copy: fields.excerpt,
    author: {
      copy: `${fields.author.fields.firstName} ${fields.author.fields.lastName}`,
      icon,
    },
    media: {
      src: String(media.fields.file?.url),
      alt: fields.featureImageAltText || media.fields.description || media.fields.title,
    } as MediaProps<'img'>,
    body: {
      children: fields.content,
    },
    url: '',
    form: hero?.marketoForm && {
      heading: hero.heading?.fields.copy,
      formId: hero.marketoForm.fields.formId,
      onSuccessRedirectsTo: getOnSuccessRedirectsTo(hero.marketoForm.fields.onSuccessRedirectsTo?.fields),
    },
  };
};

export const flattenBlogEntryItem = async (entry: Entry<BlogPage>): Promise<CarouselCardProps & { id: string }> => {
  if (!entry?.fields) throw new Error(`A Blog entry was not passed to be flatten. ${JSON.stringify(entry)}`);
  const {
    sys: { id, contentType },
    fields,
  } = entry;

  const media = fields.thumbnail || fields.featureImage || getFallbackMediaField(fields.title);

  const topic = fields?.topic2?.fields || fields.topic;
  const category = fields?.category?.fields;

  return {
    id,
    ...(contentType && { contentType: contentType.sys.id }),
    href: `/resources/${fields.slug}`,
    tagline: topic || category,
    heading: fields.title,
    author: {
      name: `${fields.author.fields.firstName} ${fields.author.fields.lastName}`,
      media: fields.author.fields.media && ((await flattenMedia(fields.author.fields.media)) as MediaProps<'media'>),
    },
    media: {
      src: String(media.fields.file?.url),
      alt: fields.featureImageAltText || media.fields.description || media.fields.title,
    } as MediaProps<'img'>,
  };
};
