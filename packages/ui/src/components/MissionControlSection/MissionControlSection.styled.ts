import { styled } from '../../styles';

export const HeaderWrapper = styled('div', {
  textAlign: 'center',

  '@xs': {
    maxWidth: '315px',
    margin: '0 auto',
  },

  '@small': {
    maxWidth: '635px',
    margin: '0 auto',
  },

  '@medium': {
    maxWidth: '750px',
    margin: '0 auto',
  },

  '@large': {
    maxWidth: '850px',
    margin: '0 auto',
  },

  '@xl': {
    maxWidth: '1000px',
    margin: '0 auto',
  },
});
