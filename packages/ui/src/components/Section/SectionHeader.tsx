import * as css from './Section.styled';

import Heading from '../Typography/Heading';
import Markdown from '../Markdown';
import Tagline from '../Tagline';
import CtaButton, { type CTAButtonProps } from '../CtaButton';
import type { ThemedCSS } from '../../styles/config/stitches.config';
import type { VariantProps } from '@stitches/react';

export interface SectionHeaderProps {
  tagline?: string;
  heading?: string;
  copy?: string;
  cta?: CTAButtonProps;
  isDark?: VariantProps<typeof css.SectionHeaderContainer>['isDark'];
  variant?: React.ComponentProps<typeof css.SectionHeaderContainer>['variant'];
  css?: ThemedCSS;
}

const SectionHeader = ({
  tagline,
  heading,
  copy,
  cta,
  isDark,

  css: _css,
  variant,
}: SectionHeaderProps) => {
  const isLarge = variant === 'large';

  return (
    <css.SectionHeaderContainer css={_css} variant={variant} isDark={isDark}>
      {tagline && <Tagline>{tagline}</Tagline>}
      {heading && (
        <Heading level={2} alt={isLarge} css={{ marginBottom: -4 }}>
          {heading}
        </Heading>
      )}
      {copy && (
        <Markdown lead={isLarge} dark={isDark}>
          {copy}
        </Markdown>
      )}
      {cta && (
        <css.CtaWrapper>
          <CtaButton {...cta} />
        </css.CtaWrapper>
      )}
    </css.SectionHeaderContainer>
  );
};

export default SectionHeader;
