import 'glider-js/glider.min.css';
import ErrorBoundary from 'components/ErrorBoundary';
import { getLLMLibraryPage } from 'lib/Contentful';
import { parseName, type LLMModel } from 'components/LLMComparisonTableSection/utils';
import LLMComparisonTableSection from 'components/LLMComparisonTableSection';
import airtableService, { type AirtableLLMRecord } from 'services/airtableService';
import { parseAirtableSEO, parseAirtableHeader, parseHowItWorksItems } from 'lib/Static/data/llm-library';
import { getLLMModelData } from 'services/telnyxApiService';
import ProductHero from 'ui/components/ProductHero';
import HowItWorks from 'ui/components/HowItWorks';
import Resources from 'ui/components/Resources';
import { SectionAbout, SectionFAQ } from 'components/LLMLibrarySections';
import CtaBanner from 'ui/components/CTABanner';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import { formatDateISO } from 'lib/Contentful/utils';
import { errorLogger } from 'utils/errorHandler/errorLogger';
import DemoSection from 'components/DemoSection';

const indexPage = 'llm-library';
const page = 'llm-library/[slug]';
const llmSectionId = 'llm-library-comparison-table';
const defaultModelId = 'meta-llama/Meta-Llama-3.1-70B-Instruct';

export const excludedModels = ['openai'];

type LLMLibraryPageProps = Awaited<ReturnType<typeof getLLMLibraryPage>> & {
  preview: boolean;
  data: LLMModel[];
  airtableData: AirtableLLMRecord;
  airtableRecords: AirtableLLMRecord[];
};

const sectionsComponents = {
  sectionPricingTable: LLMComparisonTableSection,
  sectionDemo: DemoSection,
  sectionHowItWorks: HowItWorks,
  sectionResources: Resources,
  sectionCtaBanner: CtaBanner,
};

const LLMLibrarySlugPage = ({ hero, sections, data, preview, airtableData, airtableRecords }: LLMLibraryPageProps) => {
  return (
    <>
      <ErrorBoundary preview={preview}>
        <ProductHero {...hero} />
      </ErrorBoundary>
      <ErrorBoundary preview={preview}>
        <SectionAbout record={airtableData} records={airtableRecords} />
      </ErrorBoundary>
      {sections?.map(({ contentType, ...section }) => {
        const sectionType = contentType as keyof typeof sectionsComponents;
        const PageSection = sectionsComponents[sectionType];
        if (!PageSection) return null;

        return (
          <ErrorBoundary key={section?.id} preview={preview}>
            {section.id === llmSectionId ? <PageSection {...section} data={data} /> : <PageSection {...section} />}
          </ErrorBoundary>
        );
      })}
      <ErrorBoundary preview={preview}>
        <SectionFAQ markdown={airtableData.FAQs} />
      </ErrorBoundary>
    </>
  );
};

export const getStaticPaths = () => ({ paths: [], fallback: 'blocking' });

export const getStaticProps = defaultGetStaticProps<LLMLibraryPageProps>({
  page,
  getData: async ({ preview, params }) => {
    const contentfulData = await getLLMLibraryPage({ preview });
    const [airtableData] = await airtableService.getRecords({
      filterByFormula: `SEARCH("${params?.slug}",{URL})`,
      maxRecords: 1,
    });

    // no airtable record found, return 404
    if (airtableData === undefined) return { notFound: true };

    const atSeo = parseAirtableSEO(airtableData as unknown as AirtableLLMRecord);
    const atHero = parseAirtableHeader(airtableData as unknown as AirtableLLMRecord);
    const atHowItWorksItems = parseHowItWorksItems(airtableData as unknown as AirtableLLMRecord);

    const airtableRecords = await airtableService.getRecords();

    const llmTableData = await getLLMModelData()
      .then((models) =>
        models.map((model) => ({
          ...model,
          URL: airtableRecords.find(
            (record) => record.Model?.toString().toLowerCase() === parseName(model.id).toLowerCase()
          )?.URL,
        }))
      )
      .catch(() => []);

    const selectedModel = llmTableData.find(
      (model) => parseName(model.id) === airtableData.Model && !excludedModels.includes(model.organization)
    );

    const defaultValues = { aiModel: selectedModel?.id || defaultModelId };

    const revisedSections = contentfulData.sections.map((section) => {
      switch (section.contentType) {
        case 'sectionHowItWorks':
          return { ...section, items: atHowItWorksItems };
        case 'sectionDemo':
          return { ...section, defaultValues };
        default:
          return section;
      }
    });

    const enrichedData = {
      ...contentfulData,
      seo: { ...contentfulData.seo, ...atSeo },
      hero: { ...contentfulData.hero, ...atHero },
      data: llmTableData,
      sections: revisedSections,
      airtableData,
      airtableRecords,
    };
    return enrichedData;
  },
});

export const getSitemapData = async () => {
  const airtableRecords = await airtableService.getRecords();

  return getLLMModelData()
    .then((models) =>
      models
        .map((model) => {
          const record = airtableRecords.find(
            (record) => record.Model?.toString().toLowerCase() === parseName(model.id).toLowerCase()
          );

          return {
            lastmod: formatDateISO(model.created),
            url: (record?.URL ? `/${indexPage}/${record.URL.toString().trim()}` : undefined) as string,
          };
        })
        .filter((item) => item.url && item.lastmod)
    )
    .catch((error) => {
      errorLogger({
        error: new Error('Failed to get LLM Library Sitemap Data'),
        url: '/llm-library/[slug]',
        data: JSON.stringify(error, undefined, 2),
      });

      return [];
    });
};

export default LLMLibrarySlugPage;
