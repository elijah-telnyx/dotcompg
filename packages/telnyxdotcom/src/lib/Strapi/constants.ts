import type { BackgroundColor } from 'ui/styles/constants/backgroundColorOptions';

export const constants = {
  BLOG_POSTS_RELATED_ARTICLES_MINIMUM: 5,
  BLOG_POSTS_RELATED_ARTICLES_LIMIT: 30,

  MAX_BLOG_POSTS_PER_PAGE: 30,
  MAX_PRE_GENERATED_BLOG_POSTS_PAGES: 4,
  MAX_RELEASE_NOTES_PER_PAGE: 12,
};

export const DEFAULT_TOPIC_CATEGORY: { name: string; color: BackgroundColor } = {
  name: 'Telnyx',
  color: 'black',
};
