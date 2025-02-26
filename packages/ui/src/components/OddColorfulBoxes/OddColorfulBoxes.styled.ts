import { css, styled } from '../../styles';
import Paragraph from '../Typography/Paragraph';
import Grid from '../Grid';
import Heading from '../Typography/Heading';
import { Base } from '../Typography/utils';
import { addOpacityToHex, getColor } from '../../utils/styles';
import { Checkmark } from '../Icons';

const hex95opacity = addOpacityToHex(0.95);

export const Container = styled(Grid.Container, {
  rowGap: '$large',

  '@small': {
    rowGap: '$xxl',
  },
});

/**
 * Content Box Styles
 */
const contentBoxStyle = css({
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '$xxl $medium',

  '& a::before': {
    content: ' ',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  '@medium': {
    padding: '$huge $large',
  },
  '@large': {
    padding: '$huge',
  },
  '@xl': {
    padding: '$huge calc($xh * 2)',
  },
});

export const RightBox = styled('div', contentBoxStyle, {
  position: 'relative',
  backgroundColor: '$cream',
  minHeight: 400,
  width: '90%',
  transform: 'translate(10%, -20px)',
  mixBlendMode: 'normal',
  borderTopLeftRadius: 20,
  borderBottomLeftRadius: 20,

  '@medium': {
    width: '50%',
    transform: 'translate(0, -96px)',
    position: 'absolute',
    right: 0,
  },
});

export const BoxWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  margin: '$xxxs 0px',

  '@medium': {
    flexDirection: 'row',
  },
});

export const CtaButtonWrapper = styled('div', {
  alignSelf: 'center',
  marginBlockStart: 'auto',
});

export const ParagraphCopy = styled(Paragraph, {
  marginTop: '$xs',
  '@medium': {
    marginTop: '$medium',
  },
});

export const ContainerCopy = styled('div', {
  marginTop: '$large',
  '@medium': {
    marginTop: '$xxl',
  },
  '@large': {
    padding: '0 $xxxl',
  },
  '@xl': {
    padding: '0 $xxxl',
  },
});

export const HeadingUpperCase = styled(Heading, {
  marginBottom: 20,
  textTransform: 'uppercase',
});

export const CheckIconWrapper = styled(Base('div'), {});

export const LeftBox = styled('div', contentBoxStyle, {
  position: 'relative',
  backgroundColor: '$green',
  minHeight: '400px',
  width: '90%',
  mixBlendMode: 'normal',
  opacity: 0.95,
  zIndex: 1,
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,

  '@medium': {
    width: '52%',
  },

  variants: {
    cardTheme: {
      green: {
        backgroundColor: hex95opacity(getColor('green')),
      },
      citron: {
        backgroundColor: hex95opacity(getColor('citron')),
      },
      blue: {
        backgroundColor: hex95opacity(getColor('blue')),
      },
      tan: {
        backgroundColor: hex95opacity(getColor('tan')),
      },
    },
  },
});

export const CheckmarkIcon = styled(Checkmark, {
  width: 24,
  height: 24,
  '@medium': {
    width: 32,
    height: 32,
  },
});
