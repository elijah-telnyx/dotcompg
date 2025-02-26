import { useState } from 'react';
import type { NextPage } from 'next';
import ArticlesListSection from 'components/ControlledArticlesListSection';
import ErrorBoundary from 'components/ErrorBoundary';
import ResourcesSearchSection from 'components/ResourcesSearchSection';
import { constants } from 'lib/Contentful';
import { getBlogOverviewPage } from 'lib/Strapi';
import FeatureCarouselSection from 'ui/components/FeatureCarouselSection';
import SecondaryCarouselSection from 'ui/components/SecondaryCarouselSection';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import MarketoFormSection from 'ui/components/FormSection/MarketoFormSection/MarketoFormSection';
import 'glider-js/glider.min.css';

type BlogOverviewPageProps = Awaited<ReturnType<typeof getBlogOverviewPage>> & {
  preview: boolean;
  topic?: string;
};

const BlogOverviewSection = ({
  sections,
  articles,
  topic,
}: Pick<BlogOverviewPageProps, 'sections' | 'articles' | 'topic'>) => {
  const [categoryValue, setCategoryValue] = useState<string | undefined>(undefined);

  if (!sections) return null;

  return (
    <>
      {sections['blog.rc-section-articles-carousel'] &&
        sections['blog.rc-section-articles-carousel'].map((section) => (
          <SecondaryCarouselSection key={section.id} {...section} />
        ))}

      {sections['blog.rc-section-articles-list'] &&
        sections['blog.rc-section-articles-list'].map((section, idx) => (
          <ArticlesListSection
            key={idx}
            {...section}
            articles={articles}
            topicValue={topic}
            categoryValue={categoryValue}
            setCategoryValue={setCategoryValue}
          />
        ))}

      {sections['blog.rc-section-form'] &&
        sections['blog.rc-section-form'].map((section) => <MarketoFormSection key={section.id} {...section} />)}
    </>
  );
};

const BlogOverviewPage: NextPage<BlogOverviewPageProps> = ({
  heading,
  sections,
  preview,
  featuredPosts,
  topSectionBackgroundColor,
  topic,
  articles,
}) => {
  return (
    <>
      <ErrorBoundary preview={preview}>
        <ResourcesSearchSection
          heading={heading}
          backgroundColor={topSectionBackgroundColor}
          spacingBottom='none'
          spacingTop='continuous'
        />
      </ErrorBoundary>
      <ErrorBoundary preview={preview}>
        <FeatureCarouselSection
          items={featuredPosts}
          backgroundColor={topSectionBackgroundColor}
          spacingBottom='continuous'
          spacingTop='continuous'
        />
      </ErrorBoundary>

      <ErrorBoundary preview={preview}>
        <BlogOverviewSection sections={sections} articles={articles} topic={topic} />
      </ErrorBoundary>
    </>
  );
};

export default BlogOverviewPage;

export const getStaticProps = defaultGetStaticProps<BlogOverviewPageProps>({
  page: 'resources',
  getData: async ({ preview, params }) => {
    if (Number(params?.page) === 1) {
      return { notFound: true };
    }

    return getBlogOverviewPage(
      {
        page: Number(params?.page || 1),
        pageSize: constants.MAX_BLOG_POSTS_PER_PAGE,
        topic: params?.topic,
      },
      { preview }
    );
  },
});
