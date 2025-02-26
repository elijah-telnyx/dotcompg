import { ProductCard, type ProductCardProps } from '../ProductCard';
import {
  ComputeAiApp,
  ComputeLeftArrow,
  ComputeMainImage,
  ComputeMediaWrapper,
  ComputeRightArrow,
} from '../ProductCard.styled';
import ScreenSvg from './screen.svg';
import ArrowLeftSvg from './arrow_left.svg';
import ArrowRightSvg from './arrow_right.svg';
import AiAppSvg from './ai_app.svg';
type ComputeCardProps = ProductCardProps;

export const ComputeCard = (props: ComputeCardProps) => {
  return (
    <ProductCard {...props}>
      <ComputeMediaWrapper>
        <ComputeLeftArrow src={ArrowLeftSvg} alt='Arrow pointing left.' />
        <ComputeMainImage src={ScreenSvg} alt='A computer screen displaying a graph and data visualization.' />
        <ComputeRightArrow src={ArrowRightSvg} alt='Arrow pointing to the right.' />
        <ComputeAiApp
          src={AiAppSvg}
          alt='Illustration of an AI application interface showing various data points and graphs.'
        />
      </ComputeMediaWrapper>
    </ProductCard>
  );
};
