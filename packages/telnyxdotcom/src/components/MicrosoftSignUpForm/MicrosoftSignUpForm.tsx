import type { ReactNode } from 'react';
import constants from 'constants/env';
import SocialAuthButton, { type SocialAuthButtonProps } from 'ui/components/SocialAuthButton';

export interface MicrosoftSignUpFormProps {
  children: ReactNode;
  promo_code?: string;
  sift_session_id: string;
  buttonKind: SocialAuthButtonProps['buttonKind'];
  loadingWidth?: SocialAuthButtonProps['loadingWidth'];
}

const MicrosoftSignUpForm = ({
  children,
  promo_code,
  sift_session_id,
  buttonKind,
  loadingWidth,
}: MicrosoftSignUpFormProps) => {
  return (
    <SocialAuthButton
      endpoint={`${constants.api.BASE_URL}/users/auth`}
      campaign='microsoft_graph'
      label='microsoft-signup-form'
      promo_code={promo_code}
      sift_session_id={sift_session_id}
      buttonKind={buttonKind}
      loadingWidth={loadingWidth}
    >
      {children}
    </SocialAuthButton>
  );
};

export default MicrosoftSignUpForm;
