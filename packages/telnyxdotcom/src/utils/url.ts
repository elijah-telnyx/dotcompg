/**
 * considers optional `https://` prefix and strips `www.` from domain name
 */
export const getDomainFromUrl = (url: string) => {
  return new URL('https://' + url.replace(/https?:\/\//, '')).hostname.replace('www.', '');
};
