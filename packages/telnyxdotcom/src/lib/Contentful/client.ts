import { createClient } from 'contentful';
import {
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_ACCESS_TOKEN_BLOG,
  CONTENTFUL_ACCESS_TOKEN_BLOG_PREVIEW,
  CONTENTFUL_ACCESS_TOKEN_PREVIEW,
} from 'env';
import spaces from './spaces';

const ContentfulClient = createClient({
  accessToken: CONTENTFUL_ACCESS_TOKEN,
  space: spaces.rebrand2022,
});

const ContentfulBlogClient = createClient({
  accessToken: CONTENTFUL_ACCESS_TOKEN_BLOG,
  space: spaces.blog,
});

const ContentfulBlogPreviewClient = createClient({
  accessToken: CONTENTFUL_ACCESS_TOKEN_BLOG_PREVIEW,
  space: spaces.blog,
  host: 'preview.contentful.com',
});

const ContentfulPreviewClient = createClient({
  accessToken: CONTENTFUL_ACCESS_TOKEN_PREVIEW,
  space: spaces.rebrand2022,
  host: 'preview.contentful.com',
});

export type GetClientOptions = {
  blog?: boolean;
  preview?: boolean;
};

/**
 * Gets a Contentful Client with options
 */
export default function getClient({ blog, preview }: GetClientOptions = {}) {
  if (blog) {
    if (preview) return ContentfulBlogPreviewClient;

    return ContentfulBlogClient;
  }

  if (preview) return ContentfulPreviewClient;

  return ContentfulClient;
}
