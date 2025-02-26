import 'glider-js/glider.min.css';

import { getCustomerStoryPage, getCustomerStoryPages } from 'lib/Contentful';

import Carousel from 'ui/components/CarouselSection';
import ColorfulCards from 'ui/components/ColorfulCards';
import CtaBanner from 'ui/components/CTABanner';
import ErrorBoundary from 'components/ErrorBoundary';
import MarkdownSection from 'ui/components/MarkdownSection';
import CustomerStories from 'ui/components/CustomerStories';
import type { NextPage } from 'next';
import SolutionsHero from 'ui/components/SolutionsHero';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import env from 'constants/env';

type CustomerStoryPageProps = Awaited<ReturnType<typeof getCustomerStoryPage>> & { preview: boolean };

const sectionsComponents = {
  sectionCarousel: Carousel,
  sectionColorfulCards: ColorfulCards,
  sectionCtaBanner: CtaBanner,
  sectionMarkdown: MarkdownSection,
  sectionCustomerStories: CustomerStories,
};

const CustomerStoryPage: NextPage<CustomerStoryPageProps> = ({ hero: { contentType, ...hero }, sections, preview }) => {
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

export default CustomerStoryPage;

type Paths = { params: { slug: string; locale?: string } }[];
export const getStaticPaths = async () => {
  const entries = await getCustomerStoryPages();
  if (entries) {
    return {
      fallback: env.generatePagesFallback.customerStories,
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

export const getStaticProps = defaultGetStaticProps<CustomerStoryPageProps>({
  page: 'customer-stories/[slug]',
  getData: ({ params, preview }) => getCustomerStoryPage({ slug: params?.slug as string }, { preview }),
});
