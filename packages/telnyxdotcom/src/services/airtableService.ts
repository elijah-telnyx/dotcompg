import Airtable, { type FieldSet } from 'airtable';
import type { BackgroundColor } from 'ui/styles/constants/backgroundColorOptions';
import { errorLogger } from 'utils/errorHandler/errorLogger';

const config = {
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_TOKEN,
};

const constants = {
  AIRTABLE_BASE: 'appTMNzHotzMlJqAE',
  TABLE_LLM: 'tblqW6Y2nNQBTiRdO',
  TABLE_GLOBAL_NUMBERS: 'tbl5BXnzRwwx3mgAD',
  TABLE_GLOSSARY: 'tblk83He1xJZkRdJx',
};

interface SelectOptions {
  fields?: string[];
  filterByFormula?: string;
  maxRecords?: number;
  pageSize?: number;
  sort?: { field: string; direction?: 'asc' | 'desc' }[];
  view?: string;
  cellFormat?: 'json' | 'string';
  timeZone?: string;
  userLocale?: string;
}

export type GlossaryEntryQuery = {
  page: number;
  limitPerPage: number;
  options: SelectOptions;
};

export interface AirtableImage {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails: {
    [key: string]: { url: string; width: number; height: number };
  };
}

export interface AirtableLLMRecord {
  Model: string;
  properName: string;
  URL: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  'p-intro': string;
  license: string;
  modelSize: string;
  contextWindow: string;
  arenaElo: number;
  MMLU: number;
  mtBench: number;
  throughput: number;
  latency: number;
  totalResponseTime: number;
  'p-price': string;
  price: number;
  '1st Draft': boolean;
  'Human Enriched': boolean;
  Edited: boolean;
  useCases: string;
  performance: string;
  quality: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: AirtableImage[];
  ogImgAlt: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImg: AirtableImage[];
  twitterImgAlt: string;
  onlineBuzz: string;
  FAQs: string;
}

export interface AirtableGlobalNumbers {
  slug: string;
  localEconomy: string;
  localRegulations?: string;
  ogDescription: string;
  ogImage: AirtableImage[];
  ogImageUrl: string;
  ogImgAlt: string;
  ogTitle: string;
  properName: string;
  topMetros: string;
  twitterDescription: string;
  twitterImage: AirtableImage[];
  twitterImageUrl: string;
  twitterImageDescription: string;
  twitterTitle: string;
  Type: 'country' | 'state';
}

export interface AirtableGlossaryEntry extends FieldSet {
  slug: string;
  Keyword: string;
  title: string;
  metaDescription: string;
  article: string;
  tag: string;
  tagColor: BackgroundColor;
  authorName: string;
  authorImage: string;
  'Last Mod': string;
  featuredImage: string;
  socialUrl: string;
}

const initAirtable = async (tableId: string) => {
  await Airtable.configure(config);
  const base = Airtable.base(constants.AIRTABLE_BASE);
  return await base(tableId);
};

const getRecords = async (options?: any) => {
  const table = await initAirtable(constants.TABLE_LLM);
  const params = { ...options };
  const records = await table.select(params).all();

  // Edited field is the equivalent of published flag
  return records.map(({ fields }) => ({ ...fields })).filter((record) => record.Edited);
};

const getGlobalNumbers = async (slug: string) => {
  try {
    const table = await initAirtable(constants.TABLE_GLOBAL_NUMBERS);
    const records = await table.select().all();
    return records.filter(({ fields }) => fields.slug === slug)[0].fields as unknown as AirtableGlobalNumbers;
  } catch (error) {
    errorLogger({
      error: new Error(`Error fetching AirTable Global Numbers Data', ${error}`),
    });
    return null;
  }
};

const getGlossaryEntries = async (options: SelectOptions) => {
  try {
    const table = await initAirtable(constants.TABLE_GLOSSARY);
    return await table.select(options).firstPage();
  } catch (error) {
    errorLogger({
      error: new Error(`Error fetching AirTable Glossary Entry Data', ${error}`),
    });
    return null;
  }
};

const getGlossaryEntry = async (slug: string) => {
  try {
    const table = await initAirtable(constants.TABLE_GLOSSARY);
    const records = await table.select().all();
    return records.filter(({ fields }) => fields.slug === slug && fields.Live == true)[0]
      .fields as unknown as AirtableGlossaryEntry;
  } catch (error) {
    errorLogger({
      error: new Error(`Error fetching AirTable Glossary Entry Data', ${error}`),
    });
    return null;
  }
};

const airtableService = { getRecords, getGlobalNumbers, getGlossaryEntries, getGlossaryEntry };

export default airtableService;
