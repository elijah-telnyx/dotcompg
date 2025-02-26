import type { Asset, Entry } from "contentful";

// ui lib types
import type * as Components from "ui/components/@types";

// local component types
import type { AuthorProps } from "components/BlogPage/BlogPageHero";
import type { HomeHeroProps } from "components/HomeHero";
import type { MetaTagsProps } from "components/MetaTags";

/** https://nextjs.org/docs/api-reference/next.config.mjs/redirects */
export type NextRedirect = {
  source: string;
  destination: string;
  permanent?: boolean;
};

export type MetaTagsFields = Pick<
  MetaTagsProps,
  | "title"
  | "description"
  | "robots"
  | "canonical"
  | "schema"
  | "ogType"
  | "ogTitle"
  | "ogDescription"
  | "twitterTitle"
  | "twitterDescription"
  | "priceStartingAt"
  | "hreflangTags"
  | "locales"
> & {
  featuredImage?: Entry<MediaFields> | any;
  ogImage?: Entry<MediaFields>;
  twitterImage?: Entry<MediaFields>;
};

/** Root navigation entry fields */
export type MediaFields = {
  entryTitle: string;
  /** some Media fields come straight as an `Asset` */
  media?: Asset;
  /** some Media fields come as an `Asset` reference with `fields` and `file` */
  file?: Asset["fields"]["file"];
  /** some Media fields come as an `Asset` reference with `fields` and `description` */
  description?: Asset["fields"]["description"];
  /** some Media fields come as an `Asset` reference with `fields` and `title` */
  title: Asset["fields"]["title"];
  /** Media fields for controlling image positioning and styles over different layouts*/
  alt?: Components.MediaProps<"media">["alt"];
  /** to fix image width dimension through contentful */
  width?: Components.MediaProps<"media">["width"];
  /** to fix height dimension through contentful */
  height?: Components.MediaProps<"media">["height"];
  fm?: Components.MediaProps<"media">["fm"];
  /** A boolean that causes the image to fill the parent element instead of setting `width` and `height` */
  fill?: Components.MediaProps<"media">["fill"];
  contain?: Components.MediaProps<"media">["contain"];
  cover?: Components.MediaProps<"media">["cover"];
  mobileMedia?: Asset;

  /** Video options */
  videoOptions?: Array<
    keyof Pick<
      Components.MediaProps<"media">,
      | "autoPlay"
      | "controls"
      | "disablePictureInPicture"
      | "disableRemotePlayback"
      | "loop"
      | "muted"
      | "playsInline"
    >
  >;
};
export interface ReleaseNotesTag {
  title: string;
  slug: string;
}

export interface Page {
  title: string;
  seo: Entry<MetaTagsFields>;
  slug: string;
}

export interface RootPage extends Page {
  hero: Entry<Components.SolutionsHeroProps>;
  sections: Entry<
    Components.ResourcesProps &
      Components.TextCardsProps &
      Components.MarketoFormSectionProps
  >[];
}

export interface BlogPage {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  createdAt: string;
  updatedAt: string;
  readTime?: string;
  content?: string;
  featureImage?: Entry<MediaFields>;
  featureImageAltText?: string;
  author: Entry<AuthorProps>;
}

export interface HomePage {
  title: string;
  seo: Entry<MetaTagsFields>;
  hero: HomeHeroProps;
  sections: Entry<
    Components.AboutProps &
      Components.CarouselSectionProps &
      Components.ColorfulCardsProps &
      Components.CtaBannerProps &
      Components.CustomerLogosProps &
      Components.CustomerStoriesProps &
      Components.FaqProps &
      Components.HowItWorksProps &
      Components.ResourcesProps &
      Components.TextCardsProps &
      Components.MarketoFormSectionProps
  >[];
}

export interface GenericPage extends Page {
  hero: Entry<Components.SolutionsHeroProps & Components.OverviewHeroProps>;
  slug: string;
  sections?: Entry<
    Components.CustomerLogosProps &
      Components.CustomerStoriesProps &
      Components.FaqProps &
      Components.FeatureComparisonProps &
      Components.ResourcesProps &
      Components.TextCardsProps &
      Components.AboutProps &
      Components.MarkdownSectionProps
  >[];
}
