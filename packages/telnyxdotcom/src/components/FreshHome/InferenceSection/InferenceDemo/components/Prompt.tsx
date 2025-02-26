import { useRef } from 'react';
import { useGradient } from 'ui/utils/hooks/useGradient';
import { config, styled } from 'ui/styles';

export type PromptProps = Omit<React.ComponentProps<typeof Textarea>, 'rows' | 'cols'>;

const MAX_HEIGHT = 296;
const MAX_LENGTH = 630;

const adjustHeight = ({ target }: { target: HTMLTextAreaElement }) => {
  const textarea = target;
  textarea.style.height = minHeight + 'px';
  textarea.style.height = Math.min(textarea.scrollHeight, MAX_HEIGHT) + 'px';
};

const Prompt = (props: PromptProps) => {
  const containerRef = useRef<HTMLTextAreaElement>(null);
  const { hasGradient } = useGradient({ containerWithScrollRef: containerRef });

  return (
    <Wrapper hasGradient={hasGradient}>
      <Textarea
        ref={containerRef}
        {...props}
        maxLength={MAX_LENGTH}
        onChange={(e) => {
          if (props.onChange) {
            props.onChange(e);
          }
          adjustHeight({ target: e.currentTarget });
        }}
      />
    </Wrapper>
  );
};

export default Prompt;

const gradientStart = '#E6E3D3 15%';
const gradientEnd = 'rgba(230, 227, 211, 0) 100%';

const WITH_GRADIENT_BORDER_RADIUS = '16px';
const INLINE_PADDING = config.theme.space.xs;

const gradientStyles = {
  '&:before': {
    content: '',
    position: 'absolute',
    width: `calc(100% - ${INLINE_PADDING})`,
    inset: 1, // 1px to account for border
    height: 0,
    transition: 'height 0.3s ease-out',
    pointerEvents: 'none',
  },
  variants: {
    hasGradient: {
      true: {
        '&:before': {
          borderRadius: WITH_GRADIENT_BORDER_RADIUS,
          height: 48,
          background: `linear-gradient(180deg, ${gradientStart}, ${gradientEnd})`,
        },
      },
    },
  },
};

const minHeight = 56;

const Wrapper = styled('div', {
  position: 'relative',
  width: '100%',
  display: 'grid',

  ...gradientStyles,
});

export const Textarea = styled('textarea', {
  borderRadius: '$medium',
  padding: '$xs $small',
  backgroundColor: '$tan',
  resize: 'none',
  width: '100%',
  minHeight,
  fontFamily: '$inter',
  fontSize: '$xs',
  lineHeight: '$xs',
  overflow: 'hidden',
  '&:placeholder': {
    color: 'grayHoverDarkBackground',
  },
  '&:focus, &:active': {
    outline: 'none',
  },
  ['&:disabled']: {
    opacity: 0.4,
    pointerEvents: 'none',
    cursor: 'not-allowed',
  },
  maxHeight: MAX_HEIGHT,
  overflowY: 'auto',
});
