import type { ReactNode } from 'react';
import Spinner from '../Spinner';
import { MediaSVG, type MediaProps } from '../Media';
import { Background, Kind, Variant, Width } from './constants';
import * as css from './Button.styled';
import type { ComponentProps } from '@stitches/react';

export type ButtonProps<T extends keyof JSX.IntrinsicElements = 'button'> =
  React.ComponentPropsWithoutRef<T> &
    ComponentProps<typeof css.Button> & {
      /**
       * Define if it will have background or just borders
       */
      kind?: keyof typeof Kind;
      /**
       * Define the button colors based on the background
       */
      background?: keyof typeof Background;
      /**
       * For specific use cases
       */
      variant?: keyof typeof Variant;
      /**
       * Content of the button
       */
      children: ReactNode;
      htmlAs?: keyof JSX.IntrinsicElements;
      href?: string;
      loading?: boolean;
      loadingWidth?: number;
      /**
       * Add an icon to the right side of the link text
       */
      icon?: MediaProps<'svg'>;
      Icon?: ReactNode;
    };

type ButtonText = Pick<ButtonProps, 'children' | 'Icon' | 'icon'>;

const ButtonText = ({ children, Icon, icon }: ButtonText) => {
  return (
    <>
      {children}
      {Icon && <css.ButtonIcon>{Icon}</css.ButtonIcon>}
      {icon && (
        <css.ButtonIcon>
          <MediaSVG {...icon} />
        </css.ButtonIcon>
      )}
    </>
  );
};

function Button<T extends keyof JSX.IntrinsicElements = 'button'>({
  children,
  kind = Kind.primary,
  background = Background.light,
  variant,
  htmlAs,
  loading,
  loadingWidth = Width.default,
  onClick,
  Icon,
  icon,
  ...props
}: ButtonProps<T>) {
  function onClickEvent(event: React.MouseEvent<HTMLButtonElement>) {
    if (loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  }

  return (
    <css.Button
      as={htmlAs}
      background={background}
      kind={kind}
      variant={variant}
      {...props}
      onClick={onClickEvent}
    >
      {loading ? (
        <css.SpinnerWrapper css={{ paddingInline: loadingWidth }}>
          <Spinner background={background} />
        </css.SpinnerWrapper>
      ) : (
        <>
          <css.ButtonContent>
            <ButtonText Icon={Icon} icon={icon}>
              {children}
            </ButtonText>
          </css.ButtonContent>
          <css.ShadowText aria-hidden='true'>
            <ButtonText Icon={Icon} icon={icon}>
              {children}
            </ButtonText>
          </css.ShadowText>
        </>
      )}
    </css.Button>
  );
}
export default Button;
