import CustomerLogosHomePage from 'ui/components/CustomerLogos/CustomerLogosHomePage';
import DeveloperFocus from 'components/Home/DeveloperFocus';
import InteractiveDeveloperFocus from 'components/Home/InteractiveDeveloperFocus';
import ErrorBoundary from 'components/ErrorBoundary';
import { GlobalContext } from 'pages/_app';
import Head from 'next/head';
import HomeHero from 'components/Home/HomeHero';
import FreshHomeHero from 'components/FreshHome/FreshHomeHero';
import FreshHomeProductsSection from 'components/FreshHome/ProductsSection';
import InferenceSection from 'components/FreshHome/InferenceSection';
import VoiceAiSection from 'components/FreshHome/VoiceAiSection';
import OurNetworkSection from 'components/FreshHome/OurNetworkSection';
import IotSection from 'components/FreshHome/IotSection';
import HomePageCTASection from 'ui/components/HomePageCtaSection';
import HomePageCTADarkSection from 'ui/components/HomePageCtaDarkSection';
import LinkImageRowSection from 'ui/components/LinkImageRowSection/LinkImageRowSection';
import MissionControlSection from 'ui/components/MissionControlSection';
import DocSection from 'ui/components/DocSection';
import CustomerStoriesSection from 'components/FreshHome/CustomerStoriesSection';
import BlogSection from 'components/FreshHome/BlogSection';
import ProductsSection from 'components/Home/ProductsSection';
import SegmentService from 'services/Segment/SegmentService';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import { getHomePageData, getInteractiveHomePageData, getFreshHomePageData } from 'lib/Contentful';
import { getCarouselItems } from 'lib/Contentful/methods';
import { useContext } from 'react';
import type { ScrollSnapLayoutProps } from 'components/Layout/ScrollSnap';
import featureFlippers from 'constants/featureFlippers';
import entries from 'lib/Contentful/entries';
import CustomerLogos from 'ui/components/CustomerLogos';

type HomePageProps = Awaited<ReturnType<typeof getHomePageData>> & { preview: boolean };
type FreshHomePageProps = Awaited<ReturnType<typeof getFreshHomePageData>> & { preview: boolean };

const HomePage = ({ hero, sections, preview }: HomePageProps) => {
  const { campaign } = useContext(GlobalContext);

  function onSubmitEmail(event: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);

    SegmentService.identify({
      email: formData.get('email'),
      address: {
        state: null,
        country: null,
        postalCode: null,
        city: null,
      },
      firstName: null,
      first_name: null,
      name: null,
      campaign,
    });
  }

  return (
    <>
      <Head>
        {/* https://telnyx.atlassian.net/browse/DOTCOM-2682 */}
        <meta name='naver-site-verification' content='7cd24e08cc7bf643260291953760766e' />
      </Head>
      <HomeHero {...hero} />
      <ErrorBoundary preview={preview}>
        <CustomerLogosHomePage {...sections.customerLogos} />
      </ErrorBoundary>
      <ErrorBoundary preview={preview}>
        {featureFlippers.DOTCOM_3518_HOMEPAGE_SCROLL_SNAP_INTERACTIVE ? (
          <InteractiveDeveloperFocus {...sections.developerFocus} />
        ) : (
          <DeveloperFocus {...sections.developerFocus} />
        )}
      </ErrorBoundary>
      <ErrorBoundary preview={preview}>
        <ProductsSection {...sections.products} />
      </ErrorBoundary>
      <ErrorBoundary preview={preview}>
        <LinkImageRowSection {...sections.useCases} />
      </ErrorBoundary>
      <ErrorBoundary preview={preview}>
        <HomePageCTASection {...{ ...sections.cta, form: { ...sections.cta.form, onSubmit: onSubmitEmail } }} />
      </ErrorBoundary>
    </>
  );
};

const FreshHomePage = ({ hero, sections, preview }: FreshHomePageProps) => {
  const { campaign } = useContext(GlobalContext);

  function onSubmitEmail(event: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);

    SegmentService.identify({
      email: formData.get('email'),
      address: {
        state: null,
        country: null,
        postalCode: null,
        city: null,
      },
      firstName: null,
      first_name: null,
      name: null,
      campaign,
    });
  }

  return (
    <>
      <Head>
        {/* https://telnyx.atlassian.net/browse/DOTCOM-2682 */}
        <meta name='naver-site-verification' content='7cd24e08cc7bf643260291953760766e' />
      </Head>
      <ErrorBoundary preview={preview}>
        <FreshHomeHero {...hero} />
      </ErrorBoundary>
      <ErrorBoundary preview={preview}>
        <FreshHomeProductsSection {...sections.products} />
      </ErrorBoundary>
      <ErrorBoundary preview={preview}>
        <CustomerLogos
          {...sections.customerLogos}
          css={{
            '& img': {
              height: 32,
            },
          }}
        />
      </ErrorBoundary>
      <ErrorBoundary preview={preview}>
        <VoiceAiSection {...sections.voiceAi} />
      </ErrorBoundary>
      <ErrorBoundary preview={preview}>
        <InferenceSection {...sections.inference} />
      </ErrorBoundary>
      <ErrorBoundary preview={preview}>
        <OurNetworkSection {...sections.ourNetwork} />
      </ErrorBoundary>
      <ErrorBoundary preview={preview}>
        <IotSection {...sections.iot} />
      </ErrorBoundary>
      <ErrorBoundary preview={preview}>
        <MissionControlSection {...sections.missionControl} />
      </ErrorBoundary>
      <ErrorBoundary preview={preview}>
        <DocSection {...sections.doc} />
      </ErrorBoundary>
      <ErrorBoundary preview={preview}>
        <CustomerStoriesSection {...sections.customerStories} />
      </ErrorBoundary>
      <ErrorBoundary preview={preview}>
        <BlogSection {...sections.blog} />
      </ErrorBoundary>
      <ErrorBoundary preview={preview}>
        <HomePageCTADarkSection {...{ ...sections.cta, form: { ...sections.cta.form, onSubmit: onSubmitEmail } }} />
      </ErrorBoundary>
    </>
  );
};

export const getStaticProps = defaultGetStaticProps({
  page: 'homepage',
  getData: async ({ preview }) => {
    if (featureFlippers.DOTCOM_3603_FRESH_HOMEPAGE) {
      const pageData = await getFreshHomePageData({ preview });
      pageData.sections.customerStories.items = await getCarouselItems({
        carouselEntryId: entries.homepageCarouselEntryId,
      });

      return {
        ...pageData,
      };
    }

    if (featureFlippers.DOTCOM_3518_HOMEPAGE_SCROLL_SNAP_INTERACTIVE) {
      const pageData = await getInteractiveHomePageData({ preview });

      return {
        ...pageData,
        scrollSnap: {
          scope: {
            startElementId: pageData.sections.developerFocus.items[0].id,
            stopElementId: pageData.sections.developerFocus.items.at(-1)?.id,
          },
        } as ScrollSnapLayoutProps['scrollSnap'],
      };
    }

    return getHomePageData({ preview });
  },
});

export default featureFlippers.DOTCOM_3603_FRESH_HOMEPAGE ? FreshHomePage : HomePage;
