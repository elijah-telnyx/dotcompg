import qs from 'qs';

export const generateURLWithSearchParams = ({
  url,
  params,
  options,
}: {
  url: string;
  params: Record<string, unknown>;
  options?: qs.IStringifyOptions;
}) => {
  const { mobileSrc, ...queryParams } = params;
  const query = qs.stringify(queryParams, {
    encodeValuesOnly: true,
    ...options,
  });
  return `${url}?${query}`;
};
