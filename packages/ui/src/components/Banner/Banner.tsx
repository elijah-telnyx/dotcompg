import useScroll from '../../utils/hooks/useScroll';
import type { ReactNode } from 'react';
import type { BackgroundColor } from '../../styles/constants/backgroundColorOptions';

import * as css from './Banner.styled';

const directions = {
  right: 1,
  left: -1,
};

type CopyProps = Pick<
  BannerProps,
  'backgroundColor' | 'backgroundImage' | 'copy'
> & {
  direction?: keyof typeof directions;
  speed?: number;
};

export interface BannerProps {
  children: ReactNode;

  /**
   * Controls the content that is rendered by repeat this horizontally
   */
  backgroundImage: string;
  /**
   * Used to give readable content
   */
  copy: string;
  backgroundColor?: BackgroundColor;
  parallaxControllers?: Pick<CopyProps, 'speed'>;
}

const Copy = ({
  backgroundColor = 'green',
  backgroundImage,
  copy,
  direction = 'right',
  speed = 0.5,
}: CopyProps) => {
  const scroll = useScroll();

  return (
    <css.Copy
      aria-label={copy}
      backgroundColor={backgroundColor}
      css={{
        backgroundImage: `url("${backgroundImage}")`,
        backgroundPosition: `calc(${scroll.Y} * ${
          directions[direction] * speed
        }) center`,
      }}
    />
  );
};

const Banner = ({
  children,
  backgroundColor,
  backgroundImage,
  copy,
  parallaxControllers,
}: BannerProps) => {
  if (!backgroundImage) {
    return <>{children}</>;
  }

  return (
    <css.Wrapper>
      <Copy
        {...parallaxControllers}
        backgroundColor={backgroundColor}
        backgroundImage={backgroundImage}
        copy={copy}
      />
      {children}
      <Copy
        {...parallaxControllers}
        backgroundColor={backgroundColor}
        backgroundImage={backgroundImage}
        copy={copy}
        direction='left'
      />
    </css.Wrapper>
  );
};

export default Banner;
