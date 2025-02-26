/**
 * @TODO
 * Generate these list based on the cms/sitemap
 */

const products = {
  elasticSip: '/products/sip-trunks',
};

const pricing = {
  callControl: '/pricing/call-control',
  messaging: '/pricing/messaging',
  elasticSip: '/pricing/elastic-sip',
};

const signUp = {
  root: '/sign-up',
  verifyEmail: {
    default: '/sign-up/verify-email',
    freemail: '/sign-up/verify-email/f',
    business: '/sign-up/verify-email/b',
  },
};

const resources = {
  root: '/resources',
  search: '/resources/search',
};

export const routes = {
  products,
  pricing,
  signUp,
  resources,
};
