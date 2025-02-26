import { keyframes, styled } from 'ui/styles';
import Grid from 'ui/components/Grid';
import CtaButton from 'ui/components/CtaButton';
import Link from 'ui/components/Link';
import Paragraph from 'ui/components/Typography/Paragraph';

const FORM_MAX_WIDTH = 454;
const SEPERATION_TOP_MARGIN = 150;

export const FormContainer = styled(Grid.Container, {
  paddingTop: '120px',
});

export const ItemWrapper = styled(Grid.FullWidthItem, {
  margin: '0 auto',
  '@small': {
    width: FORM_MAX_WIDTH,
  },
});

export const ContentWrapper = styled('div', {
  '> strong, > h3, > p': {
    textAlign: 'Center',
  },

  '> strong': {
    color: '$grayHoverDarkBackground',

    '& svg': {
      verticalAlign: 'middle',
    },
  },
});

const fillBar = keyframes({
  '0%': { width: '0%' },
  '100%': { width: '100%' },
});

export const LoadingBar = styled('div', {
  margin: '$large 0',
  height: 8,
  width: '100%',
  backgroundColor: '$tan',
  borderRadius: '$medium',
  position: 'relative',
  '&:after': {
    borderRadius: 'inherit',
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    animation: `${fillBar} 5000ms ease-in-out infinite`,
    backgroundColor: '$green',
  },
});

export const CallParagraph = styled(Paragraph, {
  maxWidth: 371,
  margin: '0 auto',
});

export const CallNumber = styled(Link, {
  display: 'block',
  maxWidth: 'fit-content',
  margin: `${SEPERATION_TOP_MARGIN}px auto 0`,
  typography: '$h3',
  fontSize: 18,
});

export const FirstBackLink = styled(Link, {
  color: '$grayHoverDarkBackground',
  display: 'block',
  margin: '100px auto 0',
  width: 200,
});

export const BackLink = styled(Link, {
  color: '$grayHoverDarkBackground',
  variants: {
    above: {
      true: {
        textAlign: 'center',
        display: 'block',
        marginBottom: '$xxxl',
      },
    },
  },
});

export const ContactUsButton = styled(CtaButton, {
  color: '$grayHoverDarkBackground',
  maxWidth: 156,
  justifySelf: 'end',
});

export const LastCtaWrapper = styled('div', {
  marginTop: SEPERATION_TOP_MARGIN,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'flex-end',
});

export const DontWantToWait = styled('div', {
  textAlign: 'center',
  '& button span': {
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'none',
    },
  },
});
