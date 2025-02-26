import Grid from 'ui/components/Grid';
import SectionHeader from 'ui/components/Section/SectionHeader';
import type { SectionHeaderProps } from 'ui/components/Section/SectionHeader';
import type { SectionProps } from 'ui/components/Section';
import { isDarkBackgroundColor, type BackgroundColor } from 'ui/styles/constants/backgroundColorOptions';
import Codes, { type CodesProps } from 'ui/components/Codes';
import CtaButton, { type CTAButtonProps } from 'ui/components/CtaButton';
import TwoColumnsParallax from 'ui/components/TwoColumnsParallax';
import type { MediaProps } from 'ui/components/Media';
import Heading from 'ui/components/Typography/Heading';
import Paragraph from 'ui/components/Typography/Paragraph';
import Media from 'ui/components/Media';
import * as css from './DeveloperFocus.styles';
import { useIntersectionObserver } from 'ui/utils/hooks/useIntersectionObserver';
import type { ThemedCSS } from 'ui/styles/config/stitches.config';
import type { Spacing } from 'ui/styles/constants/spacing';

interface ItemTextProps {
  heading: string;
  copy: string;
  cta: Pick<CTAButtonProps, 'text' | 'href'>;
  isDark?: boolean;
  backgroundColor: CTAButtonProps['backgroundColor'];
}

const ItemText = ({ heading, copy, cta, isDark, backgroundColor }: ItemTextProps) => {
  return (
    <css.TextBlock>
      <Heading
        level={3}
        alt={{
          '@medium': true,
        }}
        dark={isDark}
      >
        {heading}
      </Heading>
      <Paragraph dark={isDark}>{copy}</Paragraph>
      <div>
        <CtaButton {...cta} type='button' text={cta.text} buttonKind='primary' backgroundColor={backgroundColor} />
      </div>
    </css.TextBlock>
  );
};

type MediaItemProps = MediaProps<'media'> & {
  mobileSrc: string;
  backgroundColor?: BackgroundColor;
};

const MediaItem = ({ mobileSrc, backgroundColor, ...props }: MediaItemProps) => {
  return (
    <css.MediaWrapper
      css={{
        '@lessThanMedium': backgroundColor
          ? {
              backgroundColor: '$' + backgroundColor,
            }
          : {},
      }}
    >
      <Media {...props} autoPlay mobileSrc={mobileSrc} />
    </css.MediaWrapper>
  );
};
interface CodeItemProps {
  items: CodesProps['items'];
  tagline: string;
}

const CodeItem = (props: CodeItemProps) => {
  return (
    <css.CodeBlockWrapper>
      <Codes {...props} alt />
    </css.CodeBlockWrapper>
  );
};

interface Item extends ItemTextProps {
  media?: MediaItemProps;
  code?: CodeItemProps['items'];
  id: string;
}

export interface DeveloperFocusProps extends SectionProps, SectionHeaderProps {
  items: Item[];
  css?: ThemedCSS;
}

const shouldChangeBackground = (entry?: IntersectionObserverEntry) => {
  if (!entry) return false;
  // if the element is visible based on the threshold passed to the observer
  const isVisible = entry.isIntersecting;
  // when the user are below the section so it maintain the transitioned color
  const isBelowSection = entry.boundingClientRect?.top > 0;
  return !isVisible && isBelowSection;
};

const DeveloperFocus = ({ heading, tagline, copy, items, ...props }: DeveloperFocusProps) => {
  const { entry, observerRef } = useIntersectionObserver<HTMLDivElement>({
    // 10% visible
    threshold: 0.1,
  });
  const computedBackgroundColor = shouldChangeBackground(entry) ? 'cream' : props.backgroundColor;
  const isDark = isDarkBackgroundColor(computedBackgroundColor);

  return (
    <css.Section
      {...props}
      backgroundColor={computedBackgroundColor}
      spacingBottom={
        {
          '@lessThanMedium': 'none',
        } as unknown as Spacing
      }
    >
      <Grid.Container>
        <Grid.FullWidthItem>
          <SectionHeader heading={heading} tagline={tagline} copy={copy} isDark={isDark} variant='large' />
        </Grid.FullWidthItem>
      </Grid.Container>
      <div ref={observerRef}>
        <TwoColumnsParallax
          items={items.map(({ id, ...item }) => {
            const left = (
              <ItemText
                heading={item.heading}
                copy={item.copy}
                cta={item.cta}
                isDark={isDark}
                backgroundColor={computedBackgroundColor}
              />
            );
            let right = null;

            if (item.code) {
              right = <CodeItem items={item.code} tagline={item.heading} />;
            }
            if (item.media) {
              right = <MediaItem {...item.media} />;
            }
            return { id, left, right };
          })}
        />
      </div>
    </css.Section>
  );
};

export default DeveloperFocus;
