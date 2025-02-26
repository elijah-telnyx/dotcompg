import 'glider-js/glider.min.css';

import type { GetStaticPaths, NextPage } from 'next';
import env from 'constants/env';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';

import { getGlossaryPageData, getGlossaryOverViewData, constants } from 'lib/AirTable/learn-ai';
import ErrorBoundary from 'components/ErrorBoundary';
import ComposableArticle from 'ui/components/ComposableArticle';
import LearnAiHero from 'ui/components/LearnAiHero';
import CtaBanner from 'ui/components/CTABanner';
import { generateSchema } from 'utils/schemas';
import Grid from 'ui/components/Grid';
import Caption from 'ui/components/Typography/Caption';
import Link from 'ui/components/Link';

type GloassaryPageProps = Awaited<ReturnType<typeof getGlossaryPageData>> & { preview: boolean };

const GlossaryPage: NextPage<GloassaryPageProps> = ({
  title,
  metaDescription,
  tag,
  media,
  sections,
  breadcrumb,
  form,
  socialShareTitle,
  socialShareDescription,
  socialShareUrl,
  jumpLinks,
  author,
  authorLinkHref,
  ctaButtons,
  preview,
}) => {
  return (
    <>
      <ErrorBoundary preview={preview}>
        <LearnAiHero
          breadcrumbLink={breadcrumb}
          tagline={tag}
          heading={title || ''}
          copy={metaDescription}
          author={author}
          authorLinkHref={authorLinkHref}
          media={media}
          isEditor={true}
        />
      </ErrorBoundary>

      <ErrorBoundary preview={preview}>
        <ComposableArticle
          sections={sections}
          form={form}
          jumplinks={jumpLinks}
          author={author}
          socialShareTitle={socialShareTitle}
          socialShareDescription={socialShareDescription}
          socialShareUrl={socialShareUrl}
          spacingBottom='continuous'
        />
      </ErrorBoundary>

      <Grid.Container css={{ marginBlockEnd: '$small', typography: '$p.caption', color: 'gray' }}>
        <Grid.Item css={{ gridColumn: 'span 8 / -1' }}>
          <Caption>
            This content was generated with the assistance of AI. Our AI{' '}
            <Link href='https://telnyx.com/learn-ai/promptchain-ai'>prompt chain</Link> workflow is carefully{' '}
            <Link href='https://telnyx.com/learn-ai/grounding-ai'>grounded</Link> and preferences .gov and .edu
            citations when available.{' '}
            <b>
              All content is reviewed by a Telnyx employee to ensure accuracy, relevance, and a high standard of
              quality.
            </b>
          </Caption>
        </Grid.Item>
      </Grid.Container>

      <ErrorBoundary preview={preview}>
        <CtaBanner backgroundColor='green' heading='Sign up and start building.' ctaButtons={ctaButtons} />
      </ErrorBoundary>
    </>
  );
};

export default GlossaryPage;

export const getStaticProps = defaultGetStaticProps<GloassaryPageProps>({
  page: 'resources/[slug]',
  getData: async ({ params }) => {
    return getGlossaryPageData(params?.slug as string).then((page) => {
      return {
        ...page,
        seo: {
          ...page.seo,
          schema: generateSchema({
            type: 'blog',
            payload: {
              headline: page.seo.heading,
              description: page.seo.description,
              image: page.seo.featuredImage?.src,
              datePublished: new Date(page.seo.date).toISOString().split('T')[0],
              dateModified: new Date(page.seo.date).toISOString().split('T')[0],
              author: {
                name: page.seo.author?.copy,
              },
            },
          }),
        },
      };
    });
  },
});

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getGlossaryOverViewData({
    page: 1,
    limitPerPage: constants.MAX_GLOSSARY_POSTS_PER_PAGE,
    options: { sort: [{ field: 'slug' }] },
  });

  if (entries.articles.items.length) {
    const paths = entries.articles.items
      .map((entry) => ({
        params: {
          slug: entry.id,
        },
      }))
      .filter((entry) => entry.params.slug);

    return {
      fallback: env.generatePagesFallback.learnAi as boolean | 'blocking',
      paths,
    };
  }

  return { paths: [], fallback: env.generatePagesFallback.learnAi as boolean | 'blocking' };
};
