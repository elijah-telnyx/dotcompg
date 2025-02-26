import { styled } from '../../styles';
import Section from '../Section';

export const ButtonsContainer = styled('div', {
  display: 'flex',
  gap: '$medium',
  '@small': {
    gap: '$small',
  },
  '@medium': {
    gap: '$large',
  },
});

export const Wrapper = styled(Section, {
  variants: {
    centered: {
      true: {
        textAlign: 'center',
        [`${ButtonsContainer}`]: {
          justifyContent: 'center',
          marginTop: '$large',
        },
      },
    },
  },
});
