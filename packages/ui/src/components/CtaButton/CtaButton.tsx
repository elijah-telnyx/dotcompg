import {
  isDarkBackgroundColor,
  type BackgroundColor,
} from '../../styles/constants/backgroundColorOptions';
import Button, { type ButtonProps } from '../Button';
import Link, { AnchorElement, type LinkProps } from '../Link';
import type { ThemedCSS } from '../../styles/config/stitches.config';
import type { HTMLAttributes, MouseEventHandler, ReactNode } from 'react';

export interface CTAButtonProps {
  href?: string;
  text: ReactNode;
  type: 'button' | 'link';
  buttonKind?: ButtonProps['kind'];
  buttonIcon?: ButtonProps['icon'];
  buttonVariant?: ButtonProps['variant'];
  linkKind?: LinkProps['kind'];
  linkIcon?: LinkProps['icon'];
  linkDirection?: LinkProps['direction'];
  linkUnderlineColor?: LinkProps['underlineColor'];
  linkSize?: LinkProps['size'];
  linkNoIcon?: LinkProps['noIcon'];
  /**
   * Used internally to control the button background property
   * This field does't appear over the cms
   */
  backgroundColor?: BackgroundColor;
  css?: ThemedCSS;
  className?: HTMLAttributes<
    HTMLAnchorElement | HTMLButtonElement
  >['className'];
  htmlAs?: keyof JSX.IntrinsicElements | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  title?: string;
  target?: LinkProps['target'];
  rel?: LinkProps['rel'];
}

const CtaButton = ({
  text,
  backgroundColor,
  type,
  buttonKind,
  buttonIcon,
  linkKind,
  linkIcon,
  linkUnderlineColor,
  linkDirection,
  linkSize,
  linkNoIcon,
  buttonVariant,
  // This is a workaround to avoid unwanted props to be passed to the button or link
  title: _title,
  ...otherProps
}: CTAButtonProps) => {
  if (type === 'button') {
    return (
      <Button
        htmlAs={AnchorElement}
        background={isDarkBackgroundColor(backgroundColor) ? 'dark' : 'light'}
        kind={buttonKind}
        icon={buttonIcon}
        variant={buttonVariant}
        {...otherProps}
      >
        {text}
      </Button>
    );
  }
  if (type === 'link') {
    return (
      <Link
        kind={linkKind}
        icon={linkIcon}
        dark={isDarkBackgroundColor(backgroundColor)}
        direction={linkDirection}
        underlineColor={linkUnderlineColor}
        size={linkSize}
        noIcon={linkNoIcon}
        {...otherProps}
      >
        {text}
      </Link>
    );
  }
  throw Error(`Type is invalid,\nexpected: link or button\nreceived: ${type}`);
};

export default CtaButton;
