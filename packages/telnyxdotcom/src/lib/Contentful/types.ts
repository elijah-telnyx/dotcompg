import type * as Components from 'ui/components/@types';

import type { Asset, Entry } from 'contentful';
import type { HTMLAttributeAnchorTarget, HTMLAttributeReferrerPolicy } from 'react';

import type { BackgroundColor } from 'ui/styles/constants/backgroundColorOptions';
import type { DeveloperFocusProps } from 'components/Home/DeveloperFocus';
import type { HomeHeroProps } from 'components/Home/HomeHero';
import type { MetaTagsProps } from 'components/MetaTags';
import type { ProductsSectionProps } from 'components/Home/ProductsSection';
import type { CalculatorSectionProps } from 'components/CalculatorSection';
import type { DemoSectionProps } from 'components/DemoSection';
import type { HorizontalFormSectionProps } from 'ui/components/FormSection';
import type { VoiceAIFormProps } from 'ui/components/VoiceAIForm';
import type { CoverageTableSectionProps } from 'ui/components/CoverageTableSection';
import type { FreshHomeHeroProps } from 'components/FreshHome/FreshHomeHero';
import type { InferenceSectionProps } from 'components/FreshHome/InferenceSection';
import type { IotSectionProps } from 'components/FreshHome/IotSection';
import type { VoiceAiSectionProps } from 'components/FreshHome/VoiceAiSection';
import type { OurNetworkSectionProps } from 'components/FreshHome/OurNetworkSection';
import type { ProductsSectionProps as FreshHomeProductsSectionProps } from 'components/FreshHome/ProductsSection';
import type { CustomerStoriesSectionProps } from 'components/FreshHome/CustomerStoriesSection';
import type { BlogSectionProps } from 'components/FreshHome/BlogSection';
import type { ControlledFormHeroProps } from 'components/ControlledFormHero';
import type { DemoHeroProps } from 'components/DemoHero';
import type { NumberLookupHeroProps } from 'components/NumberLookupHero';

/** https://nextjs.org/docs/api-reference/next.config.mjs/redirects */
export type NextRedirect = {
  source: string;
  destination: string;
  permanent?: boolean;
};

export type MetaTagsFields = Pick<
  MetaTagsProps,
  | 'title'
  | 'description'
  | 'robots'
  | 'canonical'
  | 'schema'
  | 'ogType'
  | 'ogTitle'
  | 'ogDescription'
  | 'twitterTitle'
  | 'twitterDescription'
  | 'priceStartingAt'
  | 'hreflangTags'
  | 'locales'
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
  externalMediaLink?: string;
  /** external media link, will over-ride the contentful link used for the media */
  file?: Asset['fields']['file'];
  /** some Media fields come as an `Asset` reference with `fields` and `description` */
  description?: Asset['fields']['description'];
  /** some Media fields come as an `Asset` reference with `fields` and `title` */
  title: Asset['fields']['title'];
  /** Media fields for controlling image positioning and styles over different layouts*/
  alt?: Components.MediaProps<'media'>['alt'];
  /** to fix image width dimension through contentful */
  width?: Components.MediaProps<'media'>['width'];
  /** to fix height dimension through contentful */
  height?: Components.MediaProps<'media'>['height'];
  fm?: Components.MediaProps<'media'>['fm'];
  /** A boolean that causes the image to fill the parent element instead of setting `width` and `height` */
  fill?: Components.MediaProps<'media'>['fill'];
  contain?: Components.MediaProps<'media'>['contain'];
  cover?: Components.MediaProps<'media'>['cover'];
  mobileMedia?: Asset;

  /** Video options */
  videoOptions?: Array<
    keyof Pick<
      Components.MediaProps<'media'>,
      | 'autoPlay'
      | 'playsOnHover'
      | 'controls'
      | 'disablePictureInPicture'
      | 'disableRemotePlayback'
      | 'loop'
      | 'muted'
      | 'playsInline'
    >
  >;
};

export interface Page {
  title: string;
  seo: Entry<MetaTagsFields>;
  slug: string;
}

/** Navigation entry fields representing a link and/or group */
export type NavigationItemFields = {
  id: string;
  /** internal use only */
  entryTitle: string;
  /** display name of the link */
  label: string;
  /** the URL to navigate to */
  href?: string;
  /** additional link props */
  rel?: string;
  target?: HTMLAttributeAnchorTarget;
  referrerPolicy?: HTMLAttributeReferrerPolicy;
  /** children navigation items for this group */
  items?: Entry<NavigationItemFields>[];
  seeMoreLink?: Entry<NavigationItemFields>;
};

type NumberLookHero = {
  readonly contentType: 'heroNumberSearch';
} & NumberLookupHeroProps;

type DemoHero = {
  readonly contentType: 'heroDemo';
} & DemoHeroProps;

type ProductHero = {
  readonly contentType: 'heroProduct';
} & Components.ProductHeroProps;

export interface ProductPage extends Page {
  hero: Entry<ProductHero | DemoHero | NumberLookHero>;
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
      Components.MarketoFormSectionProps &
      CalculatorSectionProps &
      DemoSectionProps
  >[];
}

export interface CustomerStoryPage extends Page {
  hero: Entry<Components.OverviewHeroProps>;
  sections: Entry<
    Components.ColorfulCardsProps &
      Components.ColorfulCardsProps &
      Components.ArticleProps &
      Components.CtaBannerProps &
      Components.CarouselSectionProps &
      Components.MarkdownSectionProps &
      Components.CustomerStoriesProps
  >[];
}

export interface UseCasesPage extends Page {
  category: 'marketing' | 'customer support' | 'operations';
  hero: Entry<Components.SolutionsHeroProps>;
  sections: Entry<
    Components.AboutProps &
      Components.CarouselSectionProps &
      Components.ColorfulCardsProps &
      Components.CtaBannerProps &
      Components.FaqProps &
      Components.ResourcesProps &
      Components.TextCardsProps &
      CalculatorSectionProps
  >[];
}

export interface IndustryPage extends Page {
  hero: Entry<Components.SolutionsHeroProps>;
  sections: Entry<
    Components.AboutProps &
      Components.CarouselSectionProps &
      Components.CtaBannerProps &
      Components.ColorfulCardsProps &
      Components.CustomerLogosProps &
      Components.ResourcesProps
  >[];
}

export interface LandingPage extends Page {
  hero: Entry<
    Components.SolutionsHeroProps & Components.OverviewHeroProps & Components.ProductHeroProps & ControlledFormHeroProps
  >;
  sections: Entry<
    Components.AboutProps &
      Components.ResourcesProps &
      Components.CtaBannerProps &
      Components.CarouselSectionProps &
      Components.ColorfulCardsProps &
      Components.CustomerStoriesProps &
      Components.CustomerLogosProps &
      Components.MarkdownSectionProps &
      Components.HowItWorksProps &
      Components.MarketoFormSectionProps &
      Components.TextCardsProps &
      Components.FaqProps
  >[];
}

export interface BlogOverviewPage extends Page {
  hero: Entry<Components.OverviewHeroProps>;
  sections: Entry<Components.GridCardsProps & Components.CtaBannerProps>[];
}

export interface ArticleClassification {
  id: string;
  name: string;
  color: BackgroundColor;
  filterSlug: string;
}

export interface BlogPage extends Page {
  title: string;
  excerpt: string;
  content: string;
  sections?: Entry<Components.MarkdownSectionProps>[];
  publishDate: string;
  modifiedDate: string;
  author: Entry<{
    firstName: string;
    lastName: string;
    media?: Entry<MediaFields>;
    description?: string;
    linkedin?: string;
  }>;
  thumbnail?: Entry<MediaFields>;
  featureImage?: Entry<MediaFields>;
  featureImageAltText?: string;
  category: Entry<ArticleClassification>;
  topic2?: Entry<ArticleClassification>;
  topic?: string;
  seoTitle: string;
  seoDescription: string;
  metaImage?: Entry<MediaFields>;
  applyNoIndex: boolean;
  heroBanner?: Entry<{
    heading?: Entry<{ copy: string }>;
    backgroundImage?: Asset;
    marketoForm?: Entry<{ formId: number; onSuccessRedirectsTo?: Entry<{ slug: string }> }>;
  }>;
}

export interface ReleaseNotesTag {
  title: string;
  slug: string;
}

export interface FilterItem {
  name: string;
  value: string;
  href?: string;
  items?: Entry<Components.SelectItemProps>[];
}

export interface PricingPage extends Page {
  hero: Entry<Components.OverviewHeroProps>;
  sections: Entry<
    Components.OddColorfulCardsProps &
      Components.CarouselSectionProps &
      Components.CtaBannerProps &
      Components.FaqProps &
      Components.TextCardsProps &
      CalculatorSectionProps
  >[];
}

export interface PricingOverviewPage extends Page {
  hero: Entry<Components.OverviewHeroProps>;
  sections: Entry<
    Components.OddColorfulCardsProps & Components.NavigationCardsSectionProps & Components.TextCardsProps
  >[];
}

export interface SolutionsOverviewPage extends Page {
  hero: Entry<Components.SolutionsOverviewHeroProps>;
  sections: Entry<
    Components.CustomerLogosProps &
      Components.MediaCardListProps &
      Components.CtaBannerProps &
      Components.GridCardsProps
  >[];
}

export interface CustomerStoriesOverviewPage extends Page {
  hero: Entry<Components.OverviewHeroProps>;
  sections: Entry<
    Components.CustomerLogosProps &
      Components.MediaCardListProps &
      Components.CtaBannerProps &
      Components.ColorfulCardsProps
  >[];
}

export interface MissionControlPortalPage extends Page {
  hero: Entry<Components.SolutionsHeroProps>;
  sections: Entry<
    Components.CustomerLogosProps &
      Components.AboutProps &
      Components.TextCardsProps &
      Components.HowItWorksProps &
      Components.CarouselSectionProps &
      Components.ResourcesProps &
      Components.CtaBannerProps &
      Components.FaqProps
  >[];
}

export interface ContactUsPage extends Page {
  hero: Entry<Components.OverviewHeroProps>;
  sections: Entry<Components.MarketoFormSectionProps & Components.ResourcesProps & Components.TextCardsProps>[];
}

export interface RequestControlReviewDataPage extends Page {
  sections: Entry<Components.MarketoFormSectionProps>[];
}

export interface WhyTelnyxPage extends Page {
  hero: Entry<Components.OverviewHeroProps>;
  sections: Entry<Components.AboutProps & Components.CtaBannerProps & Components.TextCardsProps>[];
}

export interface IntegrationsPage extends Page {
  hero: Entry<Components.SolutionsHeroProps>;
  sections: Entry<Components.ResourcesProps & Components.TextCardsProps & Components.MarketoFormSectionProps>[];
}

export interface OurNetworkPage extends Page {
  hero: Entry<Components.SolutionsHeroProps>;
  sections: Entry<
    Components.CustomerLogosProps &
      Components.AboutProps &
      Components.TextCardsProps &
      Components.ResourcesProps &
      Components.CtaBannerProps &
      Components.FaqProps &
      Components.TabsWithMarkdownProps &
      Components.CarouselSectionProps
  >[];
}

export interface CareersPage extends Page {
  hero: Entry<Components.SolutionsHeroProps>;
  sections: Entry<
    Components.CustomerLogosProps & Components.AboutProps & Components.TextCardsProps & Components.CustomerStoriesProps
  >[];
}

export interface PartinershipsPage extends Page {
  hero: Entry<Components.OverviewHeroProps>;
  sections: Entry<
    Components.CustomerLogosProps &
      Components.TextCardsProps &
      Components.ColorfulCardsProps &
      Components.FormSectionProps &
      Components.MarketoFormSectionProps
  >[];
}
export interface ReleaseNotesQuery {
  page: number | string;
  limit: number | string;
  order?: string;
  tags?: string[];
  skip?: number | string;
  slug?: string;
}

export interface ReleaseNotesPage {
  releases: Components.GridListItemProps[];
  tags: Components.SelectItemProps[];
  pagination: Components.GridCardsProps['pagination'];
}

export interface ReleaseNotesSlugPage extends Components.GridListItemProps {
  applyNoIndex: boolean;
  seoTitle: string;
  seoDescription: string;
}

export interface ReleaseNoteItem {
  slug: string;
  content: string;
  title: string;
  text: string;
  authors: Entry<{ name: string }>[];
  publishDate: string;
  image?: Asset;
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
      Components.MarkdownSectionProps &
      CalculatorSectionProps
  >[];
}

export interface ShakenStirPage extends Page {
  hero: Entry<Components.OverviewHeroProps>;
  sections: Entry<
    Components.CustomerLogosProps &
      Components.CarouselSectionProps &
      Components.FaqProps &
      Components.ResourcesProps &
      Components.TextCardsProps &
      Components.CtaBannerProps &
      Components.AboutProps
  >[];
}

export interface TwexitPage extends Page {
  hero: Entry<Components.SolutionsHeroProps>;
  sections: Entry<
    Components.CustomerLogosProps &
      Components.ColorfulCardsProps &
      Components.FaqProps &
      Components.HowItWorksProps &
      Components.CtaBannerProps &
      Components.AboutProps
  >[];
}

export interface DataPrivacyPage extends Page {
  hero: Entry<Components.OverviewHeroProps>;
  sections: Entry<
    Components.AboutProps &
      Components.CtaBannerProps &
      Components.MarkdownSectionProps &
      Components.ResourcesProps &
      Components.FaqProps &
      Components.CustomerLogosProps
  >[];
}

export interface IotGlobalCoveragePage extends Page {
  hero: Entry<Components.ProductHeroProps>;
  sections: Entry<
    Components.AboutProps & Components.CtaBannerProps & Components.ColorfulCardsProps & Components.CarouselSectionProps
  >[];
}

export interface LLMLibraryPage extends Page {
  hero: Entry<Components.ProductHeroProps>;
  sections: Entry<
    Components.HowItWorksProps & Components.ResourcesProps & Components.CtaBannerProps & DemoSectionProps
  >[];
}

export interface GlobalCoveragePage extends Page {
  hero: Entry<Components.OverviewHeroProps>;
  sections: Entry<
    Components.AboutProps &
      CoverageTableSectionProps &
      Components.ResourcesProps &
      Components.CtaBannerProps &
      Components.ColorfulCardsProps &
      Components.CarouselSectionProps
  >[];
}

export interface VoiceAiPage extends Page {
  formSection: HorizontalFormSectionProps & { form: VoiceAIFormProps };
  sections: Entry<
    Components.AboutProps &
      Components.CarouselSectionProps &
      Components.ResourcesProps &
      Components.TextCardsProps &
      Components.ColorfulCardsProps &
      Components.CustomerLogosProps &
      Components.MediaCardListProps &
      Components.CtaBannerProps &
      Components.CustomerStoriesProps &
      Components.FaqProps &
      Components.HowItWorksProps &
      Components.MarkdownSectionProps &
      Components.TabsWithMarkdownProps
  >[];
}

export interface DataTransferImpactAssessmentPage extends Page {
  hero: Entry<Components.OverviewHeroProps>;
  sections: Entry<Components.AboutProps & Components.MarkdownSectionProps>[];
}

export interface StorageTermsAndConditionsPage extends Page {
  hero: Entry<Components.ProductHeroProps>;
  sections: Entry<Components.MarkdownSectionProps>[];
}

export interface LegalPage extends Page {
  hero: Entry<Components.OverviewHeroProps>;
  sections: Entry<Components.AboutProps & Components.MarkdownSectionProps & Components.RichTextSectionProps>[];
}

export interface LegalPagesVersion {
  [key: string]: {
    url: string;
    lastmod: string;
  };
}

export interface HomePage {
  title: string;
  seo: MetaTagsFields;
  hero: HomeHeroProps;
  sections: {
    customerLogos: Components.CustomerLogosHomePageProps;
    products: ProductsSectionProps;
    useCases: Components.LinkImageRowSectionProps;
    cta: Components.HomePageCtaSectionProps;
    developerFocus: DeveloperFocusProps;
  };
}

export interface FreshHomePage {
  title: string;
  seo: MetaTagsFields;
  hero: FreshHomeHeroProps;
  sections: {
    products: FreshHomeProductsSectionProps;
    customerLogos: Components.CustomerLogosProps;
    inference: InferenceSectionProps;
    voiceAi: VoiceAiSectionProps;
    ourNetwork: OurNetworkSectionProps;
    iot: IotSectionProps;
    missionControl: Components.MissionControlSectionProps;
    customerStories: CustomerStoriesSectionProps;
    blog: BlogSectionProps;
    doc: Components.DocSectionProps;
    cta: Components.HomePageCtaDarkSectionProps;
  };
}

export interface OurNetworkCoveragePage extends Page {
  hero: Entry<Components.OurNetworkHeroProps>;
  sections: Entry<
    Components.TextCardsProps &
      Components.ResourcesProps &
      Components.CtaBannerProps &
      Components.FaqProps &
      Components.CarouselSectionProps
  >[];
}
