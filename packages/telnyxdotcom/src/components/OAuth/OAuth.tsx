import { submitSignUpMarketoForm } from 'components/scripts/Marketo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import OverviewHero from 'ui/components/OverviewHero';
import { getPortalLoginUrl, getPortalOAuthUrl, type PortalLoginUrlParameters } from 'utils/redirects';

const OAuth = () => {
  const {
    query: { provider, token, user, created, portal_redirect_token, first_name, last_name },
  } = useRouter();

  useEffect(() => {
    if (!provider || !first_name || !last_name) return;

    const marketoFormData = {
      FirstName: first_name,
      LastName: last_name,
      Email: user,
      mcUserId__c: null,
      Subscription_Opt_In__c: false, // Social Auth does not have an explicit prompt for email subscription (default: false)
      ...(window.mkto_signup_data || {}),
    };
    window.mkto_signup_data = undefined;

    // Arbitrary delay to allow Segment to sync with Marketo
    setTimeout(() => {
      submitSignUpMarketoForm(marketoFormData);
    }, 2000);
  }, [first_name, last_name, provider, user]); // watch changes on query params since they come from server as empty at first

  const portalRedirectUrl = () => {
    const params = {
      provider: provider,
      token: token,
      user: user,
      created: created,
      portal_redirect_token: portal_redirect_token,
    } as PortalLoginUrlParameters;

    // OAuth signups
    if (provider && provider !== 'google' && user && token) {
      return getPortalOAuthUrl(params);
    }

    // Regular signups
    return getPortalLoginUrl(params);
  };

  const redirectURL = portalRedirectUrl();

  const heroOauth = {
    heading: `Ready to use the world's most advanced multicloud network?`,
    copy: `We can't wait to see what you build on Telnyx`,
    footerCopy: `[GET STARTED](${redirectURL})`,
    backgroundColor: 'green',
    hasOverflow: false,
    centered: true,
    spacingTop: 'contrasting',
    spacingBottom: 'contrasting',
  } as const;

  return <OverviewHero {...heroOauth} />;
};
export default OAuth;
