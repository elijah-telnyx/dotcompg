import { styled } from '../../../styles';
import type { ComponentProps } from '@stitches/react';

const CardWrapper = styled('div', {
  backgroundColor: '$white',
  boxShadow: '0px 10px 30px 0px #0000001A',
  padding: '$small',
  paddingBottom: '$medium',
  borderRadius: '$large',
  position: 'relative',
  '@small': {
    padding: '$large',
  },
  variants: {
    modal: {
      true: {
        '@lessThanSmall': {
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
        },
      },
    },
  },
});

export function InferenceRoot({
  children,
  modal,
  ...props
}: ComponentProps<typeof CardWrapper>) {
  return (
    <CardWrapper {...props} modal={modal}>
      {children}
    </CardWrapper>
  );
}
