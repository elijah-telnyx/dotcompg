import { styled } from 'ui/styles';
import Section from 'ui/components/Section';
import Heading from 'ui/components/Typography/Heading';
import Markdown from 'ui/components/Markdown';

Markdown.toString = () => '.markdown-code';
export const CodeMarkdown = styled(Markdown);

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
  marginBottom: '$small',
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

export const ResponseWrapper = styled('div', {
  backgroundColor: '$black',
  color: '$cream',
  padding: '$medium',
  borderRadius: '$medium',
  'overflow-y': 'auto',
  height: '400px',
  '@medium': {
    height: '420px',
  },
  '> pre code': {
    textWrap: 'balance',
    fontSize: '$xs',
    lineHeight: '$xxs',
  },
});

export const DefaultResponseWrapper = styled('div', {
  backgroundColor: '$black',
  color: '$cream',
  padding: '$medium',
  borderRadius: '$medium',
  display: 'flex',
  alignItems: 'left',
  justifyContent: 'top',
  flexDirection: 'column',
  'overflow-y': 'auto',
  height: '400px',
  '@medium': {
    height: '420px',
  },
  '> p': {
    textWrap: 'balance',
    fontSize: '$small',
  },
});

export const CopyButtonWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'end',
  marginBottom: '$xxs',
});
