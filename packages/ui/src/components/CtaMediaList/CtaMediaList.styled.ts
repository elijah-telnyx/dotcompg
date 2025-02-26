import H from '../Typography/Heading';
import SectionComponent from '../Section';
import { styled } from '../../styles';

export const Section = styled(SectionComponent, {
  '@lessThanMedium': {
    '&:after': {
      content: '',
      display: 'block',
      width: 4,
      height: 100,
      marginInline: 'auto',
      backgroundColor: '$tan',
      marginTop: '$large',
    },
  },
});

export const Heading = styled(H, {
  marginBottom: '$xs',
  typography: '$h2.mobile',
  '@large': {
    marginBottom: '$medium',
    typography: '$h2',
  },
});

export const Paragraph = styled('p', {
  marginBottom: '$large',
  typography: '$p.lead.mobile',
  '@large': {
    marginBottom: '$xl',
    typography: '$p.lead',
  },
});

export const ContentBlock = styled('div', {
  textAlign: 'center',
  position: 'relative',
  backgroundColor: '$cream',
  width: 304,
  height: 'auto',
  marginInline: 'auto',
  paddingBlock: '$large',
  '@medium': {
    width: 312,
    paddingBlock: '$xxl',
  },
  '@large': {
    width: 544,
    paddingBlock: '$huge',
  },
});
