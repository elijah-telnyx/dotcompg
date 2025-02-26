import { styled, theme } from '../../styles';
import Section from '../Section';
import Media from '../Media';
import Heading from '../Typography/Heading';
import Grid from '../Grid';

export const TaglineWrapper = styled('div', {
  marginBottom: '$medium',
  '@medium': {
    marginBottom: '$xl',
  },
});

export const SectionWrapper = styled(Section, {
  '@large': {
    display: 'flex',
    alignItems: 'center',
    height: '748px',
    '& > *': {
      width: '100%',
    },
  },
});

export const ImageItem = styled(Grid.Item, {});

export const TextWrapper = styled('div', {
  display: 'grid',
  justifyContent: 'left',
  alignItems: 'end',
  gap: '$xxl',
  gridArea: 'main',
});

export const CtaWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$xs',
  '@medium': {
    gap: '$small',
  },
});

export const CtaCopyWrapper = styled('div', {
  marginTop: '$xs',
  '@medium': {
    marginTop: '$small',
  },
});

const viewport = `min(100vw, ${theme.viewports.xl})`;

export const Image = styled(Media, {
  $$numberOfColumns: 4,
  $$gridWidth: theme.gridMaxWidth.base,
  $$space: `calc((${viewport} - $$gridWidth)/ $$numberOfColumns)`,
  position: 'relative',
  maxWidth: 'initial',
  width: `min(100vw, ${theme.viewports.xs}) !important`, // on static build, this gets overwritten
  '@lessThanSmall': {
    marginTop: '$small',
  },
  '@small': {
    width: `calc(100% + $$space) !important`,
    $$gridWidth: theme.gridMaxWidth.small,
  },
  '@medium': {
    $$gridWidth: theme.gridMaxWidth.medium,
    $$numberOfColumns: 6,
  },
  '@large': {
    $$gridWidth: theme.gridMaxWidth.large,
    $$numberOfColumns: 5,
  },
  '@xl': {
    $$gridWidth: theme.gridMaxWidth.xl,
  },
});

export const WrapperCopy = styled('div', {
  marginTop: '$xs',
  marginBottom: '$large',

  '@medium': {
    marginTop: '$small',
    marginBottom: '$xl',
  },
  '@large': {
    marginTop: '$large',
    marginBottom: '$xxl',
  },
});

export const HeadingOne = styled(Heading, {
  '@medium': {
    typography: '$h1.alt',
  },
  '@large': {
    typography: '$h1',
  },
});

export const ChannelsWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$xs $medium',
  marginBlock: '$xl $large',
  '@large': {
    marginBlock: '$xxl 0',
  },
});
