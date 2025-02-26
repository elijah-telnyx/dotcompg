import type { DotLottieReactProps } from '@lottiefiles/dotlottie-react';
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import { styled } from '../../styles';

export interface MediaDotLottieProps extends DotLottieReactProps {
  autoPlay?: boolean;
}

const DotLottieReact: ComponentType<DotLottieReactProps> = dynamic(
  () =>
    import('@lottiefiles/dotlottie-react').then(
      (module) => module.DotLottieReact
    ),
  { ssr: false }
);

const DotLottieWrapper = styled('div', {
  '& canvas': {
    display: 'block',
  },
});

export const MediaDotLottie = ({ autoPlay, ...props }: MediaDotLottieProps) => {
  return (
    <DotLottieWrapper>
      <DotLottieReact {...props} autoplay={autoPlay} playOnHover />
    </DotLottieWrapper>
  );
};
