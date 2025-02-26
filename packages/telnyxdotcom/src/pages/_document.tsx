import { Head, Html, Main, NextScript, type DocumentProps } from 'next/document';

import Script from 'next/script';
import constants from 'constants/env';
import featureFlippers from 'constants/featureFlippers';
import { getCssText } from 'ui/styles';

export default function Document(props: DocumentProps) {
  const pipedata = featureFlippers.DOTCOM_2756_PIPEDATA && props?.__NEXT_DATA__?.props?.pageProps?.pipedata;

  return (
    <Html lang='en-US'>
      <Head>
        <meta name='version' content={process.env.NEXT_PUBLIC_BUILD_NUMBER || '0000.00.00.00.00.HEAD'} />
        <meta name='google-site-verification' content='_GSSxM9_kTZW-7RfhWNKdeOU15Ps4_EvgTABJ9N24As' />
        <meta name='facebook-domain-verification' content='f66llk8960kjrbv6k2pd27hund9mla' />
        <link rel='icon' href='/favicon.ico' />

        {pipedata && (
          // eslint-disable-next-line
          <script
            id='pipedata-bundle'
            src='https://client.pipedata.co/client/4f2748296ec84afabe725bb07ad4ed9b/bundle.js'
          ></script>
        )}

        <link rel='preconnect' crossOrigin='' href='https://images.ctfassets.net' />
        <link rel='preconnect' crossOrigin='' href='https://geolocation.onetrust.com' />
        <link rel='preconnect' crossOrigin='' href='https://cdn.cookielaw.org' />
        <style id='stitches' dangerouslySetInnerHTML={{ __html: getCssText() }} />

        <Script
          src='https://cdn.jsdelivr.net/npm/hockeystack@latest/hockeystack.min.js'
          data-apikey='23d8e394e3909e32513cb9e8576983'
          data-cookieless='1'
          data-auto-identify='1'
          strategy='beforeInteractive'
          id='hockeystack-script'
        />

        {constants.oneTrust.enabled && constants.oneTrust.automaticBlock && (
          <Script
            src={`https://cdn.cookielaw.org/consent/${constants.oneTrust.NEXT_PUBLIC_API_KEY}/OtAutoBlock.js`}
            strategy='beforeInteractive'
            id='one-trust-block-cookies'
          />
        )}

        {/* https://app-eu.onetrust.com/cookies/script-integration/<api_key>/instructions */}
        {constants.oneTrust.enabled && (
          <Script
            src='https://cdn.cookielaw.org/scripttemplates/otSDKStub.js'
            charSet='UTF-8'
            data-domain-script={constants.oneTrust.NEXT_PUBLIC_API_KEY}
            strategy='beforeInteractive'
            id='one-trust-script'
          ></Script>
        )}
      </Head>
      <body>
        <noscript>
          <iframe
            title='google-tag-manager-noscript'
            src={`https://www.googletagmanager.com/ns.html?id=${constants.Analytics.NEXT_PUBLIC_GTM_TAG}`}
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
