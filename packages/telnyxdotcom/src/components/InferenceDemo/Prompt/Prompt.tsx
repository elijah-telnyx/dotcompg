import { config } from 'ui/styles';
import useMedia from 'ui/utils/hooks/useMedia';
import * as css from './Prompt.styled';
import { forwardRef, useLayoutEffect, useRef, type ForwardedRef } from 'react';

export type PromptProps = Omit<React.ComponentProps<typeof css.Textarea>, 'rows' | 'cols'>;

const adjustHeight = ({ target, viewport }: { target: HTMLTextAreaElement; viewport: 'desktop' | 'mobile' }) => {
  const textarea = target;
  const minHeight = viewport === 'desktop' ? css.minHeightDesktop : css.minHeightMobile;
  textarea.style.height = minHeight + 'px';
  textarea.style.height = textarea.scrollHeight + 'px';
};

const MAX_LENGTH = {
  desktop: 630,
  mobile: 200,
};

const Prompt = ({ theme = 'dark', ...props }: PromptProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
  const isMedium = useMedia(config.media.medium, false);
  const characterCountRef = useRef<HTMLDivElement>(null);
  const maxLength = props.maxLength || isMedium ? MAX_LENGTH.desktop : MAX_LENGTH.mobile;

  const setCharacterCount = (value: number | undefined = 0) => {
    if (characterCountRef.current) {
      characterCountRef.current.innerText = `${value}/${maxLength}`;
    }
  };

  useLayoutEffect(() => setCharacterCount(props?.value?.toString().length), [maxLength, props.value]);

  return (
    <>
      <css.Textarea
        ref={ref}
        {...props}
        maxLength={maxLength}
        theme={theme}
        onChange={(e) => {
          if (props.onChange) {
            props.onChange(e);
          }
          setCharacterCount(e.currentTarget.value.length);
          adjustHeight({ target: e.currentTarget, viewport: isMedium ? 'desktop' : 'mobile' });
        }}
      />
      <css.CharacterCount ref={characterCountRef}></css.CharacterCount>
    </>
  );
};

export default forwardRef<HTMLTextAreaElement, PromptProps>(Prompt);
