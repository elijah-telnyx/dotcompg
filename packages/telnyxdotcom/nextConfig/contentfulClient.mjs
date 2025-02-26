import contentful from 'contentful';

const CONTENTFUL_ACCESS_TOKEN = String(process.env.CONTENTFUL_ACCESS_TOKEN);
const CONTENTFUL_ACCESS_TOKEN_PREVIEW = String(process.env.CONTENTFUL_ACCESS_TOKEN_PREVIEW);

const CONTENTFUL_SPACE = '2vm221913gep';

export const ContentfulClient = contentful.createClient({
  accessToken: CONTENTFUL_ACCESS_TOKEN,
  // got from packages/telnyxdotcom/src/lib/Contentful/spaces.ts
  space: CONTENTFUL_SPACE,
});

export const ContentfulPreviewClient = contentful.createClient({
  accessToken: CONTENTFUL_ACCESS_TOKEN_PREVIEW,
  space: CONTENTFUL_SPACE,
  host: 'preview.contentful.com',
});
