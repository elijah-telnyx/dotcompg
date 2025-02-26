import { styled } from '../../../styles';
import { Video, type VideoProps } from '../../Media/components/Video';

const MediaWrapper = styled('div', {
  position: 'relative',
  '& > video': {
    width: '100%',
    maxWidth: '100%',
  },
  variants: {
    fullWidth: {
      true: {
        zIndex: 1,
        width: '100vw',
        height: 'auto',
        aspectRatio: '16/9',
        $$spaceOutOfGrid: 'calc((100vw - $$gridWidth))',
        $$gridWidth: '$gridMaxWidth$base',
        left: 'calc((-100vw + 100%) + $$spaceOutOfGrid / 2)',
        '@xs': {
          $$gridWidth: '$extended_gridMaxWidth$xs',
        },
        '@small': {
          $$gridWidth: '$extended_gridMaxWidth$small',
        },
        '@medium': {
          $$gridWidth: '$extended_gridMaxWidth$medium',
        },
        '@large': {
          $$gridWidth: '$extended_gridMaxWidth$large',
        },
        '@xl': {
          $$gridWidth: '$extended_gridMaxWidth$xl',
        },

        '& > video': {
          display: 'block',
          aspectRatio: 'inherit',
          width: 'inherit',
          height: 'auto',
        },
      },
    },
  },
});

export interface ResourcesVideoProps {
  readonly fullWidth?: boolean;
  readonly caption?: string;
  readonly media: VideoProps;
}

export default function ResourcesVideo({
  fullWidth,
  caption,
  media,
}: ResourcesVideoProps) {
  return (
    <MediaWrapper fullWidth={fullWidth}>
      <Video {...media} preloadCopy={caption} />
    </MediaWrapper>
  );
}
