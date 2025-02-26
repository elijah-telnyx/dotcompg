import { ProductCard, type ProductCardProps } from '../ProductCard';
import { CommunicationChatWindowImage, CommunicationMediaWrapper } from '../ProductCard.styled';
import NextImage from 'next/image';
import CodeTerminalSvg from './code_terminal.svg';
import ChatWindowSvg from './chat_window.svg';

type CommunicationCardProps = ProductCardProps;

export const CommunicationCard = (props: CommunicationCardProps) => {
  return (
    <ProductCard {...props}>
      <CommunicationMediaWrapper>
        <NextImage src={CodeTerminalSvg} alt='A code terminal displaying lines of code and a cursor.' />
        <CommunicationChatWindowImage
          src={ChatWindowSvg}
          alt='A graphic representation of a chat window interface with message bubbles and a text input field.'
        />
      </CommunicationMediaWrapper>
    </ProductCard>
  );
};
