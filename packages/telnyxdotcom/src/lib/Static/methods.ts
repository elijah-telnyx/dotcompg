import type { AboutProps, CoverageTableSectionProps, CtaBannerProps, OverviewHeroProps } from 'ui/components/@types';
import { COVERAGE_TABLE_ID, globalCoverageData } from './data';

import AcceptablePolicyContent from './AcceptablePolicyContent';
import CookiePolicyContent from 'lib/Static/CookiePolicyContent';
import type { FormSectionProps } from 'ui/components/FormSection';
import type { MarkdownSectionProps } from 'ui/components/MarkdownSection';
import type { NavigationBubblesSectionProps } from 'ui/components/NavigationBubblesSection';
import type { SectionProps } from 'ui/components/Section';
import type { SignUpFormProps } from 'ui/components/SignUpForm';
import type { SubpoenaFormProps } from 'ui/components/SubpoenaForm';
import type { ControlledFormHeroProps } from 'components/ControlledFormHero';
import type { RCSSubmissionFormProps } from 'components/RCSSubmissionForm';

export const getProductsOverviewPage = () => ({
  hero: {
    heading: 'Your one-stop shop for distributed infrastructure.',
    copy: `Explore our suite of products below or [contact us](/contact-us) for customized recommendations.`,
    backgroundColor: 'black',
    hasOverflow: false,
    spacingTop: 'contrasting',
    spacingBottom: 'continuous',
  } as OverviewHeroProps,
  navigation: {
    defaultExpandedItems: [],
    items: [
      {
        heading: 'Communications',
        id: 'communications',
        itemTheme: 'green',
        navItems: [
          {
            label: 'Messaging',
            items: [
              {
                text: 'SMS API',
                href: '/products/sms-api',
                type: 'button',
                buttonKind: 'list',
              },
              {
                text: 'MMS API',
                href: '/products/mms-api',
                type: 'button',
                buttonKind: 'list',
              },
              {
                text: 'Short Code',
                href: '/products/sms-short-code',
                type: 'button',
                buttonKind: 'list',
              },
              {
                text: '10DLC',
                href: '/products/10dlc-registration',
                type: 'button',
                buttonKind: 'list',
              },
              {
                text: 'Alphanumeric Sender ID',
                href: '/products/alphanumeric-sender-id',
                type: 'button',
                buttonKind: 'list',
              },
              {
                text: 'RCS',
                href: '/products/rcs',
                type: 'button',
                buttonKind: 'list',
              },
            ],
          },
          {
            label: 'Numbers',
            items: [
              {
                text: 'Global Numbers',
                href: '/products/phone-numbers',
                type: 'button',
                buttonKind: 'list',
              },
              {
                text: 'Toll-free Numbers',
                href: '/products/toll-free-numbers',
                type: 'button',
                buttonKind: 'list',
              },
            ],
          },
          {
            label: 'Identity',
            items: [
              {
                text: 'Number Lookup API',
                href: '/products/number-lookup',
                type: 'button',
                buttonKind: 'list',
              },
              {
                text: 'Verify API',
                href: '/products/verify-api',
                type: 'button',
                buttonKind: 'list',
              },
            ],
          },
          {
            label: 'Voice',
            items: [
              {
                text: 'SIP Trunking',
                href: '/products/sip-trunks',
                type: 'button',
                buttonKind: 'list',
              },
              {
                text: 'Voice API',
                href: '/products/voice-api',
                type: 'button',
                buttonKind: 'list',
              },
              {
                text: 'TeXML',
                href: '/products/texml',
                type: 'button',
                buttonKind: 'list',
              },
              {
                text: 'WebRTC',
                href: '/products/webrtc',
                type: 'button',
                buttonKind: 'list',
              },
              {
                text: 'Voice AI',
                href: '/voice-ai',
                type: 'button',
                buttonKind: 'list',
              },
            ],
          },
          {
            label: 'Fax',
            items: [
              {
                text: 'Fax API',
                href: '/products/fax-api',
                type: 'button',
                buttonKind: 'list',
              },
            ],
          },
          {
            label: 'Enterprise Integrations',
            items: [
              {
                text: 'Microsoft Teams',
                href: '/products/enterprise-integrations-ms-teams',
                type: 'button',
                buttonKind: 'list',
              },
              {
                text: 'Zoom Phone',
                href: '/products/enterprise-integrations-zoom-phone',
                type: 'button',
                buttonKind: 'list',
              },
            ],
          },
        ],
      },
      {
        heading: 'IoT',
        id: 'iot',
        itemTheme: 'citron',
        navItems: [
          {
            label: '',
            items: [
              {
                text: 'IoT SIM Card',
                href: '/products/iot-sim-card',
                type: 'button',
                buttonKind: 'list',
              },
              {
                text: 'eSIM',
                href: '/products/esim',
                type: 'button',
                buttonKind: 'list',
              },
            ],
          },
        ],
      },
      {
        heading: 'Networking',
        id: 'networking',
        itemTheme: 'blue',
        navItems: [
          {
            label: '',
            items: [
              {
                text: 'Programmable Networking',
                href: '/products/programmable-networking',
                type: 'button',
                buttonKind: 'list',
              },
              {
                text: 'Cloud VPN',
                href: '/products/cloud-vpn',
                type: 'button',
                buttonKind: 'list',
              },
              {
                text: 'Global Edge Router',
                href: '/products/global-edge-router',
                type: 'button',
                buttonKind: 'list',
              },
            ],
          },
        ],
      },
      {
        heading: 'Compute',
        id: 'compute',
        itemTheme: 'tan',
        navItems: [
          {
            label: '',
            items: [
              {
                text: 'Storage',
                href: '/products/storage',
                type: 'button',
                buttonKind: 'list',
              },
              {
                text: 'Embeddings API',
                href: '/products/embeddings-api',
                type: 'button',
                buttonKind: 'list',
              },
              {
                text: 'LLM Library',
                href: '/products/llm-library',
                type: 'button',
                buttonKind: 'list',
              },
              {
                text: 'Inference',
                href: '/products/inference',
                type: 'button',
                buttonKind: 'list',
              },
            ],
          },
        ],
      },
    ],
    backgroundColor: 'black',
    hasOverflow: false,
    spacingTop: 'continuous',
    spacingBottom: 'contrasting',
  } as NavigationBubblesSectionProps,
});

export const getSignUpPage = () =>
  ({
    heading: 'Create a Telnyx account',
    headingTag: 'h1',
    copy: 'Sign up for a free Mission Control Portal account to access all Telnyx products.',
    signInLink: 'https://portal.telnyx.com/#',
    media: {
      src: 'https://images.ctfassets.net/2vm221913gep/1RBkXVLKJeRucChx7WjCZX/2fd36da90aaaeb8d8a9be31344754a52/Form_LogoCrop_Background.svg',
      alt: 'telnyx colorful logo',
    },
    footerCopy: `This site is protected by reCAPTCHA and the [Google Privacy Policy](https://policies.google.com/privacy) and [Terms of Service apply](https://policies.google.com/terms).`,
    termsAndConditionsUrl: '/terms-and-conditions-of-service',
    privacyPolicyUrl: '/privacy-policy',
    backgroundColor: 'black',
    hasOverflow: false,
    spacingBottom: 'contrasting',
    spacingTop: 'continuous',
  } as SectionProps & FormSectionProps & SignUpFormProps);

export const getWhyTelnyxPage = () => ({
  hero: {
    heading: 'Architect your connectivity',
    copy: 'Learn about the problems we solve and the opportunities we create.',
    backgroundColor: 'black',
    hasOverflow: false,
    centered: true,
    spacingTop: 'contrasting',
    spacingBottom: 'contrasting',
    hasPattern: true,
  } as OverviewHeroProps,
  sections: [
    {
      id: '7Ix08lCoZ32HAMnObo3ltb',
      contentType: 'sectionAbout',
      tag: '',
      heading: 'Our approach',
      copy: `From omnichannel communications to real-time analytics to high-speed content delivery, businesses depend on localized internet, telecommunications and data infrastructure to build the products and services today's customers expect. Yet, this critical infrastructure remains largely inaccessible-it's centralized, expensive and slow. At Telnyx, we're architecting and amplifying access to global connectivity. We power communications, wireless, networking and storage from our private, global, multi-cloud IP network all the way out to the hyperlocal edge. And we make this edge infrastructure easily available through intuitive APIs housed in one space.`,
      spacingTop: 'contrasting',
      spacingBottom: 'continuous',
      backgroundColor: 'cream',
      hasOverflow: true,
    } as AboutProps & { contentType: string },
    {
      id: '7Ix08lCoZ32HAMnObo3lt1',
      contentType: 'sectionAbout',
      tag: '',
      heading: 'From our secure network',
      copy: `We power communication, wireless, networking and storage from our private, global, multi-cloud IP network.
      Built with 10 multi-cloud points of presence (PoPs) in metro areas across the globe, we offer reliability and resiliency against latency, downtime and packet-loss. We own private fiber interconnects between our PoPs to provide a private highway for your data traffic, ensuring security.`,
      spacingTop: 'continuous',
      spacingBottom: 'continuous',
      backgroundColor: 'black',
      hasOverflow: true,
      reverse: true,
      media: {
        src: 'https://images.ctfassets.net/2vm221913gep/1Abh3wSCV1FVwXzA5PSB9u/1eb58eecebda7841e42be7936e0011d4/Group_2591.png',
        alt: 'sim card',
      },
    } as AboutProps & { contentType: string },
    {
      id: '7Ix08lCoZ32HAMnObo3lt3',
      contentType: 'sectionAbout',
      tag: '',
      heading: 'To the hyperlocal edge',
      copy: `From autonomous vehicles to in-hospital patient monitoring to content delivery to smart home devices, the amount of data being generated at “the edge” is growing exponentially. However, the transmission of data is expensive.
      By providing access to edge infrastructure via APIs, we equip developers with cost effective and low-latency solutions to network and communicate that data.
      To learn more about this shift toward the hyperlocal edge, hear from our founder.`,
      spacingTop: 'continuous',
      spacingBottom: 'continuous',
      backgroundColor: 'black',
      hasOverflow: true,
      reverse: false,
      media: {
        src: 'https://images.ctfassets.net/2vm221913gep/2JZNxEZJrMZQjyuIoGz7JI/db632a6b93618998f64a0646d5fbd4e3/image.png',
        alt: 'sim card',
      },
    } as AboutProps & { contentType: string },
    {
      id: '7Ix08lCoZ32HAMnObo3l123',
      contentType: 'sectionAbout',
      tag: '',
      heading: 'Powering easy-to-use,  customizable APIs',
      copy: `Speed up build times with our intuitive APIs, SDKs and detailed development documentation. If our out-of-the-box offering doesn’t suit your needs, adapt our APIs with ease.
      Peruse our Products Overview to learn more. Explore Dev Docs to review implementation guidance from our engineering experts.`,
      spacingTop: 'continuous',
      spacingBottom: 'continuous',
      backgroundColor: 'black',
      hasOverflow: true,
      reverse: true,
      media: {
        src: 'https://images.ctfassets.net/2vm221913gep/21Aq3Lkk8RCmll8ZKp4iWV/7942fd6437648aa41a7d10ac953b5963/Storage-2_AccessFiles-_2x__1.png',
        alt: 'sim card',
      },
    } as AboutProps & { contentType: string },
    {
      id: '7Ix08lCoZ32HAMnObo3lt4',
      contentType: 'sectionAbout',
      tag: '',
      heading: 'Housed in a single platform',
      copy: `Historically, companies require multiple vendors to provide every type of infrastructure necessary to implement connectivity for their business. They manage an onerous number of aggregators and direct relationships, juggle multiple connectivity partners, or build and maintain their own bespoke infrastructure.
      Our holistic approach simplifies the complexity. We empower businesses of all sizes with a one-stop shop for infrastructure via our Mission Control Portal.`,
      spacingTop: 'continuous',
      spacingBottom: 'continuous',
      backgroundColor: 'black',
      hasOverflow: true,
      reverse: false,
      media: {
        src: 'https://images.ctfassets.net/2vm221913gep/512mKqQVu5nXMY8j7tSiVD/2a0618ea3237291d33ddc14c4aa1ed06/Group_2566.png',
        alt: 'sim card',
      },
    } as AboutProps & { contentType: string },
    {
      id: '7Ix08lCoZ32HAMnObo3lt8',
      contentType: 'sectionAbout',
      tag: '',
      heading: 'With world-class support at the ready',
      copy: `Build with confidence knowing our support team is available 24/7 to assist you.
      Not sure what the right solution is for your business? Talk to an expert to design a solution that works best for you.`,
      spacingTop: 'continuous',
      spacingBottom: 'contrasting',
      backgroundColor: 'black',
      hasOverflow: true,
      reverse: true,
      media: {
        src: 'https://images.ctfassets.net/2vm221913gep/3ap1rQxeeLUkIEhL356l9j/70c05e41253119498907ce6abcbe1e5e/Group_2589.png',
        alt: 'sim card',
      },
    } as AboutProps & { contentType: string },
    {
      id: '7Ix08lCoZ32HAMnObo3lt5',
      contentType: 'sectionCtaBanner',
      heading: 'Sign up and start building.',
      backgroundColor: 'green',
      ctaButtons: [
        { text: 'Sign up', href: '#signup', type: 'button' },
        {
          text: 'Contact us',
          href: '#contactus',
          type: 'button',
          buttonKind: 'secondary',
        },
      ],
    } as CtaBannerProps & { contentType: string },
  ],
});

export const getLawEnforcementRequestPage = () =>
  ({
    heading: 'Telnyx Subpoena / Law Enforcement Request',
    headingTag: 'h1',
    copy: 'This form must be used to submit any subpoena, court order, or law enforcement request for information.',
    backgroundColor: 'black',
    hasOverflow: false,
    spacingBottom: 'contrasting',
    spacingTop: 'contrasting',
  } as SectionProps & FormSectionProps & SubpoenaFormProps);

export const getRCSSubmissionFormPage = () =>
  ({
    heading: 'RCS business messaging submission form',
    headingTag: 'h1',
    copy: 'Fill out the form below, and we will get back to you as soon as possible!',
    backgroundColor: 'black',
    hasOverflow: false,
    spacingBottom: 'contrasting',
    spacingTop: 'contrasting',
  } as SectionProps & FormSectionProps & RCSSubmissionFormProps);

export const getVoiceAiSetupFormPage = (): ControlledFormHeroProps => ({
  tagline: 'Try it out',
  heading: `Build a Voice BOT`,
  headingLevel: 1,
  headingTag: 'h1',
  copy: `Experience context aware AI agents built with your proprietary data`,
  smallCopy: `*Fill out the form, we will take embed information from your website and generate a unique AI voice bot for you in minutes*`,
  ctaButtons: [
    {
      type: 'button',
      text: 'Get started',
      href: 'https://portal.telnyx.com/#/login/sign-in',
      buttonKind: 'primary',
      buttonIcon: {
        src: '',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <g clip-path="url(#clip0_2558_1250)">
              <path d="M3.29289 15.2929L2.58579 16L4 17.4142L4.70711 16.7071L3.29289 15.2929ZM4.70711 16.7071L12.8671 8.54709L11.4529 7.13288L3.29289 15.2929L4.70711 16.7071Z" fill="currentColor"/>
              <path d="M15.7028 3.03247C16.4846 2.77188 17.2283 3.51562 16.9678 4.29738L14.7119 11.065C14.4768 11.7703 13.5817 11.9816 13.0561 11.4559L8.5443 6.94415C8.01865 6.4185 8.22994 5.52343 8.93518 5.28835L15.7028 3.03247Z" fill="currentColor"/>
          </g>
          <defs>
              <clipPath id="clip0_2558_1250">
                  <rect width="20" height="20" fill="white"/>
              </clipPath>
          </defs>
  </svg>`,
        alt: 'external',
      },
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      type: 'button',
      text: 'Contact sales',
      href: '/contact-us',
      buttonKind: 'secondary',
    },
  ],
  background: {
    backgroundImage:
      'url(https://images.ctfassets.net/2vm221913gep/6z4Y3Yl47iyxPBm5isck2o/a6dc9423fc9d244acbe3421f0ee3ff92/VoiceAIForm_LogoCrop_Medium_Background.svg)',
    backgroundImageLarge:
      'url(https://images.ctfassets.net/2vm221913gep/36BzArHmwfwdppCuhBZkyN/0b0fd13587c4903368e425fb4f6e4e41/VoiceAIForm_LogoCrop_Large_Background.svg)',
    backgroundImageXl:
      'url(https://images.ctfassets.net/2vm221913gep/35cgwmy2NOibTiLcMGUrvH/3251cd398ea383701c9d70eec9cfcdbb/VoiceAIForm_LogoCrop_XL_Background.svg)',

    backgroundAttachment: 'fixed',
    backgroundBlendMode: 'hard-light',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right center',
  },
  backgroundColor: 'green',
  hasOverflow: false,
  spacingBottom: 'contrasting',
  spacingTop: 'contrasting',
  form: {
    formType: 'VoiceAI',
    heading: 'Build your context-aware AI agent',
    semanticHeading: true,
  },
});

export const getCookiePolicyPage = () => ({
  hero: {
    heading: 'Telnyx Cookie Policy',
    backgroundColor: 'cream',
    hasOverflow: false,
    centered: false,
    spacingTop: 'contrasting',
    spacingBottom: 'continuous',
  } as OverviewHeroProps,
  markdownSection: {
    copy: CookiePolicyContent,
    backgroundColor: 'cream',
    hasOverflow: false,
    spacingTop: 'none',
    spacingBottom: 'none',
  } as MarkdownSectionProps,
});

export const getAcceptablePolicyPage = () => ({
  hero: {
    heading: 'Acceptable Use Policy',
    backgroundColor: 'cream',
    hasOverflow: false,
    centered: false,
    spacingTop: 'contrasting',
    spacingBottom: 'continuous',
  } as OverviewHeroProps,
  markdownSection: {
    copy: AcceptablePolicyContent,
    backgroundColor: 'cream',
    hasOverflow: false,
    spacingTop: 'none',
    spacingBottom: 'none',
  } as MarkdownSectionProps,
});

export const getGlobalCoverageTable: () => CoverageTableSectionProps = () => {
  const numberTypes = Array.from(new Set(globalCoverageData.flatMap((item) => Object.keys(item.types))));
  const services = Object.keys(Object.values(globalCoverageData[0].types)[0]);

  const Full_PSTN_Replacement = 'Full PSTN Replacement';

  return {
    id: COVERAGE_TABLE_ID,
    heading: 'Take a closer look at our global number coverage',
    copy: 'Search by country or filter results by number type and/or service.',
    spacingTop: 'continuous',
    spacingBottom: 'continuous',
    tabs: [
      {
        label: 'Services',
        isServices: true,
        data: {
          header: services,
          body: globalCoverageData.map((item) => {
            const notAvailableTypes = numberTypes.filter((type) => typeof item.types[type] === 'undefined');
            const emptyTypesObj = notAvailableTypes.reduce(
              (typesObj, type) => ({
                ...typesObj,
                [type]: services.reduce((servicesObj, service) => ({ ...servicesObj, [service]: false }), {}),
              }),
              {}
            );

            return {
              ...item,
              types: {
                ...item.types,
                ...emptyTypesObj,
              },
            };
          }),
        },
      },
      {
        label: 'Number types',
        data: {
          header: numberTypes.filter((type) => type.toLowerCase() !== 'voip').concat(Full_PSTN_Replacement),
          body: globalCoverageData.map((item) => {
            if (
              Object.values(item.types).some(
                (type) => (type as { [Full_PSTN_Replacement]: boolean })[Full_PSTN_Replacement]
              )
            ) {
              return {
                ...item,
                types: { ...item.types, [Full_PSTN_Replacement]: { [Full_PSTN_Replacement]: true } },
              };
            }

            return item;
          }),
        },
      },
    ],
  } as CoverageTableSectionProps;
};
