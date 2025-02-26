import { verifyCaptcha } from 'services/publicApiService';
import constants from 'constants/env';

import NextScript from 'next/script';
import type { GoogleReCAPTCHA, OnVerify, WindowWithRecaptcha } from './types';
import useTimer from 'hooks/useTimer';

const SITE_KEY_V3 = constants.reCAPTCHA.v3.siteKey;

const MIN_SCORE_TO_VALIDATE = 0.8;
/**
 * reCAPTCHA token expire after 2min
 * Set to 1.5min to give a safety space
 * https://developers.google.com/recaptcha/docs/v3#placement_on_your_website
 */
const SECONDS_TO_RESET_CAPTCHA_V3 = 90;
const VERSION = '3';

const getReCAPTCHAToken = async (grecaptcha: GoogleReCAPTCHA, action?: string): Promise<string> =>
  await grecaptcha.execute(SITE_KEY_V3, {
    action,
  });

interface useRecaptchaV3Props {
  onVerify: OnVerify;
  action?: string;
}

export const useRecaptchaV3 = ({ onVerify, action }: useRecaptchaV3Props) => {
  const [resetTokenTimer] = useTimer({
    secondsToTrigger: SECONDS_TO_RESET_CAPTCHA_V3,
  });

  const validateTokenScore = (token: string) =>
    verifyCaptcha({ token, version: VERSION }).then((response) => {
      console.log(`Recaptcha V3 score: ${response?.score}`);
      if (Number(response?.score) <= MIN_SCORE_TO_VALIDATE) {
        console.log(response);
      }
      return response?.success;
    });

  const getAndValidateToken = async (grecaptcha: GoogleReCAPTCHA, resetting?: boolean) => {
    if (resetting) {
      console.log('Resetting Recaptcha token');
    }

    /**
     * Get and validate user score
     */
    const token = await getReCAPTCHAToken(grecaptcha, action);
    const isValid = await validateTokenScore(token);

    if (!isValid) {
      return {
        isValid: false,
      };
    }

    /**
     * Generate a new token to send to the api that will use the Recaptcha
     * This is required because the previous used token is now invalid
     */
    const submissionToken = await getReCAPTCHAToken(grecaptcha, action).then((data) => {
      /**
       * We need to reset tokens as they expire after two minutes.
       * V3 has no expiration callback
       * https://developers.google.com/recaptcha/docs/v3
       * https://github.com/google/recaptcha/issues/281
       */
      resetTokenTimer(() => getAndValidateToken(grecaptcha, true));
      return data;
    });

    if (resetting) {
      onVerify({ hasLoaded: true, version: VERSION, isValid, token: submissionToken });
    }

    return {
      isValid,
      token: submissionToken,
    };
  };

  /**
   * When the script loads it will try to get the Google Recaptcha object
   * that will be in window.
   * When that object is ready we will try to get the user score and validate it
   */
  const onGoogleRecaptchaInit = () => {
    const grecaptcha = (global.window as WindowWithRecaptcha)?.grecaptcha;
    if (grecaptcha) {
      grecaptcha.ready(async () => {
        const { isValid, token } = await getAndValidateToken(grecaptcha);
        onVerify({ hasLoaded: true, version: VERSION, isValid, token });
      });
    } else {
      onVerify({ hasLoaded: false, isValid: false, version: VERSION });
    }
  };

  return { getAndValidateToken: onGoogleRecaptchaInit };
};

interface RecaptchaV3ScriptProps {
  onLoad: (cb: () => void) => void;
}

export const RecaptchaV3Script = ({ onLoad }: RecaptchaV3ScriptProps) => (
  <NextScript
    id='recaptcha_script'
    onLoad={onLoad}
    src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY_V3}`}
    strategy='afterInteractive'
  />
);

export default useRecaptchaV3;
