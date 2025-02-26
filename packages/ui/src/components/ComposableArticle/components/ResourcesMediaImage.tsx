import { styled } from '../../../styles';
import Media, { type MediaProps } from '../../Media';

const MediaWrapper = styled('div', {
  variants: {
    fullWidth: {
      true: {
        zIndex: 1,
        width: '100vw',
        height: 'auto',
        aspectRatio: '16/9',
        position: 'relative',
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

        '& img': {
          display: 'block',
          aspectRatio: 'inherit',
          width: 'inherit',
          height: 'auto',
        },
      },
      false: {
        '& img': {
          borderRadius: '$medium',
          '@medium': {
            borderRadius: '$large',
          },
        },
      },
    },
  },
});

type ResourcesMediaImageProps = Readonly<
  MediaProps<'img'> | MediaProps<'svg'>
> & {
  fullWidth?: boolean;
};

export default function ResourcesMediaImage({
  fullWidth,
  ...props
}: ResourcesMediaImageProps) {
  return (
    <MediaWrapper fullWidth={fullWidth}>
      <Media {...props} />
    </MediaWrapper>
  );
}
