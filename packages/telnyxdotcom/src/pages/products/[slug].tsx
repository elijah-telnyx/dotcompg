import CalculatorSection from 'components/CalculatorSection';
import ErrorBoundary from 'components/ErrorBoundary';
import LLMComparisonTableSection from 'components/LLMComparisonTableSection';
import { parseName } from 'components/LLMComparisonTableSection/utils';
import { type LLMModel } from 'components/LLMComparisonTableSection/utils';
import airtableService from 'services/airtableService';
import LanguageSelect from 'components/LanguageSelect';
import env from 'constants/env';
import { BASE_URL } from 'env';
import 'glider-js/glider.min.css';
import { entries, getProductPage, getProductPages } from 'lib/Contentful';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import type { ElementType } from 'react';
import { getLLMModelData } from 'services/telnyxApiService';
import ProductHero from 'ui/components/ProductHero';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import { generateSchema } from 'utils/schemas';
import DemoSection from 'components/DemoSection';
import NumberLookupHero from 'components/NumberLookupHero';
import DemoHero from 'components/DemoHero';

const About = dynamic(() => import('ui/components/About'));
const CtaBanner = dynamic(() => import('ui/components/CTABanner'));
const Carousel = dynamic(() => import('ui/components/CarouselSection'));
const ColorfulCards = dynamic(() => import('ui/components/ColorfulCards'));
const CustomerLogos = dynamic(() => import('ui/components/CustomerLogos'));
const CustomerStories = dynamic(() => import('ui/components/CustomerStories'));
const Faq = dynamic(() => import('ui/components/Faq'));
const MarketoFormSection = dynamic(() => import('ui/components/FormSection/MarketoFormSection'));
const HowItWorks = dynamic(() => import('ui/components/HowItWorks'));
const Resources = dynamic(() => import('ui/components/Resources'));
const TextCards = dynamic(() => import('ui/components/TextCards'));
const TextCallout = dynamic(() => import('ui/components/TextCallout'));

type ProductSlugPageProps = Awaited<ReturnType<typeof getProductPage>> & { preview: boolean; hasTranslations: boolean };

const sectionsComponents = {
  sectionAbout: About,
  sectionCalculator: CalculatorSection,
  sectionCarousel: Carousel,
  sectionColorfulCards: ColorfulCards,
  sectionCtaBanner: CtaBanner,
  sectionCustomerLogos: CustomerLogos,
  sectionCustomerStories: CustomerStories,
  sectionDemo: DemoSection,
  sectionFaq: Faq,
  sectionForm: MarketoFormSection,
  sectionHowItWorks: HowItWorks,
  sectionResources: Resources,
  sectionTextCards: TextCards,
  sectionTextCallout: TextCallout,
};

const OPTIONS = [
  { name: 'English', value: 'iot-sim-card' },
  { name: '日本語 (Japanese)', value: 'iot-sim-japan' },
  { name: '한국인 (Korean)', value: 'iot-sim-korea' },
];

const SKIPPED_PAGES = [
  'global-cloud-communications-platform',
  'identity-services',
  'number-porting',
  'real-time-call-routing-lrn',
  'shaken-stir',
  'sms-short-code',
  'toll-free-sms',
  'virtual-cross-connects',
  'webrtc',
];

const pageSpecificSectionComponents: Record<string, Record<string, ElementType>> = {
  'iot-sim-card': {
    sectionCalculator: CalculatorSection,
  },
  'cloud-storage': {
    sectionCalculator: CalculatorSection,
  },
  'llm-library': {
    sectionPricingTable: LLMComparisonTableSection,
  },
};

type HeroProps = {
  useSrcSetGenerator?: boolean;
  preview: boolean;
};

const HeroComponent = ({ preview, useSrcSetGenerator, ...hero }: ProductSlugPageProps['hero'] & HeroProps) => {
  const contentType = hero.contentType;

  switch (contentType) {
    case 'heroDemo': {
      return (
        <ErrorBoundary preview={preview}>
          <DemoHero {...hero} />
        </ErrorBoundary>
      );
    }
    // @TODO: remove NumberLookupHero in favor of DemoHero usage for number-lookup page
    case 'heroNumberSearch': {
      return (
        <ErrorBoundary preview={preview}>
          <NumberLookupHero {...hero} />
        </ErrorBoundary>
      );
    }
    case 'heroProduct': {
      return (
        <ErrorBoundary preview={preview}>
          <ProductHero {...hero} useSrcSetGenerator={useSrcSetGenerator} />
        </ErrorBoundary>
      );
    }
    default: {
      return null;
    }
  }
};

const PAGE_TO_TEST_USE_SRC_GENERATOR = 'sip-trunks';

const ProductSlugPage: NextPage<ProductSlugPageProps & { data: LLMModel[] }> = ({
  hero,
  hasTranslations,
  slug,
  sections,
  preview,
  data,
}) => {
  const router = useRouter();

  const changePage = (e: string) => {
    if (e) {
      router.push(`${BASE_URL}/products/${e}`);
    }
    return;
  };

  const currentPage = router.query.slug;
  const useSrcSetGenerator = currentPage === PAGE_TO_TEST_USE_SRC_GENERATOR;

  return (
    <>
      <ErrorBoundary preview={preview}>
        {hasTranslations && hero.contentType === 'heroProduct' ? (
          <ProductHero {...hero} showLangDropdown={true}>
            <LanguageSelect placeholder={'English'} items={OPTIONS} value={slug} onValueChange={changePage} />
          </ProductHero>
        ) : (
          <HeroComponent preview={preview} {...hero} useSrcSetGenerator={useSrcSetGenerator} />
        )}
      </ErrorBoundary>
      {sections?.map(({ contentType, ...section }) => {
        const sectionType = contentType as keyof typeof sectionsComponents;
        const PageSection = pageSpecificSectionComponents[slug]?.[sectionType] || sectionsComponents[sectionType];
        if (section.id === 'llm-library-comparison-table') {
          return (
            <ErrorBoundary key={section?.id} preview={preview}>
              <PageSection {...section} data={data} />
            </ErrorBoundary>
          );
        }
        if (!PageSection) return null;

        return (
          <ErrorBoundary key={section?.id} preview={preview}>
            <PageSection {...section} />
          </ErrorBoundary>
        );
      })}
    </>
  );
};

export default ProductSlugPage;

type Paths = { params: { slug: string; locale?: string } }[];

export const getStaticPaths = async () => {
  const entries = await getProductPages();
  if (entries) {
    return {
      fallback: env.generatePagesFallback.products,
      paths: entries.items.reduce<Paths>((paths, page) => {
        const fields = page.fields;
        if (fields?.slug) {
          paths.push({ params: { slug: fields.slug } });
        }
        return paths;
      }, []),
    };
  }
  return [];
};

export const getStaticProps = defaultGetStaticProps<ProductSlugPageProps>({
  page: 'products/[slug]',
  getData: async ({ params, preview, locale, defaultLocale }) => {
    return getProductPage({ slug: params?.slug as string, locale: locale || defaultLocale }, { preview }).then(
      async (page) => {
        const skipSchema = SKIPPED_PAGES.includes(page.slug);
        const hasTranslations = OPTIONS.map((i) => i.value).includes(params?.slug as string);
        if (skipSchema) return { ...page, hasTranslations };

        const response = {
          ...page,
          hasTranslations,
          seo: {
            ...page.seo,
            schema: generateSchema({
              type: 'product',
              payload: {
                name: page.seo.title,
                description: page.seo.description,
                image: page.hero.contentType === 'heroProduct' ? page.hero?.media?.src : undefined,
                url: `${BASE_URL}/products/${params?.slug}`,
                offers: {
                  price: `${page.seo?.priceStartingAt}`,
                },
              },
            }),
          },
        };

        if (page.id === entries.llmLibraryProductPage) {
          const airtableRecords = await airtableService.getRecords();

          const data = await getLLMModelData()
            .then((models) =>
              models.map((model) => ({
                ...model,
                URL: airtableRecords.find(
                  (record) => record.Model?.toString().toLowerCase() === parseName(model.id).toLowerCase()
                )?.URL,
              }))
            )
            .catch(() => []);
          return { ...response, data };
        }
        return response;
      }
    );
  },
  scripts: {
    pipedata: true,
  },
});
