import Section from "ui/components/Section";
import type { GridItemProps } from "ui/components/Grid";
import BlogPageHero from "./BlogPageHero";
import Sidebar from "./Sidebar";
import Markdown from "ui/components/Markdown";
import SecondaryCarouselSection from "ui/components/SecondaryCarouselSection";
import { constants } from "lib/Contentful";

import * as css from "./BlogPage.styled";

const articleColumns: GridItemProps = {
  xs: 4,
  small: 8,
  medium: 8,
};

const BlogPage = ({ hero, content, relatedArticles, jumpLinks }: any) => {
  const hasMedia = !!hero.media;
  return (
    <>
      <BlogPageHero {...hero} />
      <Section spacingTop={hasMedia ? "continuous" : "none"}>
        <css.Container>
          <Sidebar jumpLinks={jumpLinks} />
          <css.ContentItem {...articleColumns}>
            <Markdown blog>{content}</Markdown>
          </css.ContentItem>
        </css.Container>
      </Section>
      {relatedArticles?.items.length >=
        constants.BLOG_POSTS_RELATED_ARTICLES_MINIMUM && (
        <SecondaryCarouselSection
          semanticHeading={false}
          {...relatedArticles}
        />
      )}
    </>
  );
};

export default BlogPage;
