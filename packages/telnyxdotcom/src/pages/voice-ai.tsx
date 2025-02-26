import ControlledFormHero from 'components/ControlledFormHero';
import VoiceAiHero from 'components/VoiceAiHero';
import ErrorBoundary from 'components/ErrorBoundary';
import 'glider-js/glider.min.css';
import { getVoiceAiPage } from 'lib/Contentful';
import { getVoiceAiSetupFormPage } from 'lib/Static';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import featureFlippers from 'constants/featureFlippers';

const About = dynamic(() => import('ui/components/About'));
const CTABanner = dynamic(() => import('ui/components/CTABanner'));
const CarouselSection = dynamic(() => import('ui/components/CarouselSection'));
const ColorfulCards = dynamic(() => import('ui/components/ColorfulCards'));
const CustomerLogos = dynamic(() => import('ui/components/CustomerLogos'));
const CustomerStories = dynamic(() => import('ui/components/CustomerStories'));
const MediaCardList = dynamic(() => import('ui/components/MediaCardList'));
const Faq = dynamic(() => import('ui/components/Faq'));
const HowItWorks = dynamic(() => import('ui/components/HowItWorks'));
const Resources = dynamic(() => import('ui/components/Resources'));
const TextCards = dynamic(() => import('ui/components/TextCards'));
const MarkdownSection = dynamic(() => import('ui/components/MarkdownSection'));
const FeaturesSection = dynamic(() => import('components/VoiceAI/components/FeaturesSection'));

type VoiceAiPageProps = Awaited<ReturnType<typeof getVoiceAiPage>> & { preview: boolean } & {
  formSection: Awaited<ReturnType<typeof getVoiceAiSetupFormPage>>;
};

const sectionsComponents = {
  sectionAbout: About,
  sectionCarousel: CarouselSection,
  sectionCtaBanner: CTABanner,
  sectionCustomerLogos: CustomerLogos,
  sectionCustomerStories: CustomerStories,
  sectionMediaCardList: MediaCardList,
  sectionFaq: Faq,
  sectionColorfulCards: ColorfulCards,
  sectionHowItWorks: HowItWorks,
  sectionResources: Resources,
  sectionTextCards: TextCards,
  sectionMarkdown: MarkdownSection,
  sectionTabs: FeaturesSection,
};

const VoiceAiPage: NextPage<VoiceAiPageProps> = ({ formSection, sections, preview }) => {
  return (
    <>
      {featureFlippers.DOTCOM_3853_VOICE_AI_INTERACTIVE ? <VoiceAiHero /> : <ControlledFormHero {...formSection} />}

      {sections?.map(({ contentType, ...section }) => {
        const sectionType = contentType as keyof typeof sectionsComponents;
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

export const getStaticProps = defaultGetStaticProps<VoiceAiPageProps>({
  page: 'voice-ai',
  getData: ({ preview }) =>
    getVoiceAiPage({ preview }).then((data) => ({ ...data, preview, formSection: getVoiceAiSetupFormPage() })),
});

export default VoiceAiPage;
