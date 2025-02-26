import { type PricingPagesProps } from 'lib/Pricing/pages';

const pricingPageSectionOverridesBySlug = {
  'call-control': (page: PricingPagesProps) => {
    const payAsYouGoSection = {
      ...page.sections?.find(({ id }) => id === 'pay-as-you-go'),
      heading: `Pay as you go in ${page.currentLocale?.name}`,
    };

    const downloadPricingSection = page.sections?.find(({ id }) => id === 'download-pricing');
    return {
      ...page,
      seo: {
        ...page.seo,
        title: 'Voice API Pricing | Save up to 30%',
        description: `Voice API Pricing - Get pricing for the most flexible and feature-packed Voice API available in ${page?.currentLocale?.name}. Pay as you go or get discounts as you scale in ${page?.currentLocale?.name}.`,
      },
      hero: {
        ...page.hero,
        copy: `Get pricing for the most flexible and feature-packed Voice API available in ${page?.currentLocale?.name}. Pay as you go or get discounts as you scale in ${page?.currentLocale?.name}.`,
      },
      sections: [
        page.sections[0],
        payAsYouGoSection,
        {
          ...downloadPricingSection,
          form: {
            ...downloadPricingSection?.form,
            heading: `Download ${page.currentLocale?.name} SIP Trunking pricing`,
          },
        },
        ...page.sections.slice(3),
      ],
    };
  },

  'elastic-sip': (page: PricingPagesProps) => {
    const payAsYouGoSection = {
      ...page.sections?.find(({ id }) => id === 'pay-as-you-go'),
      heading: `Pay as you go in ${page.currentLocale?.name}`,
    };

    const downloadPricingSection = page.sections?.find(({ id }) => id === 'download-pricing');
    const countryName = page?.currentLocale?.name;
    const description = `Competitive pricing in ${countryName}. Receive automatic discounts as you scale and connect with more customers in ${countryName}`;

    return {
      ...page,
      seo: {
        ...page.seo,
        title: 'SIP Trunk Pricing | Save up to 30%',
        description,
      },
      hero: {
        ...page.hero,
        copy: description,
      },
      sections: [
        page.sections[0],
        payAsYouGoSection,
        {
          ...downloadPricingSection,
          form: {
            ...downloadPricingSection?.form,
            heading: `Download ${page.currentLocale?.name} SIP Trunking pricing`,
          },
        },
        ...page.sections.slice(3),
      ],
    };
  },

  'iot-data-plans': (page: PricingPagesProps) => {
    const payAsYouGoSection = {
      ...page.sections?.find(({ id }) => id === 'pay-as-you-go'),
      heading: `Pay as you go in ${page.currentLocale?.name}`,
    };
    return {
      ...page,
      seo: {
        ...page.seo,
        title: 'IoT SIM Plans and Pricing | eSIMs available',
        description: `Manage your IoT devices in ${page?.currentLocale?.name} on a secure network optimized for modern wireless SIM cards. Starting at only $1 per friendly SIM Cards.`,
      },
      hero: {
        ...page.hero,
        copy: `Manage your IoT devices in ${page?.currentLocale?.name} on a secure network optimized for modern wireless SIM cards. Starting at only $1 per friendly SIM Cards.`,
      },
      sections: [page.sections[0], payAsYouGoSection, ...page.sections.slice(2)],
    };
  },
};

export const pricingPageOverrideSlugList = Object.keys(pricingPageSectionOverridesBySlug);

export default pricingPageSectionOverridesBySlug;
