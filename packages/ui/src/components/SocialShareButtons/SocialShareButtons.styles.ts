import { styled } from '../../styles';
import TypographyCTA from '../Typography/CTA';

// typography save some spacing at the bottom for specific characters like "g".
const typographyOffset = '4px';

export const Wrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$xs',
  '& > button': {
    display: 'flex',
    alignItems: 'center',
  },
});

export const Label = styled(TypographyCTA, {
  textTransform: 'uppercase',
  marginBlockEnd: `-${typographyOffset}`,
});
