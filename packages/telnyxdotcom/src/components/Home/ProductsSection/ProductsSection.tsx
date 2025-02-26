import Grid from 'ui/components/Grid';

import Section, { type SectionProps } from 'ui/components/Section';
import * as ProductCard from './ProductCard';

import * as css from './ProductsSection.styled';
import SectionHeader from 'ui/components/Section/SectionHeader';
import { isDarkBackgroundColor } from 'ui/styles/constants/backgroundColorOptions';

export interface ProductsSectionProps extends SectionProps {
  tagline: string;
  heading: string;
  copy: string;
  cards: ProductCard.ProductCardProps[];
}

export const ProductsSection = ({ cards, tagline, heading, copy, ...sectionProps }: ProductsSectionProps) => {
  const isDark = isDarkBackgroundColor(sectionProps.backgroundColor);

  return (
    <Section {...sectionProps}>
      <Grid.Container>
        <Grid.FullWidthItem>
          <css.SectionHeader>
            <SectionHeader tagline={tagline} heading={heading} copy={copy} isDark={isDark} variant='large' />
          </css.SectionHeader>
        </Grid.FullWidthItem>
      </Grid.Container>
      <css.ProductCardsWrapper>
        {cards.map((card) => {
          switch (card.id) {
            case 'communication':
              return <ProductCard.CommunicationCard {...card} key={card.href} />;
            case 'iot':
              return <ProductCard.IotCard {...card} key={card.href} />;
            case 'network':
              return <ProductCard.NetworkCard {...card} key={card.href} />;
            case 'compute':
              return <ProductCard.ComputeCard {...card} key={card.href} />;
            default:
              return null;
          }
        })}
      </css.ProductCardsWrapper>
    </Section>
  );
};

export default ProductsSection;
