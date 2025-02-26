import type { NextPage } from 'next';
import ErrorBoundary from 'components/ErrorBoundary';
import 'glider-js/glider.min.css';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import { getGlossaryOverViewData, constants } from 'lib/AirTable/learn-ai';
import { ArticlesList } from 'ui/components/ArticlesListSection';
import Grid from 'ui/components/Grid';
import Section from 'ui/components/Section';
import Heading from 'ui/components/Typography/Heading';
import Markdown from 'markdown-to-jsx';

type GlossaryOverViewPageProps = Awaited<ReturnType<typeof getGlossaryOverViewData>> & {
  preview: boolean;
};

const GlossaryOverViewPage: NextPage<GlossaryOverViewPageProps> = ({ heading, articles, preview }) => {
  return (
    <>
      <ErrorBoundary preview={preview}>
        <Section backgroundColor='black'>
          <Grid.Container css={{ rowGap: '$small', '@medium': { rowGap: '$large' } }}>
            <Grid.Item xs={12} medium={8} large={8} xl={8}>
              <Heading level={2} dark={true} htmlAs='h1'>
                <Markdown>{heading}</Markdown>
              </Heading>
            </Grid.Item>
          </Grid.Container>
        </Section>
      </ErrorBoundary>

      <ErrorBoundary preview={preview}>
        <Section spacingBottom='continuous'>
          <Grid.Container css={{ rowGap: '$xxl' }}>
            <ArticlesList {...articles} />
          </Grid.Container>
        </Section>
      </ErrorBoundary>
    </>
  );
};

export default GlossaryOverViewPage;

export const getStaticProps = defaultGetStaticProps<GlossaryOverViewPageProps>({
  page: 'resources',
  getData: async ({ params }) => {
    if (Number(params?.page) === 1) {
      return { notFound: true };
    }

    const query = {
      page: Number(params?.page) || 1,
      limitPerPage: constants.MAX_GLOSSARY_POSTS_PER_PAGE,
      options: {
        fields: ['slug', 'title', 'metaDescription', 'tag', 'tagColor', 'authorName', 'authorImage'],
        sort: [{ field: 'Last Mod', direction: 'desc' as const }],
        filterByFormula: `And({Live} = 1)`,
      },
    };

    return getGlossaryOverViewData(query);
  },
});
