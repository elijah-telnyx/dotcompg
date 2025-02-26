import "glider-js/glider.min.css";
import dynamic from "next/dynamic";
import { defaultGetStaticProps } from "utils/pageGeneration/defaultGetStaticProps";
import { getHomepage } from "lib/Contentful";
import HomeHero from "components/HomeHero";
import JoinWaitlistCTA from "components/JoinWaitlistCTA";
import CTABanner from "components/CTABanner";

const General = dynamic(() => import("ui/components/About"));
const HowItWorks = dynamic(() => import("ui/components/HowItWorks"));
const Faq = dynamic(() => import("ui/components/Faq"));
const Carousel = dynamic(() => import("ui/components/CarouselSection"));

type HomePageProps = Awaited<ReturnType<typeof getHomepage>> & {
  hero: any;
  preview: boolean;
};

const sectionsComponents = {
  sectionAbout: General,
  sectionCtaBanner: CTABanner,
  sectionFaq: Faq,
  sectionHowItWorks: HowItWorks,
  sectionCarousel: Carousel,
};

const HomePage = ({ hero, sections }: HomePageProps) => {
  return (
    <>
      <HomeHero {...hero} />
      {sections?.map(({ contentType, ...section }) => {
        const sectionType = contentType as keyof typeof sectionsComponents;
        const PageSection = sectionsComponents[sectionType];
        if (!PageSection) return null;

        return <PageSection {...section} />;
      })}
      <JoinWaitlistCTA />
    </>
  );
};

export const getStaticProps = defaultGetStaticProps({
  page: "homepage",
  getData: async ({ preview }) => getHomepage({ preview }),
});

export default HomePage;
