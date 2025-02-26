import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useRef } from 'react';
import { errorLogger } from 'utils/errorHandler/errorLogger';

export interface CaptchaProps {
  sitekey: string;
  executeOnLoad?: boolean;
  lockPageScrollOnOpen?: boolean;
  onVerify: (token: string, ekey: string) => void;
  onExpire?: () => void;
}

declare global {
  interface Window {
    hcaptcha: {
      reset: HCaptcha['resetCaptcha'];
    };
  }
}

const Captcha = ({ sitekey, onVerify, onExpire, executeOnLoad = true, lockPageScrollOnOpen = true }: CaptchaProps) => {
  const captchaRef = useRef<HCaptcha>(null);

  const onCaptchaLoad = () => {
    if (!executeOnLoad) return;
    // this reaches out to the hCaptcha JS API and runs the
    // execute function on it. you can use other functions as
    // documented here:
    // https://docs.hcaptcha.com/configuration#jsapi
    if (captchaRef?.current) captchaRef.current.execute();
    else errorLogger({ error: new Error('captchaRef.current is null on load') });
  };

  const onCaptchaError = (event: string) => {
    errorLogger({ error: new Error(`Captcha failed to load. ${event}`) });
    if (captchaRef?.current) captchaRef.current.execute();
  };

  const lockPageScroll = () => {
    if (!lockPageScrollOnOpen) return;
    document.body.classList.add('no-scroll');
  };

  const unlockPageScroll = () => {
    if (!lockPageScrollOnOpen) return;
    document.body.classList.remove('no-scroll');
  };

  const handleVerify = (token: string, ekey: string) => {
    unlockPageScroll();
    if (onVerify) onVerify(token, ekey);
  };

  return (
    <HCaptcha
      sitekey={sitekey}
      onVerify={handleVerify}
      ref={captchaRef}
      onLoad={onCaptchaLoad}
      onError={onCaptchaError}
      onExpire={onExpire}
      onOpen={lockPageScroll}
      onClose={unlockPageScroll}
    />
  );
};

export default Captcha;
