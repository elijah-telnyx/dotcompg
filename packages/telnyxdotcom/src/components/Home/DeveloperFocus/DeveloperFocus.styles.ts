import SectionComponent from 'ui/components/Section';
import { styled } from 'ui/styles';

const backgroundColorTransition = 'all 300ms linear';

export const Section = styled(SectionComponent, {
  transition: backgroundColorTransition,
});

export const TextBlock = styled('div', {
  display: 'grid',
  gap: '$large',
  marginInline: 'auto',
  width: '100%',
  maxWidth: '$gridMaxWidth$base',
  '@xs': {
    maxWidth: '$gridMaxWidth$xs',
  },
  paddingBlock: '$xxl',
  textAlign: 'left',
  '@small': {
    maxWidth: '$gridMaxWidth$small',
  },
  '@medium': {
    gap: '$xl',
    paddingInline: '$xl',
    maxWidth: 544,
  },
  '@large': {
    paddingBlock: '$huge',
  },
});

export const CodeBlockWrapper = styled('div', {
  display: 'grid',
  placeItems: 'center',
  width: '100%',
  overflow: 'auto',
  maxWidth: '$gridMaxWidth$base',
  '@xs': {
    maxWidth: '$gridMaxWidth$xs',
  },

  '@lessThanMedium': {
    height: 'calc(100% - $space$medium)',
    marginInline: 'auto',
    maxWidth: '90%',
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      '& > [data-state="active"]': {
        flexBasis: '100%',
      },
    },
  },

  '@small': {
    maxWidth: '$gridMaxWidth$small',
  },
  '@medium': {
    padding: '$xl',
    maxWidth: '100%',
  },
});

export const MediaWrapper = styled('div', {
  height: '100%',
  width: '100%',
  display: 'grid',
  '& img': {
    marginBlock: 'auto',
    width: '100%',
  },
});
