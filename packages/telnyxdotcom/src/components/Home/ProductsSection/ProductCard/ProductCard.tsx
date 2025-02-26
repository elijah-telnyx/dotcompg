import type { PropsWithChildren } from 'react';
import { isDarkBackgroundColor, type BackgroundColor } from 'ui/components/../styles/constants/backgroundColorOptions';
import Heading from 'ui/components/Typography/Heading';
import Paragraph from 'ui/components/Typography/Paragraph';
import * as css from './ProductCard.styled';

export type ProductCardProps = {
  heading: string;
  copy: string;
  backgroundColor: Exclude<BackgroundColor, 'black' | 'cream'>;
  href: string;
  id: string;
};

export const ProductCard = ({
  heading,
  copy,
  href,
  backgroundColor,
  children,
}: PropsWithChildren<ProductCardProps>) => {
  const isDark = isDarkBackgroundColor(backgroundColor);

  return (
    <css.CardWrapper bgColor={backgroundColor}>
      <css.TextContainer>
        <css.LinkWrapper href={href}>
          <Heading level={2} dark={isDark}>
            {heading}
          </Heading>
        </css.LinkWrapper>
        <Paragraph dark={isDark}>{copy}</Paragraph>
      </css.TextContainer>
      {children}
    </css.CardWrapper>
  );
};
