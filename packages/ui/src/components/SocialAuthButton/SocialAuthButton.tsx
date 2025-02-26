import { forwardRef, useState, type ForwardedRef } from 'react';
import type { ButtonProps } from '../Button';
import IconMicrosoft from '../Icons/Microsoft';
import IconGoogle from '../Icons/Google';
import { Kind } from './constants';
import * as css from './SocialAuthButton.styled';
import Button from '../Button';

export interface SocialAuthButtonProps
  extends Pick<ButtonProps, 'children' | 'loading' | 'loadingWidth'> {
  /**
   * URL
   */
  label: string;
  endpoint?: string;
  campaign: keyof typeof Kind;
  promo_code?: string;
  sift_session_id?: string;
  onClick?: () => void;
  buttonKind?: ButtonProps['kind'];
}

const IconsMap = {
  [Kind.microsoft_graph]: IconMicrosoft,
  [Kind.google]: IconGoogle,
};

const SocialAuthButton = (
  {
    endpoint,
    campaign,
    label,
    promo_code,
    sift_session_id,
    onClick,
    children,
    buttonKind = 'social',
    ...props
  }: SocialAuthButtonProps,
  ref: ForwardedRef<HTMLFormElement>
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const Icon = IconsMap[campaign];

  const onClickButton = () => {
    setLoading(true);

    if (onClick) onClick();
  };

  const onSubmit = () => {
    setLoading(true);
  };

  if (!endpoint) {
    return (
      <Button
        loading={loading}
        {...props}
        onClick={onClickButton}
        type='button'
        kind={buttonKind}
      >
        <css.ButtonContent>
          <Icon />
          {children}
        </css.ButtonContent>
      </Button>
    );
  }

  return (
    <css.Form
      action={`${endpoint}/${campaign}`}
      method='POST'
      aria-label={label}
      ref={ref}
      onSubmit={onSubmit}
    >
      <Button loading={loading} {...props} type='submit' kind={buttonKind}>
        <css.ButtonContent>
          <Icon />
          {children}
        </css.ButtonContent>
      </Button>

      {promo_code && (
        <input type='hidden' name='promo_code' value={promo_code} />
      )}
      {sift_session_id && (
        <input type='hidden' name='sift_session_id' value={sift_session_id} />
      )}
    </css.Form>
  );
};

export default forwardRef<HTMLFormElement, SocialAuthButtonProps>(
  SocialAuthButton
);
