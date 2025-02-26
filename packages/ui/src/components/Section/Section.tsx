import type { HTMLAttributes } from 'react';
import type { BackgroundColor } from '../../styles/constants/backgroundColorOptions';
import type { Spacing } from '../../styles/constants/spacing';
import * as css from './Section.styled';
import type { ThemedCSS } from '../../styles/config/stitches.config';
import type { VariantProps } from '@stitches/react';
import type { MediaProps } from '../Media';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  backgroundColor?: BackgroundColor;
  dynamicBackgroundColor?: VariantProps<typeof css.Section>['backgroundColor'];
  hasOverflow?: boolean;
  spacingBottom?: Spacing;
  dynamicSpacingBottom?: VariantProps<typeof css.Section>['spacingBottom'];
  dynamicSpacingTop?: VariantProps<typeof css.Section>['spacingTop'];
  spacingTop?: Spacing;
  htmlAs?: keyof JSX.IntrinsicElements;
  scrollSnap?: boolean;
  css?: ThemedCSS;
  backgroundImage?: MediaProps<'img'>;
}

export const getSectionProps = ({
  id,
  backgroundColor,
  hasOverflow,
  spacingBottom,
  spacingTop,
  htmlAs,
  css,
  backgroundImage,
}: SectionProps): SectionProps => {
  return {
    id,
    backgroundColor,
    hasOverflow,
    spacingBottom,
    spacingTop,
    htmlAs,
    css,
    backgroundImage,
  };
};

const getBackgroundImage = (backgroundImage?: MediaProps<'img'>) => {
  if (!backgroundImage) return null;
  const props: ThemedCSS = {
    backgroundImage: `url(${backgroundImage.src})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
  if (backgroundImage.contain) {
    props.backgroundSize = 'contain';
  }
  if (backgroundImage.cover) {
    props.backgroundSize = 'cover';
  }
  if (backgroundImage.fill) {
    props.backgroundSize = 'contain';
  }
  if (!props.backgroundSize) {
    props.backgroundSize = 'cover';
  }

  return props;
};

const Section = ({
  htmlAs,
  title: _ /* internal usage only */,
  backgroundImage,
  ...props
}: SectionProps) => {
  return (
    <css.Section
      as={htmlAs}
      {...props}
      css={{
        ...props.css,
        ...getBackgroundImage(backgroundImage),
      }}
      backgroundColor={props.dynamicBackgroundColor || props.backgroundColor}
      spacingTop={props.dynamicSpacingTop || props.spacingTop}
      spacingBottom={props.dynamicSpacingBottom || props.spacingBottom}
    />
  );
};

export default Section;
