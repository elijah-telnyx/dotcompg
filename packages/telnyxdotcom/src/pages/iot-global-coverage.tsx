import ErrorBoundary from 'components/ErrorBoundary';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import generateTableData from 'services/iotCoverageService';
import { getIotGlobalCoveragePage } from 'lib/Contentful';
import GlobalWirelessCoverageTable from 'components/GlobalWirelessCoverageTable';

import About from 'ui/components/About/About';
import CTABanner from 'ui/components/CTABanner/CTABanner';
import ProductHero from 'ui/components/ProductHero';
import ColorfulCards from 'ui/components/ColorfulCards';
import CarouselSection from 'ui/components/CarouselSection/CarouselSection';
import 'glider-js/glider.min.css';
import { simCardCountryData } from 'lib/Static/data';

const sectionsComponents = {
  sectionAbout: About,
  sectionCtaBanner: CTABanner,
  sectionColorfulCards: ColorfulCards,
  sectionCarousel: CarouselSection,
  sectionPricingTable: GlobalWirelessCoverageTable,
};

type IotGlobalCoveragePageProps = Awaited<ReturnType<typeof getIotGlobalCoveragePage>> & {
  preview: boolean;
  coverageData: Awaited<ReturnType<typeof generateTableData>>;
};
const IotGlobalCoveragePage = ({ hero, sections, preview, coverageData }: IotGlobalCoveragePageProps) => {
  return (
    <>
      <ErrorBoundary preview={preview}>
        <ProductHero {...hero} />
      </ErrorBoundary>
      {sections?.map(({ contentType, ...section }) => {
        const sectionType = contentType as keyof typeof sectionsComponents;

        if (sectionType === 'sectionPricingTable') {
          const data = coverageData.sections.globalCoverageTable;

          const coverageTableSectionProps = data.tabs[0];
          const enrichedTableBodyData = coverageTableSectionProps.data.body.map((row) => {
            // check simCardCountryData for a match based on the alpha2 and if true add the url
            const hasUrl = simCardCountryData.find((i) => i.country_code === row.country.alpha2);

            if (hasUrl) {
              return { ...row, url: `/sim-cards/${hasUrl.slug}` };
            }
            return row;
          });

          // specific destructured data for the IoT table
          const tableData = {
            tabs: [
              {
                ...coverageTableSectionProps,
                data: { ...coverageTableSectionProps.data, body: enrichedTableBodyData },
              },
            ],
          };
          return (
            <ErrorBoundary key={section?.id} preview={preview}>
              <GlobalWirelessCoverageTable {...section} {...tableData} />
            </ErrorBoundary>
          );
        }

        const PageSection = sectionsComponents[sectionType];
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

const page = 'iot-global-coverage';

export const getStaticProps = defaultGetStaticProps<IotGlobalCoveragePageProps>({
  page,
  getData: async () => {
    const pageData = await getIotGlobalCoveragePage();
    const coverageData = await generateTableData();
    return { ...pageData, coverageData };
  },
});

export default IotGlobalCoveragePage;
