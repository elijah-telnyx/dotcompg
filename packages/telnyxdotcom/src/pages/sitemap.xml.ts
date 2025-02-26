import { BASE_URL } from 'env';
import { type SitemapData, getSitemapData } from 'lib/Contentful/methods/sitemap';
import type { GetServerSidePropsContext } from 'next';

const regex = /^(http|https):\/\//;

/**
 * @link https://www.sitemaps.org/protocol.html
 */
const generateSitemapXML = (data: SitemapData[]) => {
  const Url = ({ url, lastmod }: SitemapData) => `
  <url>
    <loc>${regex.test(url) ? url : BASE_URL + url}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${data.map(Url).join('')}
</urlset>`;
};

function SiteMap() {
  // the data fetching method will do the heavy lifting
}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const sitemapData = await getSitemapData();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSitemapXML(sitemapData);

  res.setHeader('Content-Type', 'application/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
