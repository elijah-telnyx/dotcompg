import { keyframes, styled } from 'ui/styles';
import Section from 'ui/components/Section';
import Heading from 'ui/components/Typography/Heading';
import Button from 'ui/components/Button';

export const SectionWrapper = styled(Section, {
  '@large': {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      width: '100%',
    },
  },
});

export const TaglineWrapper = styled('div', {
  marginBottom: '$medium',
  '@medium': {
    marginBottom: '$xl',
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

export const WrapperButton = styled(Button);

export const WrapperErrorMessage = styled('div', {
  marginTop: '$small',
  '> div': {
    color: '$cream',
  },
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const WrapperCaptcha = styled('div', {
  opacity: 0,
  marginTop: '$xl',
  height: 82,
  animation: `${fadeIn} 0.5s ease-in-out forwards`,
});

export const DataWrapper = styled('div', {
  animation: `${fadeIn} 0.5s ease-in-out forwards`,
  marginTop: '$xxxl',
});

export const MediaWrapper = styled('div', {
  aspectRatio: 1,
  borderRadius: '$medium',
  $$size: '384px',
  height: '$$size',
  width: '$$size',
  '@medium': {
    borderRadius: '$large',
  },

  '@large': {
    $$size: '500px',
  },
  '@xl': {
    $$size: '550px',
  },

  '& img, & video, & > *': {
    height: 'inherit',
    width: 'inherit',
    aspectRatio: 'inherit',
    borderRadius: 'inherit',
  },
});

export const PhoneFieldWrapper = styled('div', {
  maxWidth: '256px',
  marginBottom: '$large',
  '@medium': {
    maxWidth: '352px',
    marginBottom: '$xl',
  },
});
