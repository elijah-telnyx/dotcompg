import { useEffect, useState } from 'react';
import * as css from './CopyButton.styled';
import type { ComponentProps } from '@stitches/react';

export interface CopyButtonProps {
  copy: string;
  isDark?: boolean;
  buttonTextPosition?: ComponentProps<typeof css.ButtonText>['position'];
}

const copyText = (text: string) => navigator.clipboard.writeText(text);

const CopyButton = ({
  copy,
  isDark = false,
  buttonTextPosition = 'left',
}: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const buttonText = isCopied ? 'Copied!' : 'Copy';

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isCopied) {
      timer = setTimeout(() => {
        setIsCopied(false);
      }, css.fadeOutTimer * 1000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isCopied]);

  return (
    <css.Button
      type='button'
      onClick={() => {
        copyText(copy);
        setIsCopied(true);
      }}
      isDark={isDark}
    >
      <css.ButtonText
        data-state={buttonText.replace('!', '').toLowerCase()}
        position={buttonTextPosition}
      >
        {buttonText}
      </css.ButtonText>
      <css.Icon />
    </css.Button>
  );
};

export default CopyButton;
