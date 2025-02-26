import 'glider-js/glider.min.css';

import { getIndustryPage, getIndustryPages } from 'lib/Contentful';

import About from 'ui/components/About';
import Carousel from 'ui/components/CarouselSection';
import CtaBanner from 'ui/components/CTABanner';
import CustomerLogos from 'ui/components/CustomerLogos';
import ColorfulCards from 'ui/components/ColorfulCards';
import ErrorBoundary from 'components/ErrorBoundary';
import type { NextPage } from 'next';
import Resources from 'ui/components/Resources';
import SolutionsHero from 'ui/components/SolutionsHero';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import env from 'constants/env';

type IndustrySlugPageProps = Awaited<ReturnType<typeof getIndustryPage>> & { preview: boolean };

const sectionsComponents = {
  sectionAbout: About,
  sectionCarousel: Carousel,
  sectionCtaBanner: CtaBanner,
  sectionColorfulCards: ColorfulCards,
  sectionCustomerLogos: CustomerLogos,
  sectionResources: Resources,
};

const IndustrySlugPage: NextPage<IndustrySlugPageProps> = ({ hero: { contentType, ...hero }, sections, preview }) => {
  return (
    <>
      <ErrorBoundary preview={preview}>
        <SolutionsHero {...hero} />
      </ErrorBoundary>
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

export default IndustrySlugPage;

type Paths = { params: { slug: string; locale?: string } }[];
export const getStaticPaths = async () => {
  const entries = await getIndustryPages();
  if (entries) {
    return {
      fallback: env.generatePagesFallback.solutions as boolean | 'blocking',
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

export const getStaticProps = defaultGetStaticProps<IndustrySlugPageProps>({
  page: 'solutions/[slug]',
  getData: ({ params, preview }) => getIndustryPage({ slug: params?.slug as string }, { preview }),
});
