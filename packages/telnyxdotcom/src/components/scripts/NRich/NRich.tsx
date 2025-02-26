import Script from 'next/script';

const N_RICH_URL = '/assets/nrich.js';

export interface NRichProps {
  /**
   * Since N.Rich Cookieless mode is not using cookies, it is not dependent on the cookie-consent and it should be fired outside the scope of the CMP
   *
   * N.Rich Standard mode should be placed in the marketing or advertising category of cookies within the CMP.
   */
  cookieless: boolean;
}

/**
 * Loading via code is needed because we need to load NRich script when user accepts cookies too (cookieless vs with cookies)
 *
 * If we load this script via GTM, it won't behave correctly cause GTM is tagged as a `performance` script and it will be loaded only after user accepts cookies performance category, and not strictly necessary category or targeting category
 *
 * References
 * - https://n.rich/en/knowledge-base/cookie-consent-ensuring-gdpr-compliance
 * - https://telnyx.atlassian.net/browse/DOTCOM-3302
 */
export const NRich = ({ cookieless }: NRichProps) => {
  return <Script id='nrich-script' src={N_RICH_URL} strategy='afterInteractive' data-cookieless={cookieless} />;
};

export default NRich;
