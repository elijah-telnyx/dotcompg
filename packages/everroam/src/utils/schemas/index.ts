import {
  defaultSchema,
  blogPageSchema,
  productPageSchema,
  pricingPageSchema,
  useCasesSchema,
  releaseNotesSchema,
} from './schemas';

interface params {
  type: keyof typeof SCHEMA_MAP | undefined;
  payload: payload;
}
interface payload {
  headline?: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    '@type'?: string;
    name?: string;
  };
  name?: string;
  url?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
    availability?: string;
    validFrom?: string;
  };
  mainEntityOfPage?: {
    '@type'?: string;
    '@id'?: string;
  };
}

const SCHEMA_MAP = {
  default: defaultSchema,
  blog: blogPageSchema,
  product: productPageSchema,
  pricing: pricingPageSchema,
  useCase: useCasesSchema,
  componentReleaseNotesItem: releaseNotesSchema,
};

export const generateSchema = ({ type, payload }: params) => {
  if (!type) return JSON.stringify(defaultSchema);
  if (!payload) return undefined;

  if (type === 'blog') {
    return JSON.stringify({
      ...blogPageSchema,
      ...payload,
      author: { ...blogPageSchema.author, ...payload.author },
    });
  }

  if (type === 'product') {
    return JSON.stringify({
      ...productPageSchema,
      ...payload,
      offers: { ...productPageSchema.offers, ...payload.offers },
    });
  }

  if (type === 'pricing') {
    return JSON.stringify({
      ...pricingPageSchema,
      ...payload,
      mainEntityOfPage: { ...pricingPageSchema.mainEntityOfPage, ...payload.mainEntityOfPage },
    });
  }

  if (type === 'useCase') {
    return JSON.stringify({
      ...useCasesSchema,
      ...payload,
    });
  }

  if (type === 'componentReleaseNotesItem') {
    return JSON.stringify({
      ...releaseNotesSchema,
      ...payload,
    });
  }

  return JSON.stringify({ ...SCHEMA_MAP[type], ...payload });
};
