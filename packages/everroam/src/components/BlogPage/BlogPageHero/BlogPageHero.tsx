import * as css from "./BlogPageHero.styled";
import Grid, { type GridItemProps } from "ui/components/Grid";
import Heading from "ui/components/Typography/Heading";
import Paragraph from "ui/components/Typography/Paragraph";
import { formatDate } from "ui/utils/formatDate";
import Author from "ui/components/Author";
import { type MediaFields } from "lib/Contentful/types";
import { type MarkdownProps } from "ui/components/Markdown";
import type { Entry } from "contentful";

const articleColumns: GridItemProps = {
  xs: 4,
  small: 8,
  medium: 8,
};

export interface AuthorProps {
  firstName: string;
  lastName: string;
  media: Entry<MediaFields> | any;
  description: Entry<MarkdownProps>;
  linkedIn?: string;
}

export type BlogPageHeroProps = {
  createdAt: string;
  updatedAt: string;
  title: string;
  excerpt: string;
  author: AuthorProps;
  readTime?: string;
  featureImage?: Entry<MediaFields> | any;
  featureImageAltText?: string;
};

const BlogPageHero = ({
  updatedAt,
  readTime,
  title,
  excerpt,
  author,
  featureImage,
  featureImageAltText,
  ...props
}: BlogPageHeroProps) => {
  const tagline = `Last Updated ${formatDate(updatedAt)}`;
  return (
    <css.SectionWrapper
      {...props}
      spacingBottom="continuous"
      hasMedia={!!featureImage}
      // it must be a div to preserve the h1 being a child of the article element
      htmlAs="div"
    >
      <css.Container>
        <css.TagItem {...articleColumns}>
          <Heading level={2} category htmlAs="strong">
            {tagline}
          </Heading>
        </css.TagItem>
        <Grid.Item {...articleColumns}>
          <Heading level={1} blog>
            {title}
          </Heading>
        </Grid.Item>
        <Grid.Item {...articleColumns}>
          <Paragraph lead>{excerpt}</Paragraph>
        </Grid.Item>
        <Grid.Item {...articleColumns}>
          <css.AuthorWrapper>
            <css.AuthorWrapper>
              <Author
                name={`${author.firstName} ${author.lastName}`}
                media={author.media}
              />
            </css.AuthorWrapper>
          </css.AuthorWrapper>
        </Grid.Item>
        {featureImage && (
          <css.MediaItem xs={4} small={8} medium={12}>
            <css.HeroMediaWrapper>
              <css.Media {...featureImage} />
            </css.HeroMediaWrapper>
          </css.MediaItem>
        )}
      </css.Container>
    </css.SectionWrapper>
  );
};

export default BlogPageHero;
