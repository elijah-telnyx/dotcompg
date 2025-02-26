import CategoryHero from 'ui/components/CategoryHero';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import { getSolutionsOverviewPage, getUseCaseOptions } from 'lib/Contentful';
import type { SolutionsOverviewPage } from 'lib/Contentful/types';
import CategoryHeader from 'ui/components/CategoryHeader';
import CTABanner from 'ui/components/CTABanner';
import GridCards from 'ui/components/GridCards';
import ErrorBoundary from 'components/ErrorBoundary';
import { addPageToCopy } from 'lib/Contentful/utils';
import { getUseCases } from 'services/publicApiService';

type SolutionsOverviewPageProps = Awaited<ReturnType<typeof getSolutionsOverviewPage>> & {
  preview: boolean;
  page?: string;
};

const sectionsComponents = {
  sectionMediaCardList: CategoryHeader,
  sectionCtaBanner: CTABanner,
  sectionGridCards: GridCards,
};

const SolutionsOverview = ({ hero, sections, preview }: SolutionsOverviewPageProps) => {
  return (
    <>
      <ErrorBoundary preview={preview}>
        <CategoryHero {...hero} />
      </ErrorBoundary>
      {sections?.map(({ contentType, ...section }) => {
        const sectionType = contentType as keyof typeof sectionsComponents;

        const PageSection = sectionsComponents[sectionType];
        if (!PageSection) return null;

        return (
          <ErrorBoundary key={section?.id} preview={preview}>
            <PageSection {...section} {...(contentType === 'sectionGridCards' && { getUseCases })} />
          </ErrorBoundary>
        );
      })}
    </>
  );
};

const page = 'solutions';

export const getStaticProps = defaultGetStaticProps<SolutionsOverviewPage>({
  page,
  getData: ({ preview, params = {} }) => {
    if (params.page === '1') {
      return Promise.resolve({
        notFound: true,
      });
    }

    return Promise.all([getSolutionsOverviewPage({ preview }), getUseCaseOptions(params, { preview })]).then(
      ([{ hero, ...pageData }, useCases]) => {
        const { page = '1' } = params;
        const appendPage = addPageToCopy(params.page);

        return {
          ...pageData,
          hero: {
            ...hero,
            heading: appendPage(hero.heading, { format: 'parenteses', hiddenPage: true }),
          },
          page,
          sections: pageData.sections.map((section) => {
            if (section.contentType === 'sectionGridCards') {
              return {
                ...section,
                heading: appendPage(section.heading, { format: 'after', hiddenPage: true }),
                items: useCases.items,
                ...(params.topic && {
                  filter: {
                    ...section.filter,
                    value: params.topic,
                  },
                }),
                totalPages: useCases.totalPages,
              };
            }
            return section;
          }),
        };
      }
    );
  },
});

export default SolutionsOverview;
