import type { NextPage } from 'next';
import BlogSearchHeader from 'ui/components/BlogSearchHeader';
import ArticlesListSection from 'components/ControlledArticlesListSection';
import MarketoFormSection from 'ui/components/FormSection/MarketoFormSection/MarketoFormSection';
import { constants } from 'lib/Contentful';
import { getBlogOverviewPage } from 'lib/Strapi';
import { routes } from 'utils/routes';
import { defaultGetServerSideProps } from 'utils/pageGeneration/defaultGetServerSideProps';
import ErrorBoundary from 'components/ErrorBoundary';
import ResourcesSearchSection from 'components/ResourcesSearchSection';
import { useState } from 'react';

type BlogOverviewPageProps = Awaited<ReturnType<typeof getBlogOverviewPage>> & {
  preview: boolean;
  search?: string;
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

const BlogOverviewPaginatedPage: NextPage<BlogOverviewPageProps> = ({
  heading,
  sections,
  topSectionBackgroundColor,
  preview,
  articles,
  topic,
  search,
}) => {
  return (
    <>
      <ErrorBoundary preview={preview}>
        <ResourcesSearchSection
          heading={heading}
          backgroundColor={topSectionBackgroundColor}
          spacingTop='continuous'
          spacingBottom='contrasting'
        />
      </ErrorBoundary>
      <ErrorBoundary preview={preview}>
        <BlogSearchHeader
          searchTerm={search?.toString() || ''}
          page={articles.pagination.pageCounter.currentPage.toString()}
          backgroundColor='cream'
          spacingTop='continuous'
          spacingBottom='none'
          backToHref={routes.resources.root}
          id='articles'
        />
      </ErrorBoundary>

      <ErrorBoundary preview={preview}>
        <BlogOverviewSection sections={sections} articles={articles} topic={topic} />
      </ErrorBoundary>
    </>
  );
};

export default BlogOverviewPaginatedPage;

export const getServerSideProps = defaultGetServerSideProps<BlogOverviewPageProps>({
  page: 'resources/search',
  getData: ({ query, preview }) => {
    return getBlogOverviewPage(
      {
        page: Number(query?.page || 1),
        pageSize: constants.MAX_BLOG_POSTS_PER_PAGE,
        topic: query?.topic?.toString(),
        query: query?.s?.toString() || '',
      },
      { preview }
    );
  },
});
