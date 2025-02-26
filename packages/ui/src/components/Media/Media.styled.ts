import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import { styled } from '../../styles';
import { Base } from '../Typography/utils';
import { Video as VideoComponent } from './components/Video';

const FullWidthImage = styled('img', {
  width: '100%',
});

export const Image = styled('img', {
  color: '$greenAlt',
  variants: {
    fillRight: {
      true: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        height: '100%',
      },
    },
    fill: {
      true: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        inset: 0,
        color: 'transparent',
      },
    },
    cover: {
      true: {
        objectFit: 'cover',
      },
    },
    contain: {
      true: {
        objectFit: 'contain',
      },
    },
  },
});

export const SrcSetImage = styled(FullWidthImage, Image);

export const ProductHeroImage = styled(SrcSetImage, {
  height: 'auto',
});

export const Video = styled(VideoComponent, {
  variants: {
    fill: {
      true: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        inset: 0,
      },
    },
    cover: {
      true: {
        objectFit: 'cover',
      },
    },
    contain: {
      true: {
        objectFit: 'contain',
      },
    },
  },
});

export const Text = styled(Base('div'));
export const SVG = styled(AccessibleIcon.Root, {});

export const VideoWrapper = styled('div', {
  variants: {
    playsOnHover: {
      true: {
        backgroundSize: 'cover',
        width: '100%',
        height: '100%',

        '& > video': {
          transition: 'opacity 300ms 300ms',
          opacity: 0,
        },
        '&:hover > video': {
          opacity: 1,
        },
      },
    },
  },
});
