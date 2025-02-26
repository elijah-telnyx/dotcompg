import Grid from '../Grid';
import type { MediaProps } from '../Media';
import Media, { MediaSVG } from '../Media';
import Heading from '../Typography/Heading';
import * as css from './SolutionsHero.styled';
import { isDarkBackgroundColor } from '../../styles/constants/backgroundColorOptions';
import type { SectionProps } from '../Section';
import type { CTAButtonProps } from '../CtaButton';
import CtaButton from '../CtaButton/CtaButton';

export interface SolutionsHeroProps extends SectionProps {
  tagline?: string;
  heading: string;
  icon?: MediaProps<'svg'>;
  media?: MediaProps<'media'>;
  ctaButtons?: CTAButtonProps[];
}

const SolutionsHero = ({
  tagline,
  heading,
  icon,
  media,
  ctaButtons,
  ...props
}: SolutionsHeroProps) => {
  const dark = isDarkBackgroundColor(props.backgroundColor);
  return (
    <css.SectionWrapper {...props} hasMedia={!!media}>
      <Grid.Container
        css={{
          rowGap: ctaButtons ? '$medium' : '$xl',
          '@small': {
            rowGap: '$medium',
          },
          '@medium': {
            rowGap: '$xl',
          },
        }}
      >
        <Grid.Item xs={4} small={6} medium={8}>
          {tagline && (
            <Heading
              level={2}
              category
              htmlAs='strong'
              dark={dark}
              css={{
                marginBottom: '$xs',
                '@medium': {
                  marginBottom: '$medium',
                },
              }}
            >
              {tagline}
            </Heading>
          )}
          <css.HeadingWrapper>
            {icon && (
              <css.IconWrapper backgroundColor={props.backgroundColor}>
                <MediaSVG {...icon} />
              </css.IconWrapper>
            )}
            <Heading level={1} dark={dark}>
              {heading}
            </Heading>
          </css.HeadingWrapper>
        </Grid.Item>
        {ctaButtons && (
          <Grid.FullWidthItem>
            <css.CtaButtonsWrapper>
              {ctaButtons.map((cta) => (
                <CtaButton
                  {...cta}
                  key={cta.href}
                  backgroundColor={props.backgroundColor}
                />
              ))}
            </css.CtaButtonsWrapper>
          </Grid.FullWidthItem>
        )}
        {!!media && (
          <Grid.FullWidthItem>
            <css.MediaWrapper>
              <Media {...media} contain preload fill />
            </css.MediaWrapper>
          </Grid.FullWidthItem>
        )}
      </Grid.Container>
    </css.SectionWrapper>
  );
};

export default SolutionsHero;
