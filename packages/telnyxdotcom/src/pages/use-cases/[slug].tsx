import 'glider-js/glider.min.css';

import { getUseCasePage, getUseCasePages } from 'lib/Contentful';

import CalculatorSection from 'components/CalculatorSection';
import ErrorBoundary from 'components/ErrorBoundary';
import env from 'constants/env';
import type { NextPage } from 'next';
import About from 'ui/components/About';
import CtaBanner from 'ui/components/CTABanner';
import Carousel from 'ui/components/CarouselSection';
import ColorfulCards from 'ui/components/ColorfulCards';
import Faq from 'ui/components/Faq';
import Resources from 'ui/components/Resources';
import SolutionsHero from 'ui/components/SolutionsHero';
import TextCards from 'ui/components/TextCards';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import { BASE_URL } from 'env';
import { generateSchema } from 'utils/schemas';

type UseCaseSlugPageProps = Awaited<ReturnType<typeof getUseCasePage>> & { preview: boolean };

const sectionsComponents = {
  sectionAbout: About,
  sectionCarousel: Carousel,
  sectionColorfulCards: ColorfulCards,
  sectionCtaBanner: CtaBanner,
  sectionFaq: Faq,
  sectionResources: Resources,
  sectionTextCards: TextCards,
  sectionCalculator: CalculatorSection,
};

const UseCaseSlugPage: NextPage<UseCaseSlugPageProps> = ({ hero: { contentType, ...hero }, sections, preview }) => {
  return (
    <>
      <ErrorBoundary preview={preview}>
        <SolutionsHero {...hero} />
      </ErrorBoundary>
      {sections?.map(({ contentType, ...section }) => {
        const sectionType = contentType;

        const PageSection = sectionsComponents[sectionType as keyof typeof sectionsComponents];

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

export default UseCaseSlugPage;

type Paths = { params: { slug: string; locale?: string } }[];
export const getStaticPaths = async () => {
  const entries = await getUseCasePages();
  if (entries) {
    return {
      fallback: env.generatePagesFallback.useCases as boolean | 'blocking',
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

export const getStaticProps = defaultGetStaticProps<UseCaseSlugPageProps>({
  page: 'use-case/[slug]',
  getData: ({ params, preview }) =>
    getUseCasePage({ slug: params?.slug as string }, { preview }).then(async (page) => {
      return {
        ...page,
        seo: {
          ...page.seo,
          schema: generateSchema({
            type: 'useCase',
            payload: {
              name: page.seo.title,
              description: page.seo.description,
              url: `${BASE_URL}/use-cases/${params?.slug}`,
            },
          }),
        },
      };
    }),
});
