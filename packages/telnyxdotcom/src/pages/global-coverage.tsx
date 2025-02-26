import { getGlobalCoveragePage } from 'lib/Contentful';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import ErrorBoundary from 'components/ErrorBoundary';

import OverviewHero from 'ui/components/OverviewHero/OverviewHero';

import About from 'ui/components/About/About';
import CoverageTableSection from 'ui/components/CoverageTableSection';
import CTABanner from 'ui/components/CTABanner/CTABanner';
import ColorfulCards from 'ui/components/ColorfulCards';
import CarouselSection from 'ui/components/CarouselSection/CarouselSection';

import 'glider-js/glider.min.css';

const page = 'global-coverage';

type GlobalCoveragePageProps = Awaited<ReturnType<typeof getGlobalCoveragePage>>;

const sectionsComponents = {
  sectionAbout: About,
  sectionPricingTable: CoverageTableSection,
  sectionCtaBanner: CTABanner,
  sectionColorfulCards: ColorfulCards,
  sectionCarousel: CarouselSection,
};

const GlobalCoveragePage = ({ hero, sections, tableData, preview }: GlobalCoveragePageProps & { preview: boolean }) => {
  return (
    <>
      <OverviewHero {...hero} />
      {sections?.map(({ contentType, ...section }) => {
        const sectionType = contentType as keyof typeof sectionsComponents;
        const PageSection = sectionsComponents[sectionType];
        if (!PageSection) return null;

        if (sectionType === 'sectionPricingTable') {
          return (
            <ErrorBoundary key={section?.id} preview={preview}>
              <CoverageTableSection {...tableData} />
            </ErrorBoundary>
          );
        }

        return (
          <ErrorBoundary key={section?.id} preview={preview}>
            <PageSection {...section} />
          </ErrorBoundary>
        );
      })}
    </>
  );
};

export const getStaticProps = defaultGetStaticProps<GlobalCoveragePageProps>({
  page,
  getData: getGlobalCoveragePage,
});

export default GlobalCoveragePage;
