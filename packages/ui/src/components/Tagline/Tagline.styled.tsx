import { styled } from '../../styles';
import { Heading2Category } from '../Typography/Heading/Heading.styled';

export const Tagline = styled(Heading2Category, {
  variants: {
    withColor: {
      true: {
        padding: '$xs',
        paddingBottom: '$xxs', // reduced because of font bottom spacing
        borderRadius: '$large',
        maxWidth: 'fit-content',
      },
    },
    mobileTypography: {
      true: {
        typography: '$h2.category.mobile',
      },
    },
  },
});
