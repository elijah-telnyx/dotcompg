import { useRef, Fragment, useState } from 'react';
import * as css from './ParallaxImageRow.styled';
import useScroll from '../../utils/hooks/useScroll';
import useMountEffect from '../../utils/hooks/useMountEffect';
import type { MediaProps } from '../Media';

const directions = {
  Right: 1,
  Left: -1,
};

type NullableDiv = HTMLDivElement | undefined;

export interface ParallaxImageRowProps {
  images: MediaProps<'media'>[];
  direction?: keyof typeof directions;
  speed?: number;
}

const ParallaxImageRow = ({
  images,
  direction = 'Right',
  speed = 0.5,
}: ParallaxImageRowProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState({
    offsetTop: 0,
    fullWidth: 0,
    ghostCount: 0,
  });

  function updateGhost() {
    const root = rootRef.current as NullableDiv;
    const imageContainer = imageContainerRef?.current as NullableDiv;

    if (!root || !imageContainer) {
      return;
    }

    const rootWidth = root.offsetWidth;
    const imageContainerWidth = imageContainer.offsetWidth;

    const ghostCount =
      // Values gotten from experimentation
      Math.ceil((rootWidth * 8 * speed) / imageContainerWidth) - 1;

    setState({
      offsetTop: root.offsetTop,
      fullWidth: imageContainerWidth * (ghostCount + 1),
      ghostCount,
    });
  }

  useMountEffect(() => {
    updateGhost();
    window.addEventListener('resize', updateGhost);

    return () => {
      window.removeEventListener('resize', updateGhost);
    };
  });

  const scroll = useScroll();

  return (
    <css.Root ref={rootRef}>
      <css.Center
        style={{
          display: 'flex',
          transform: `translateX(calc(${scroll.Y} * ${
            directions[direction] * speed
          }))`,
        }}
      >
        <css.InnerWrapper
          style={{
            transform: `translateX(${-state.fullWidth / 2}px)`,
          }}
        >
          <css.ImageContainer ref={imageContainerRef}>
            {images.map((it, index) => (
              <css.Image
                src={it.src}
                alt={it.alt}
                key={index}
                onLoad={updateGhost}
              />
            ))}
          </css.ImageContainer>
          <css.ImageContainer aria-hidden>
            {state.ghostCount > 0 &&
              new Array(state.ghostCount).fill(null).map((_, index) => (
                <Fragment key={index}>
                  {images.map((it, index) => (
                    <css.Image src={it.src} alt={it.alt} key={index} />
                  ))}
                </Fragment>
              ))}
          </css.ImageContainer>
        </css.InnerWrapper>
      </css.Center>
    </css.Root>
  );
};

export default ParallaxImageRow;
