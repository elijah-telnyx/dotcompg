import env from "constants/env";
import type { NextPage } from "next";
import { getBlogPage, getBlogPages } from "lib/Contentful";
import { defaultGetStaticProps } from "utils/pageGeneration/defaultGetStaticProps";
import BlogPage from "components/BlogPage";

type BlogPostPageProps = Awaited<ReturnType<typeof getBlogPage>> & {
  preview: boolean;
};

type Paths = { params: { slug: string } }[];

const BlogPostPage: NextPage<BlogPostPageProps> = ({
  preview,
  ...blogArticleProps
}) => {
  return <BlogPage {...blogArticleProps} />;
};

export const getStaticPaths = async () => {
  const entries = await getBlogPages();
  if (entries) {
    return {
      fallback: env.generatePagesFallback.blog,
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

export const getStaticProps = defaultGetStaticProps({
  page: "blog/[slug]",
  getData: ({ params, preview }) =>
    getBlogPage({ slug: params?.slug as string }, { preview }),
});

export default BlogPostPage;
