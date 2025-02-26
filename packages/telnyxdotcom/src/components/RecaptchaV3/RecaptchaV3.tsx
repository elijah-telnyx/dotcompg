import { useEffect } from 'react';
import useRecaptchaV3, { RecaptchaV3Script } from '../Recaptcha/Recaptcha';

export type RecaptchaVerifiedProps = {
  token?: string;
  isValid?: boolean;
};

export type RecaptchaV3Props = {
  /**
   * action of the recaptcha V3 verification
   * this value is only important for google algorithms
   */
  action: 'homepage' | 'login' | 'social' | 'e-commerce' | 'marketing';
  /**
   * function that is called when the user is successfully verified
   */
  onRecaptchaVerified: ({ token, isValid }: RecaptchaVerifiedProps) => void;
  /**
   * Optional value to reset the recaptcha when form failed to submit
   */
  submitFailed?: boolean;
};

/**
 * reCAPTCHA_site_key generated on google system
 * You can access the current ones here:
 * @link https://www.google.com/recaptcha/admin/site/343163267
 * If you don't have access send a message over #help-dotcom
 * @link https://telnyx.slack.com/archives/CL0EKKQ3C
 */

const resetLog = () => {
  // Needed to log recaptcha interaction on Session Replay
  console.log('Recaptcha reset');
};

/**
 * Recaptcha wrapper
 * Tries to verify user following recaptchaV3 system
 * IMPORTANT NOTE: this component should NOT be rendered in the server
 */
const Recaptcha = ({ action, onRecaptchaVerified, submitFailed }: RecaptchaV3Props) => {
  const { getAndValidateToken } = useRecaptchaV3({
    onVerify: async function executeV3Verification({ token, isValid }) {
      try {
        if (isValid) {
          console.log('Recaptcha v3 verified');
          return onRecaptchaVerified({ token, isValid: true });
        }
      } catch (e: any) {
        console.log('recaptch v3 fails', e);
      }
    },
    action,
  });

  const resetRecaptcha = () => {
    resetLog();

    getAndValidateToken();
  };

  useEffect(() => {
    if (submitFailed) {
      resetRecaptcha();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitFailed]);

  return <RecaptchaV3Script onLoad={getAndValidateToken} />;
};

export default Recaptcha;
