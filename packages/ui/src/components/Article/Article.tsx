import Section, { type SectionProps } from '../Section';
import type { MarkdownProps } from '../Markdown';
import { type MediaProps } from '../Media';
import Grid, { type GridItemProps } from '../Grid';
import CtaButton, { type CTAButtonProps } from '../CtaButton';
import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';
import Markdown from '../Markdown';
import SocialShareButtons from '../SocialShareButtons';
import * as css from './Article.styled';
import MarketoForm, { type MarketoFormProps } from '../MarketoForm';
import { MARKDOWN_IMAGE_MAX_WIDTH } from '../Markdown';
import Author from '../Author';

const articleColumns: GridItemProps = {
  xs: 4,
  small: 8,
  medium: 8,
};
export interface ArticleProps extends SectionProps {
  breadcrumbLink: CTAButtonProps;
  tagline?: string;
  heading: string;
  copy: string;
  author: {
    copy: string;
    icon?: MediaProps<'media'>;
  };
  media: MediaProps<'media'>;
  body: MarkdownProps;
  form?: MarketoFormProps;
  seo: {
    title: string;
    description: string;
  };
  url: string;
  onSocialShare?: (network: string) => void;
}

const Article = ({
  breadcrumbLink,
  tagline,
  heading,
  copy,
  author,
  media,
  body,
  form,
  url,
  onSocialShare,
  ...props
}: ArticleProps) => {
  return (
    <Section htmlAs='article' {...props}>
      <css.Container>
        <css.BreadcrumbItem {...articleColumns}>
          <CtaButton {...breadcrumbLink} />
        </css.BreadcrumbItem>
        {tagline && (
          <css.TagItem {...articleColumns}>
            <Heading level={2} category htmlAs='strong'>
              {tagline}
            </Heading>
          </css.TagItem>
        )}
        <Grid.Item {...articleColumns}>
          <Heading level={1} blog>
            {heading}
          </Heading>
        </Grid.Item>
        <Grid.Item {...articleColumns}>
          <Paragraph lead>{copy}</Paragraph>
        </Grid.Item>
        <Grid.Item {...articleColumns}>
          <css.AuthorWrapper>
            <Author name={author.copy} media={author.icon} />
          </css.AuthorWrapper>
        </Grid.Item>
      </css.Container>

      <css.Container>
        <Grid.Item {...articleColumns}>
          <css.Container>
            <css.MediaItem xs={8} small={8} medium={9} large={10}>
              <css.HeroMediaWrapper>
                <css.Media {...media} />
              </css.HeroMediaWrapper>
            </css.MediaItem>
            <Grid.Item xs={8} small={8} medium={9} large={10}>
              <Markdown
                {...body}
                options={{
                  forceBlock: false,
                  overrides: {
                    // resources/[slug] uses the title field for h1
                    // this is to prevent having two h1 over a page
                    h1: {
                      component: ({ children, id }) => (
                        <Heading level={2} dark={body?.dark} blog id={id}>
                          {children}
                        </Heading>
                      ),
                    },
                    img: {
                      component: (props) => {
                        return (
                          <css.Media
                            {...props}
                            autoPlay
                            loop
                            css={{ maxWidth: '100%' }}
                            width={MARKDOWN_IMAGE_MAX_WIDTH}
                          />
                        );
                      },
                    },
                  },
                }}
                blog
              />
            </Grid.Item>
          </css.Container>
        </Grid.Item>

        {form && (
          <Grid.Item xs={4} small={8} medium={4} large={4}>
            <css.FormWrapper>
              {form.heading && (
                <css.FormHeading level={3} htmlAs='h2'>
                  {form.heading}
                </css.FormHeading>
              )}
              <MarketoForm {...form} heading='' />
            </css.FormWrapper>
          </Grid.Item>
        )}

        <Grid.Item {...articleColumns}>
          <css.SocialShareWrapper>
            <SocialShareButtons
              url={url}
              title={props.seo?.title || heading}
              description={props.seo?.description || copy}
              onClickShareButton={onSocialShare}
            />
          </css.SocialShareWrapper>
        </Grid.Item>
      </css.Container>
    </Section>
  );
};

export default Article;
