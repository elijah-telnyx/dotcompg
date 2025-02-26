import qs from 'qs';
import type { GetOptions, QueryFilter } from '../types';

/**
 * Using `qs` library here to be in sync with Strapi docs
 * See https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication#filtering
 */
export function getQueryString(
  { populate, status, ...query }: QueryFilter = {},
  options: GetOptions = { preview: false }
) {
  const defaultQuery: QueryFilter = {
    ...query,
    populate: populate || '*',
    status: status || options.preview ? 'draft' : 'published',
  };

  return qs.stringify(defaultQuery, {
    encodeValuesOnly: true, // prettify URL
  });
}
