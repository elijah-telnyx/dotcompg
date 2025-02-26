import Section, { type SectionProps } from 'ui/components/Section';
import LargeLinkImageRowSection, { type LargeLinkImageProps } from 'ui/components/LargeLinkImageRowSection';

export interface ProductsSectionProps extends SectionProps {
  images: LargeLinkImageProps[];
}

const ProductsSection = ({ images, ...props }: ProductsSectionProps) => {
  return (
    <Section {...props}>
      <LargeLinkImageRowSection images={images} />
    </Section>
  );
};

export default ProductsSection;
