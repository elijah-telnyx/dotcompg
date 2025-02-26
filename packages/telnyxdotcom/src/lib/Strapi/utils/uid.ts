import type { GetOptions, Strapi } from '../types';

/**
 *
 * @param contentType https://docs.strapi.io/dev-docs/api/document-service
 * @returns https://docs.strapi.io/dev-docs/api/rest#endpoints
 */
export function getRestAPIUid(contentType: Strapi.UID.ContentType, options: GetOptions = { preview: false }) {
  return contentType.split('.')[1] + (options.singleType ? '' : 's');
}
