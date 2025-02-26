import { useState } from 'react';
import constants from 'constants/env';
import GoogleGsi from 'components/scripts/GoogleGsi';
import Spinner from 'ui/components/Spinner';

import * as css from './GoogleGsiSignUpForm.styled';

export interface GoogleGsiSignUpFormProps {
  promo_code?: string;
  sift_session_id: string;
}

/**
 * Configs are over
 * @link https://console.cloud.google.com/auth/clients/459741600459-4rsluhr9vebe92socurqhkpt8ckqhul1.apps.googleusercontent.com?inv=1&invt=Abm1Iw&project=starry-embassy-851
 */
const GoogleGsiSignUpForm = ({ promo_code, sift_session_id }: GoogleGsiSignUpFormProps) => {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  return (
    <css.Wrapper data-testid='google-gsi-signup-form'>
      <css.Container>
        {!hasLoaded && <Spinner background='dark' />}
        {/* Script has to be at the same level as other google html elements otherwise an error is thrown on google load. Make sure marketing extra params are loaded before google sign-in loads */}
        {/* Make sure marketing extra params are loaded before google sign-in loads */}
        <GoogleGsi
          onLoad={() => {
            setHasLoaded(true);
          }}
        />

        <div
          id='g_id_onload'
          data-client_id={constants.GOOGLE.CLIENT_ID}
          data-login_uri={`${constants.protocol}://${constants.host}/api/gsi_login`}
          data-context='signup'
          data-ux_mode='redirect'
          // extra params
          data-promo_code={promo_code}
          data-sift_session_id={sift_session_id}
        ></div>

        <div
          className='g_id_signin'
          data-type='standard'
          data-shape='rectangle'
          data-theme='outline'
          data-text='signup_with'
          data-size='large'
          data-locale='en'
          data-logo_alignment='left'
          data-width='189'
        ></div>
      </css.Container>
    </css.Wrapper>
  );
};

export default GoogleGsiSignUpForm;
