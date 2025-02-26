import Api from 'lib/Api';
import constants from 'constants/env';
import { STRAPI_ACCESS_TOKEN } from 'env';

const api = Api.create({ baseUrl: constants.strapi.BASE_URL });

export const getRawDocument = async (typeId: string, search: string, documentId?: string) => {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', `Bearer ${STRAPI_ACCESS_TOKEN}`);
  headers.append('Content-Type', 'application/json');
  const url = `/${typeId}${documentId ? `/${documentId}` : ''}?${search}`;

  return await api.getRaw(url, headers);
};
