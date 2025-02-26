import Media, { type MediaProps } from '../Media';

import * as css from './FullScreenMediaSection.styled';

export interface FullScreenMediaSectionProps {
  media: MediaProps<'media'>;
}

const FullScreenMediaSection = ({ media }: FullScreenMediaSectionProps) => {
  return (
    <css.Wrapper>
      <Media {...media} fill={false} cover />
    </css.Wrapper>
  );
};

export default FullScreenMediaSection;
