export const defaultSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Telnyx',
  url: 'https://telnyx.com',
  logo: 'https://go.telnyx.com/rs/028-JJW-728/images/TelnyxNewLogo_Black.png',
  telephone: '+1-888-980-9750',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+1-888-980-9750',
      contactType: 'customer service',
    },
  ],
  sameAs: ['https://www.facebook.com/Telnyx/', 'https://twitter.com/telnyx', 'https://www.linkedin.com/company/telnyx'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '311 W Superior St, Suite 504',
    addressLocality: 'Chicago',
    addressRegion: 'IL',
    postalCode: '60654',
    addressCountry: 'United States',
  },
};

export const blogPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  author: {
    '@type': 'Person',
  },
  publisher: {
    '@type': 'Organization',
    '@id': 'https://telnyx.com',
    name: 'Telnyx',
    logo: {
      '@type': 'ImageObject',
      url: 'https://go.telnyx.com/rs/028-JJW-728/images/TelnyxNewLogo_Black.png',
      width: 400,
      height: 104,
    },
  },
};

export const productPageSchema = {
  '@context': 'https://schema.org/',
  '@type': 'Product',
  brand: {
    '@type': 'Brand',
    name: 'Telnyx',
  },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    validFrom: '2023-10-26',
  },
};

export const pricingPageSchema = {
  '@context': 'http://schema.org',
  '@type': 'WebPage',
  mainEntityOfPage: {
    '@type': 'WebPage',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Telnyx',
    logo: {
      '@type': 'ImageObject',
      url: 'https://go.telnyx.com/rs/028-JJW-728/images/TelnyxNewLogo_Black.png',
      width: 400,
      height: 104,
    },
  },
};

export const useCasesSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  publisher: {
    '@type': 'Organization',
    name: 'Telnyx',
    url: 'https://telnyx.com',
    logo: {
      '@type': 'ImageObject',
      logo: 'https://go.telnyx.com/rs/028-JJW-728/images/TelnyxNewLogo_Black.png',
    },
    sameAs: [
      'https://www.facebook.com/Telnyx/',
      'https://twitter.com/telnyx',
      'https://www.linkedin.com/company/telnyx/',
    ],
  },
};

export const releaseNotesSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  publisher: {
    '@type': 'Organization',
    name: 'Telnyx',
    url: 'https://telnyx.com',
    logo: {
      '@type': 'ImageObject',
      logo: 'https://go.telnyx.com/rs/028-JJW-728/images/TelnyxNewLogo_Black.png',
    },
    sameAs: [
      'https://www.facebook.com/Telnyx/',
      'https://twitter.com/telnyx',
      'https://www.linkedin.com/company/telnyx/',
    ],
  },
};
