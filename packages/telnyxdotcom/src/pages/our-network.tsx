import { IMAGES_BASE_PATH } from 'env';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import { getOurNetworkCoveragePage, getOurNetworkCoveragePageData } from 'lib/Contentful';
import { fetchIotCoverageData } from 'lib/Pricing/api';
import ErrorBoundary from 'components/ErrorBoundary';
import type { ScrollSnapLayoutProps } from 'components/Layout/ScrollSnap';
import OurNetworkHero, { type OurNetworkHeroProps } from 'ui/components/OurNetworkHero';
import { type MediaProps } from 'ui/components/Media';

import TextCards from 'ui/components/TextCards';
import CTABanner from 'ui/components/CTABanner';
import CarouselSection from 'ui/components/CarouselSection';
import Resources from 'ui/components/Resources';
import Faq from 'ui/components/Faq';
import 'glider-js/glider.min.css';

const sectionsComponents = {
  sectionTextCards: TextCards,
  sectionFaq: Faq,
  sectionResources: Resources,
  sectionCtaBanner: CTABanner,
  sectionCarousel: CarouselSection,
};

const HERO_IMAGE: MediaProps<'img'> = {
  src: IMAGES_BASE_PATH + '/images/our-network-hero-desktop.webp',
  alt: 'background image network globe',
  mobileSrc: IMAGES_BASE_PATH + '/images/our-network-hero.webp',
};

const SCROLL_SNAP_CONFIG: ScrollSnapLayoutProps['scrollSnap'] = {
  stopPosition: 2 /* features section */,
};

type OurNetworkPageProps = Awaited<ReturnType<typeof getOurNetworkCoveragePage>> & {
  preview: boolean;
  networkMap: OurNetworkHeroProps['networkMap'];
};

const OurNetworkPage = ({ hero, networkMap, sections, preview }: OurNetworkPageProps) => {
  return (
    <>
      <OurNetworkHero {...hero} media={HERO_IMAGE} networkMap={networkMap} scrollSnap />
      {sections.map(({ contentType, ...section }) => {
        const sectionType = contentType as keyof typeof sectionsComponents;

        const PageSection = sectionsComponents[sectionType];
        if (!PageSection) return null;

        return (
          <ErrorBoundary key={section?.id} preview={preview}>
            <PageSection {...section} scrollSnap />
          </ErrorBoundary>
        );
      })}
    </>
  );
};

export const getStaticProps = defaultGetStaticProps({
  page: 'our-network',
  getData: async ({ preview }) => {
    const iot = await fetchIotCoverageData();

    return Promise.all([
      getOurNetworkCoveragePageData({ preview }, { iot }),
      getOurNetworkCoveragePage({ preview }),
    ]).then(([networkMap, pageResponse]) => ({
      networkMap,
      scrollSnap: SCROLL_SNAP_CONFIG,
      ...pageResponse,
    }));
  },
});

export default OurNetworkPage;
