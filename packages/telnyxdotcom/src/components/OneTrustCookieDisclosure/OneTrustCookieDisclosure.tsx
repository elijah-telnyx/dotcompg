import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Loading from 'ui/components/Icons/Loading';
import * as css from './OneTrustCookieDisclosure.styled';
import { errorLogger } from 'utils/errorHandler/errorLogger';

const ONE_TRUST_COOKIE_POLICY_ID = 'ot-sdk-cookie-policy';

const OneTrustCookieDisclosure = () => {
  const { isReady } = useRouter();

  useEffect(() => {
    if (isReady) {
      try {
        window.OneTrust.initializeCookiePolicyHtml();
      } catch (e) {
        errorLogger({ error: new Error('Failed to initialize cookie policy'), data: JSON.stringify(e, undefined, 2) });
      }
    }
  }, [isReady]);

  return (
    <css.Container>
      {/* This div is required to correctly render content inside GridItem */}
      <css.CookiePolicyItem id={ONE_TRUST_COOKIE_POLICY_ID} xs={4} small={8} />
      <css.LoadingItem>
        <Loading spin />
      </css.LoadingItem>
    </css.Container>
  );
};

export default OneTrustCookieDisclosure;
