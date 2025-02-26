import 'glider-js/glider.min.css';

import type { GetStaticPaths, NextPage } from 'next';
import { constants, getBlogPage, getBlogPosts } from 'lib/Strapi';

import ComposableArticle from 'ui/components/ComposableArticle';
import ComposableArticleHero from 'ui/components/ComposableArticleHero';
import CtaBanner from 'ui/components/CTABanner';
import ErrorBoundary from 'components/ErrorBoundary';
import SecondaryCarouselSection from 'ui/components/SecondaryCarouselSection';
import SegmentService, { SEGMENT_TRACK_EVENT_NAMES } from 'services/Segment';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import env from 'constants/env';
import { generateSchema } from 'utils/schemas';

type BlogPageProps = Awaited<ReturnType<typeof getBlogPage>> & { preview: boolean };

const BlogPage: NextPage<BlogPageProps> = ({
  ctaBanner,
  relatedArticles,
  contentType,
  preview,
  breadcrumbLink,
  tagline,
  heading,
  copy,
  author,
  authorLinkHref,
  media,
  seo,
  socialShareTitle,
  socialShareDescription,
  socialShareUrl,
  backgroundColor,
  updatedAt,
  useParallax,
  topic,
  ...articleProps
}) => {
  function onSocialShareArticle(network: string) {
    SegmentService.track(SEGMENT_TRACK_EVENT_NAMES.SOCIAL_SHARE, {
      type: network,
      socialShareUrl,
    });
  }

  return (
    <>
      <ErrorBoundary preview={preview}>
        <ComposableArticleHero
          useParallax={useParallax}
          updatedAt={updatedAt}
          topic={topic}
          breadcrumbLink={breadcrumbLink}
          tagline={tagline}
          heading={heading}
          copy={copy}
          author={author}
          authorLinkHref={authorLinkHref}
          media={media}
          backgroundColor={backgroundColor}
          spacingTop='continuous'
        />
      </ErrorBoundary>
      <ErrorBoundary preview={preview}>
        <ComposableArticle
          {...articleProps}
          author={author}
          onSocialShare={onSocialShareArticle}
          socialShareTitle={socialShareTitle}
          socialShareDescription={socialShareDescription}
          socialShareUrl={socialShareUrl}
          extendedLayout={true}
        />
      </ErrorBoundary>
      {relatedArticles.items.length >= constants.BLOG_POSTS_RELATED_ARTICLES_MINIMUM && (
        <ErrorBoundary preview={preview}>
          <SecondaryCarouselSection semanticHeading={false} {...relatedArticles} />
        </ErrorBoundary>
      )}
      <ErrorBoundary preview={preview}>
        <CtaBanner {...ctaBanner} />
      </ErrorBoundary>
    </>
  );
};

export default BlogPage;

export const getStaticProps = defaultGetStaticProps<BlogPageProps>({
  page: 'resources/[slug]',
  getData: ({ params, preview }) =>
    getBlogPage({ slug: params?.slug as string }, { preview }).then((page) => {
      return {
        ...page,
        seo: {
          ...page.seo,
          schema: generateSchema({
            type: 'blog',
            payload: {
              headline: page.heading,
              description: page.seo.description,
              image: page.seo.featuredImage?.src,
              datePublished: new Date(page.seo.publishDate).toISOString().split('T')[0],
              dateModified: new Date(page.seo.updatedDate).toISOString().split('T')[0],
              author: {
                name: page.author?.copy,
              },
            },
          }),
        },
      };
    }),
});

export const getStaticPaths: GetStaticPaths = async () => {
  const documents = await getBlogPosts({ page: 1, pageSize: constants.MAX_BLOG_POSTS_PER_PAGE }, {});

  if (documents.data.length) {
    const paths = documents.data.map((doc) => ({
      params: {
        slug: doc.slug,
      },
    }));

    return {
      fallback: env.generatePagesFallback.resources as boolean | 'blocking',
      paths,
    };
  }

  return { paths: [], fallback: env.generatePagesFallback.resources as boolean | 'blocking' };
};
