import { useId, useRef, type InputHTMLAttributes } from 'react';
import { config, styled } from '../../../styles';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import ArrowUp from '../../Icons/ArrowUp';
import { ActionButton } from '../../Button';
import { useGradient } from '../../../utils/hooks/useGradient';

const MAX_HEIGHT = 168;
const MIN_HEIGHT = 50;
const WITH_GRADIENT_BORDER_RADIUS = '20px';
const BORDER_RADIUS = config.theme.radii.xxxl;
const INLINE_PADDING = config.theme.space.small;

// Clamps a value between a minimum and maximum
const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

const adjustHeight = ({ target }: { target: HTMLTextAreaElement }) => {
  const textarea = target;
  textarea.style.height = MIN_HEIGHT + 'px';
  textarea.style.height =
    clamp(textarea.scrollHeight, MIN_HEIGHT, MAX_HEIGHT) + 'px';

  if (textarea.scrollHeight > MIN_HEIGHT) {
    textarea.style.borderRadius = WITH_GRADIENT_BORDER_RADIUS;
  } else {
    textarea.style.borderRadius = BORDER_RADIUS;
  }
};

const gradientStart = '#E6E3D3 15%';
const gradientEnd = 'rgba(230, 227, 211, 0) 100%';

const gradientStyles = {
  '&:before': {
    content: '',
    position: 'absolute',
    width: `calc(100% - ${INLINE_PADDING})`,
    inset: 1,
    height: 0,
    transition: 'height 0.3s ease-out',
    pointerEvents: 'none',
  },
  variants: {
    hasGradient: {
      true: {
        '&:before': {
          borderRadius: WITH_GRADIENT_BORDER_RADIUS,
          height: MIN_HEIGHT,
          background: `linear-gradient(180deg, ${gradientStart}, ${gradientEnd})`,
        },
      },
    },
  },
};

const MessageController = styled('form', {
  position: 'relative',
  width: '100%',
  display: 'grid',
  ...gradientStyles,
});

const Input = styled('textarea', {
  height: MIN_HEIGHT,
  maxHeight: MAX_HEIGHT,
  typography: '$p',
  border: '1px solid',
  borderColor: 'transparent',
  borderRadius: BORDER_RADIUS,
  backgroundColor: '$tan',
  padding: INLINE_PADDING,
  paddingLeft: '$large',
  color: '$black',
  width: '100%',
  resize: 'none',
  '::placeholder': {
    color: '$grayHoverLightBackground',
  },
  outline: 'none',
  '&:hover': {
    borderColor: '$black',
  },
  '&:focus': {
    outline: '1px solid $green',
    borderColor: '$green',
  },
  // Button width(36) + inline padding (12 total)
  paddingRight: '$xxl',
  '&:disabled': {
    opacity: 0.75,
    cursor: 'not-allowed',
  },
});

const Button = styled(ActionButton, {
  position: 'absolute',
  right: 6,
  bottom: 6,
});

export interface InferenceMessageInputProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  onMessage: (messageText: string) => void;
  isButtonDisabled?: boolean;
}

export function InferenceMessageInput({
  label,
  id,
  onMessage,
  isButtonDisabled,
  ...inputProps
}: InferenceMessageInputProps) {
  const containerRef = useRef<HTMLTextAreaElement>(null);
  const { hasGradient } = useGradient({ containerWithScrollRef: containerRef });
  const generatedId = useId();
  const inputId = id || generatedId;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (inputProps.onChange) {
      inputProps.onChange(e);
    }
    adjustHeight({ target: e.currentTarget });
  };

  const handleEnterKeyOnMessageInput = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        return;
      }
      onMessage(event.currentTarget.value.trim());
    }
  };

  return (
    <MessageController
      onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const messageText = form.get('message');
        if (messageText) {
          onMessage(messageText.toString());
        }
      }}
      hasGradient={hasGradient}
    >
      <VisuallyHidden.Root>
        <label htmlFor={inputId}>{label}</label>
      </VisuallyHidden.Root>
      <Input
        ref={containerRef}
        {...inputProps}
        id={inputId}
        name='message'
        onChange={handleChange}
        onKeyDown={handleEnterKeyOnMessageInput}
        rows={1}
      />
      <Button
        type='submit'
        label='Send message'
        icon={ArrowUp}
        disabled={isButtonDisabled || inputProps.disabled}
      />
    </MessageController>
  );
}
