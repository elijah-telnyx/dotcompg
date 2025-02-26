import { styled } from '../../styles';
import Section from '../Section';
import Grid from '../Grid';

export const SectionWrapper = styled(Section);

export const Container = styled(Grid.Container, {
  rowGap: '$large',

  '@medium': {
    rowGap: '$xxl',
  },

  '@xl': {
    rowGap: 0,
  },
});

export const MediaItem = styled(Grid.Item, {
  variants: {
    reverse: {
      true: {
        order: 1,
        marginTop: '$xxl',
        '@medium': {
          marginTop: 0,
          order: 2,
        },
      },
      false: {
        marginTop: '$xs',
        order: 2,
        '@medium': {
          marginTop: 0,
        },
        '@large': {
          order: 'inherit',
        },
      },
    },
  },
});
