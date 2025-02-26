import type { MetaTagsProps } from 'components/MetaTags';
import type {
  AboutProps,
  CtaBannerProps,
  ColorfulCardsProps,
  OverviewHeroProps,
  CarouselSectionProps,
} from 'ui/components/@types';

const seo = {
  title: 'Telnyx Global Coverage - Services and Numbers by Country',
  description:
    "Find out which Telnyx services and number types are available globally. We're always adding coverage so check back often!",
} as MetaTagsProps;

const supportedCountries = '35+';

export const COVERAGE_TABLE_ID = 'our-global-coverage';

const hero = {
  backgroundColor: 'green',
  heading: 'Global coverage',
  copy: 'Get global voice and messaging from one provider. Wherever you’re going, Telnyx has the coverage to help scale your communications easily and efficiently.',
  ctaButtons: [{ text: 'View full coverage', href: `#${COVERAGE_TABLE_ID}`, type: 'link', linkKind: 'cta' }],
  form: {
    heading: 'Download full coverage',
    formId: 2555,
  },
} as OverviewHeroProps;

const sections = {
  about: {
    tag: 'About',
    heading: 'A global carrier, built for scale',
    copy: 'Telnyx holds carrier status in 30+ countries around the world, giving us direct access to numbers in key markets. What’s more, with our Mission Control Portal and APIs, the Telnyx platform makes it easy to search and provision local, national, mobile and toll-free numbers, so your business can expand to new regions quickly, with one provider.',
    media: {
      src: 'https://images.ctfassets.net/2vm221913gep/26rYgceTUWDVzasDPby1oi/5ccba8a7f9404981c10806832a04167a/Number-Coverage-About.png',
      type: 'image',
      alt: '',
      width: 752,
      height: 564,
    },
    spacingTop: 'continuous',
    spacingBottom: 'continuous',
  } as AboutProps,
  ctaBanner: {
    heading: 'Don’t see coverage in the country you’re interested in?',
    copy: 'Reach out to our sales team with what you’re looking for. We’re constantly updating our global services–so what you need is likely on the way!',
    ctaButtons: [
      { type: 'button', buttonKind: 'primary', text: 'Contact us', href: '/contact-us?Reason_for_Contact__c=Support' },
    ],
    centered: true,
    spacingTop: 'continuous',
    spacingBottom: 'continuous',
  } as CtaBannerProps,
  colorfulCards: {
    cardTheme: 'citron',
    overlap: true,
    items: [
      {
        id: '1',
        title: 'Unrivaled connectivity',
        leadingText: `Telnyx continuously expands global calling services for seamless connectivity. We currently offer local calls in 49 countries and PSTN replacement in ${supportedCountries}—more coming soon.`,
        highlightTitle: supportedCountries,
        highlightText: 'COUNTRIES WITH PSTN REPLACEMENT',
      },
      {
        id: '2',
        title: 'Expertise for peace-of-mind',
        leadingText: 'Expertise for peace-of-mind',
        highlightTitle: '140+',
        highlightText: 'countries with local numbers',
      },
    ],
    spacingTop: 'continuous',
    spacingBottom: 'continuous',
  } as ColorfulCardsProps,
  carouselSection: {
    tagline: 'GLOBAL SERVICES',
    heading: 'All you need to scale, on one platform',
    items: [
      {
        media: {
          src: 'https://images.ctfassets.net/2vm221913gep/66NJn5HWOzXp77BX8kzX8x/6c357e13fd00d675378c2b0dfd45f296/Product_Thumbnail_Networking_Programmable-Networking.png',
          alt: '',
        },
        heading: 'Our network',
        copy: 'See what you can build with our private global network.',
        linkText: 'LEARN MORE',
        linkHref: '',
      },
      {
        media: {
          src: 'https://images.ctfassets.net/2vm221913gep/3TcdnRLGYywYZaEjUEp5Sc/9c908ddbc396d2734ed2c0e1b9a25c0e/Mission_Control_Thumbnail.png',
          alt: '',
        },
        heading: 'Mission Control',
        copy: 'Purchase, manage and monitor your infrastructure via our one-stop shop.',
        linkText: 'LEARN MORE',
        linkHref: '',
      },
      {
        media: {
          src: 'https://images.ctfassets.net/2vm221913gep/2Ow6lNLnstqyJAfn0CyT6q/c4c79ddd2b1edd94ea7dad78b286f641/Embedded_number_search_and_provisioning.png',
          alt: '',
        },
        heading: 'Solutions',
        copy: 'Learn about CPaaS solutions that scale with your business.',
        linkText: 'LEARN MORE',
        linkHref: '',
      },
    ],
    spacingTop: 'continuous',
  } as CarouselSectionProps,
  ctaBannerBottom: {
    backgroundColor: 'green',
    heading: 'Go global with Telnyx.',
    ctaButtons: [
      { type: 'button', buttonKind: 'primary', text: 'talk to an expert', href: '/contact-us' },
      { type: 'button', buttonKind: 'secondary', text: 'Sign up', href: '/sign-up' },
    ],
  } as CtaBannerProps,
};

const pageData = {
  seo,
  hero,
  sections,
};

export default pageData;
