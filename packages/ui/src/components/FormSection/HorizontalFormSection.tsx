import type { SectionProps } from '../Section';
import CtaButton, { type CTAButtonProps } from '../CtaButton';
import type { HeadingProps, HeadingTag } from '../Typography/Heading';
import { config } from '../../styles';
import { isDarkBackgroundColor } from '../../styles/constants/backgroundColorOptions';
import useMedia from '../../utils/hooks/useMedia';
import Markdown from '../Markdown';
import Tagline from '../Tagline';
import Grid, { type GridItemProps } from '../Grid';
import * as css from './FormSection.styled';
import type { MediaProps } from '../Media';

export interface HorizontalFormSectionProps extends SectionProps {
  tagline?: string;
  heading?: string;
  headingLevel?: HeadingProps['level'];
  headingTag?: HeadingTag;
  copy?: string;
  smallCopy?: string;
  ctaButtons?: CTAButtonProps[];
  loading?: boolean;
  media?: MediaProps<'img'>;
  background?: {
    backgroundImage?: string;
    backgroundImageLarge?: string;
    backgroundImageXl?: string;
    backgroundAttachment?: string;
    backgroundBlendMode?: string;
    backgroundSize?: string;
    backgroundRepeat?: string;
    backgroundPosition?: string;
  };
}

const columns: GridItemProps = {
  xs: 4,
  small: 8,
  medium: 6,
};

export const HorizontalFormSection = ({
  tagline,
  heading,
  headingLevel = 2,
  headingTag,
  copy,
  smallCopy,
  ctaButtons,
  loading,
  children,
  background,
  media,
  ...props
}: HorizontalFormSectionProps) => {
  const isSmall = useMedia(config.media.small, null);
  let dark = isSmall ? isDarkBackgroundColor(props.backgroundColor) : false;

  const {
    backgroundAttachment,
    backgroundImageLarge,
    backgroundImageXl,
    ...sectionBackgroundCss
  }: HorizontalFormSectionProps['background'] = background || {};
  // shortcut -- media not defined yet
  if (isSmall === null) {
    dark = false;
  }

  return (
    <css.SectionWrapper
      {...props}
      css={{
        '@medium': {
          backgroundImage: `url(${media?.src})`,
          ...sectionBackgroundCss,
        },
        '@large': {
          backgroundAttachment,
          backgroundImage: backgroundImageLarge,
        },
        '@xl': { backgroundImage: backgroundImageXl },
      }}
      card
      hasOverflow
      horizontal
    >
      <css.Container>
        <css.TextItem>
          <css.ContentWrapper
            hasHeading={Boolean(heading || copy)}
            card
            horizontal
          >
            {tagline && (
              <css.TaglineWrapper>
                <Tagline isDark={dark}>{tagline}</Tagline>
              </css.TaglineWrapper>
            )}
            {heading && (
              <css.Heading dark={dark} level={headingLevel} htmlAs={headingTag}>
                {heading}
              </css.Heading>
            )}
            {copy && (
              <css.MarkdownWrapper horizontal>
                <Markdown dark={dark} lead>
                  {copy}
                </Markdown>
              </css.MarkdownWrapper>
            )}
            {smallCopy && (
              <css.CtaCopyWrapper>
                <Markdown dark={dark}>{smallCopy}</Markdown>
              </css.CtaCopyWrapper>
            )}
            <css.CtaWrapper>
              {ctaButtons &&
                ctaButtons.map((cta) => (
                  <CtaButton
                    {...cta}
                    key={cta.href}
                    backgroundColor={props.backgroundColor}
                  />
                ))}
            </css.CtaWrapper>
          </css.ContentWrapper>
        </css.TextItem>

        <Grid.Item {...columns}>
          <css.HorizontalWrapper>
            <css.FormCard disabled={loading} form>
              {children}
            </css.FormCard>
          </css.HorizontalWrapper>
        </Grid.Item>
      </css.Container>
    </css.SectionWrapper>
  );
};
