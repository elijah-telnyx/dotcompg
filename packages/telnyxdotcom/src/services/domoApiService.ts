import Api from 'lib/Api';
import constants from 'constants/env';

const api = Api.create({ baseUrl: constants.api.DOMO_BASE_URL });

export interface RedirectObj {
  domain: string;
  url: string;
}

export const getMarketoRedirectByDomain = async () => {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('authorization', `Basic ${btoa(`${process.env.DOMO_CLIENT_ID}:${process.env.DOMO_SECRET}`)}`);
  const authToken = await api.getRaw('/oauth/token?grant_type=client_credentials&scope=data', headers).then((data) => {
    headers.delete('Accept');
    headers.delete('authorization');
    return data.json();
  });

  headers.append('Accept', '*/*');
  headers.append('authorization', `Bearer ${await authToken.access_token}`);

  return await api
    .getRaw(
      '/v1/datasets/70327138-6c5c-40b2-8cfc-4522f81faa71/data?includeHeader=false&fileName=Contact%20Sales%20Redirect%20Page%20Logic',
      headers
    )
    .then<RedirectObj[]>(async (data) => {
      const rawText = await data.text();

      // map CSV values as RedirectObj
      return rawText.split('\n').map((i) => {
        const t = i.split(',');
        return { domain: t[0], url: t[1] };
      });
    });
};
