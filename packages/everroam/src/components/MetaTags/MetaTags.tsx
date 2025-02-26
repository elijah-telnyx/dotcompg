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
  hreflangTags?: { language: string; url: string }[];
  featuredImage?: MediaProps<"img">;
  ogType?: "article" | "webpage";
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: MediaProps<"img">;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: MediaProps<"img">;
  locales?: {
    items: {
      name?: string;
      value: string;
      href: string;
      metatagAlpha2?: string;
    };
  }[];
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
  title = "EverRoam | The pay-as-you-go travel eSIM",
  description = "The pay-as-you-go travel eSIM powered by Telnyx. One-time setup, lifetime global connection",
  robots,
  canonical,
  schema,
  featuredImage = {
    src: "//images.ctfassets.net/2vm221913gep/79q4hqxMz9w2xhBjDDA0Gl/5f1653ceb354443ad952a67afc93eadb/58db2ca1-0d1d-40c8-9ef5-a79897cb9ce9.jpeg",
    alt: "EverRoam",
  },
  ogType,
  ogTitle,
  ogDescription,
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage,
  hreflangTags = [],
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

  const generateHreflangTags = () =>
    hreflangTags.map((i, k) => (
      <link key={k} rel="alternate" hrefLang={i.language} href={i.url} />
    ));

  return (
    <Head>
      <title>{extendCopy(title, { pageSuffix: true })}</title>
      <meta name="description" content={extendCopy(description)} />
      <link rel="canonical" href={canonicalUrl} />
      {hreflangTags?.length && generateHreflangTags()}

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
