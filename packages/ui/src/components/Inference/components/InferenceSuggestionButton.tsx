import type { HTMLAttributes, PropsWithChildren } from 'react';
import { styled } from '../../../styles';

const Chip = styled('button', {
  typography: '$p.caption.mobile',
  fontStyle: 'normal',
  backgroundColor: '$white',
  border: '1px solid $tan',
  color: '$grayHoverLightBackground',
  padding: '$xs $medium',
  borderRadius: '$xxxl',
  transition: 'all 0.2s ease-out',
  textWrap: 'nowrap',
  '&:hover, &:focus, &:active': {
    color: '$white',
  },
  '&:hover, &:focus': {
    backgroundColor: '$grayHoverLightBackground',
    borderColor: '$grayHoverLightBackground',
  },
  '&:active': {
    color: '$white',
    borderColor: '$black',
    backgroundColor: '$black',
  },
});

export type InferenceSuggestionButtonProps = Omit<
  HTMLAttributes<HTMLButtonElement>,
  'type'
>;

export function InferenceSuggestionButton({
  children,
  ...props
}: PropsWithChildren<InferenceSuggestionButtonProps>) {
  return (
    <Chip type='button' {...props}>
      {children}
    </Chip>
  );
}
