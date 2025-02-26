import Head from "next/head";
import { useRouter } from "next/router";
import { sanitize } from "isomorphic-dompurify";

import constants from "constants/env";

import type { MediaProps } from "ui/components/Media";
import { formatImage, getCanonicalUrl } from "./utils";

export interface MetaTagsProps {
  title: string;
  description: string;
  publishDate: string;
  updatedDate: string;
  robots?: "follow,noindex" | "nofollow,noindex" | "nofollow,index";
  canonical?: string;
  schema?: string;
  priceStartingAt?: string;
  featuredImage?: MediaProps<"img">;
  ogType?: "article" | "webpage";
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: MediaProps<"img">;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: MediaProps<"img">;
  page?: string;
}

const addPageToCopy = (page?: string) => (copy: string, suffix?: boolean) => {
  if (!page || Number(page) === 1) return copy;

  const pageCopy = `Page ${page}`;

  if (suffix) return `${copy} - ${pageCopy}`;
  return `${pageCopy} - ${copy}`;
};

const BASE_URL = `${constants.protocol}://${constants.host}`;

const MetaTags = ({
  title = "Seti | Telnyx Observability Dashboards",
  description = "Your one-stop shop for infrastructure at the edge. The Telnyx Connectivity Cloud helps your business connect people, devices and applications everywhere.",
  robots,
  canonical,
  schema,
  featuredImage = {
    src: "https://images.ctfassets.net/2vm221913gep/4lrCOXajiyjLqzTi0LN0bv/a19deab0d367e3f958dd7998f8186343/telnyx-home-page.jpg?fit=crop&amp;w=1200&amp;h=630&amp;f=center",
    alt: "Telnyx SETI",
  },
  ogType,
  ogTitle,
  ogDescription,
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage,
  page,
}: MetaTagsProps) => {
  const router = useRouter();
  const currentUrl = `${BASE_URL}${router.asPath}`;
  const canonicalUrl = canonical || getCanonicalUrl(currentUrl);
  const addPage = addPageToCopy(page);

  const extendCopy = (
    copy: string,
    { pageSuffix }: { pageSuffix?: boolean } = {}
  ) => {
    return addPage(copy, pageSuffix);
  };

  const og = {
    title: extendCopy(ogTitle || title, { pageSuffix: true }),
    description: extendCopy(ogDescription || description),
    type: ogType,
    image: formatImage(ogImage || featuredImage, {
      width: 1200,
      height: 630,
      fit: "crop",
      focus: "center",
    }),
  };
  const twitter = {
    title: extendCopy(twitterTitle || title, { pageSuffix: true }),
    description: extendCopy(twitterDescription || description),
    image: formatImage(twitterImage || featuredImage),
  };

  return (
    <Head>
      <title>{extendCopy(title, { pageSuffix: true })}</title>
      <meta name="description" content={extendCopy(description)} />
      <link rel="canonical" href={canonicalUrl} />

      <meta key="meta-og:url" property="og:url" content={canonicalUrl} />
      <meta
        key="meta-og:site_name"
        property="og:site_name"
        content="EverRoam"
      />

      <meta key="meta-og:title" property="og:title" content={og.title} />
      <meta
        key="meta-og:description"
        property="og:description"
        content={og.description}
      />
      {og.type && (
        <meta key="meta-og:type" property="og:type" content="article" />
      )}
      {og.image && (
        <>
          <meta
            key="meta-og:image"
            property="og:image"
            content={og.image.src}
          />
          <meta
            key="meta-og:image-alt"
            property="og:image:alt"
            content={og.image.alt}
          />
          <meta
            key="meta-og:image-width"
            property="og:image:width"
            content={String(og.image.width)}
          />
          <meta
            key="meta-og:image-height"
            property="og:image:height"
            content={String(og.image.height)}
          />
        </>
      )}

      {robots && <meta name="robots" content={robots} />}

      <meta
        key="meta-twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        key="meta-twitter:site"
        name="twitter:site"
        content="@everroam_eSIM"
      />
      <meta
        key="meta-twitter:title"
        name="twitter:title"
        content={twitter.title}
      />
      <meta
        key="meta-twitter:description"
        name="twitter:description"
        content={twitter.description}
      />
      {twitter.image && (
        <>
          <meta
            key="meta-twitter:image"
            name="twitter:image"
            content={twitter.image.src}
          />
          <meta
            key="meta-twitter:image-alt"
            name="twitter:image:alt"
            content={twitter.image.alt}
          />
        </>
      )}

      {schema && (
        <script
          id="page-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: sanitize(schema) }}
        />
      )}
    </Head>
  );
};

export default MetaTags;
