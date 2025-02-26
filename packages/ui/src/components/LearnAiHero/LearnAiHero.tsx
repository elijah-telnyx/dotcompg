import type { SectionProps } from '../Section';
import type { AuthorCardProps } from '../AuthorCard';
import type { MediaProps } from '../Media';
import Grid, { type GridItemProps } from '../Grid';
import CtaButton, { type CTAButtonProps } from '../CtaButton';
import Author, { type AuthorProps } from '../Author';
import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';
import * as css from './LearnAiHero.styled';
import type { BackgroundColor } from '../../styles/constants/backgroundColorOptions';

const articleColumns: GridItemProps = {
  xs: 4,
  small: 8,
  medium: 8,
};

/**
 * `spacingBottom` is dynamically calculated based on `media` and the immediate next section
 */
export interface LearnAiHeroProps extends Omit<SectionProps, 'spacingBottom'> {
  media?: MediaProps<'media'>;
  breadcrumbLink: CTAButtonProps;
  tagline?: string;
  heading: string;
  copy: string;
  author: Pick<AuthorCardProps, 'id' | 'copy' | 'icon'> &
    Pick<AuthorProps, 'linkHref'>;
  authorLinkHref: AuthorProps['linkHref'];
  isEditor?: boolean;
  extendedLayout?: boolean;
  backgroundColor?: BackgroundColor;
}

const LearnAiHero = ({
  extendedLayout = false,
  breadcrumbLink,
  tagline,
  heading,
  copy,
  author,
  authorLinkHref,
  media,
  backgroundColor,
  ...props
}: LearnAiHeroProps) => {
  // feature flipper for extended layout DOTCOM_3795_SOLUTIONS_HEADER
  const Container = extendedLayout ? css.ContainerExtended : css.Container;
  return (
    <css.SectionWrapper
      backgroundColor={backgroundColor || 'tan'}
      {...props}
      spacingBottom='continuous'
      hasMedia={!!media}
      // it must be a div to preserve the h1 being a child of the article element
      htmlAs='div'
    >
      <Container>
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
            <Author
              linkHref={authorLinkHref}
              name={author.copy}
              media={author.icon}
              isEditor={props.isEditor}
            />
          </css.AuthorWrapper>
        </Grid.Item>
        {media && (
          <css.MediaItem xs={4} small={8} medium={12}>
            <css.HeroMediaWrapper>
              <css.Media {...media} extendedLayout={extendedLayout} />
            </css.HeroMediaWrapper>
          </css.MediaItem>
        )}
      </Container>
    </css.SectionWrapper>
  );
};

export default LearnAiHero;
