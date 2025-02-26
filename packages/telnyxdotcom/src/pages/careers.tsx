import { useEffect } from 'react';
import Api from 'lib/Api';
import type { NextPage } from 'next';
import SolutionsHero from 'ui/components/SolutionsHero';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import { getCareersPage } from 'lib/Contentful';
import About from 'ui/components/About';
import TextCards from 'ui/components/TextCards';
import ErrorBoundary from 'components/ErrorBoundary';
import CustomerStories from 'ui/components/CustomerStories';
import GreenhouseJobBoard, { type Department } from 'ui/components/GreenhouseJobBoard/GreenhouseJobBoard';
import Link from 'ui/components/Link';
import Spinner from 'ui/components/Spinner';
import Paragraph from 'ui/components/Typography/Paragraph';
import Section from 'ui/components/Section';
import Grid from 'ui/components/Grid';
import useAsync, { STATUS } from 'utils/hooks/useAsync';
import { errorLogger } from 'utils/errorHandler/errorLogger';
import constants from 'constants/env';

type CareersPageProps = Awaited<ReturnType<typeof getCareersPage>> & {
  preview: boolean;
};

type DepartamentResponse = {
  departments: Department[];
};

const sectionsComponents = {
  sectionAbout: About,
  sectionTextCards: TextCards,
  sectionCustomerStories: CustomerStories,
};

const fetchDepartaments = () =>
  Api.get<DepartamentResponse>(constants.greenhouse.BASE_URL).then(({ departments }) => departments);

const CareersPage: NextPage<CareersPageProps> = ({ hero, sections, preview }) => {
  const { data: departments, run, status, error } = useAsync<DepartamentResponse['departments']>();

  useEffect(() => {
    async function init() {
      run(fetchDepartaments());
    }
    // once visible, always loaded
    if (status === 'idle') {
      init();
    }

    if (error) {
      errorLogger({ error: new Error('Failed to fetch Jobs'), data: JSON.stringify(error), url: '/careers' });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, error]); // run is a useCallback

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

      {(status === STATUS.pending || status === STATUS.rejected) && (
        <Section
          spacingTop='contrasting'
          spacingBottom='contrasting'
          backgroundColor='cream'
          css={{ textAlign: 'center' }}
        >
          <Grid.Container>
            <Grid.FullWidthItem>
              {status === STATUS.rejected && (
                <Paragraph css={{ color: '$redAlt' }}>
                  Unexpected error on loading job board. Please{' '}
                  <Link htmlAs='button' onClick={() => run(fetchDepartaments())}>
                    try again
                  </Link>
                  .
                </Paragraph>
              )}
              {status === STATUS.pending && <Spinner size='big' title='Loading jobs...' background='dark' />}
            </Grid.FullWidthItem>
          </Grid.Container>
        </Section>
      )}

      {status === STATUS.resolved && departments && <GreenhouseJobBoard departments={departments} />}
    </>
  );
};

export const getStaticProps = defaultGetStaticProps<CareersPageProps>({
  page: 'carreers',
  getData: ({ preview }) => {
    return getCareersPage({ preview }).then((cmsData) => {
      return { ...cmsData };
    });
  },
});

export default CareersPage;
