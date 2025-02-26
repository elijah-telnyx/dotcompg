import { createClient } from "contentful";
import { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_ACCESS_TOKEN_PREVIEW } from "env";
import spaces from "./spaces";

const ContentfulClient = createClient({
  accessToken: CONTENTFUL_ACCESS_TOKEN,
  space: spaces.everroam,
});

const ContentfulPreviewClient = createClient({
  accessToken: CONTENTFUL_ACCESS_TOKEN_PREVIEW,
  space: spaces.everroam,
  host: "preview.contentful.com",
});

export type GetClientOptions = {
  preview?: boolean;
};

/**
 * Gets a Contentful Client with options
 */
export default function getClient({ preview }: GetClientOptions = {}) {
  if (preview) return ContentfulPreviewClient;

  return ContentfulClient;
}
