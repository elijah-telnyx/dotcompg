import { Head, Html, Main, NextScript } from "next/document";
import constants from "constants/env";

import Script from "next/script";
import { getCssText } from "ui/styles";

export default function Document() {
  return (
    <Html lang="en-US">
      <Head>
        <meta
          name="version"
          content={
            process.env.NEXT_PUBLIC_BUILD_NUMBER || "0000.00.00.00.00.HEAD"
          }
        />
        <link rel="icon" href="/favicon.ico" />

        <link
          rel="preconnect"
          crossOrigin=""
          href="https://images.ctfassets.net"
        />
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />

        {constants.oneTrust.enabled && (
          <Script
            src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
            strategy="beforeInteractive"
            id="one-trust-script"
            data-domain-script={constants.oneTrust.ID}
          />
        )}

        <Script
          src="https://cdn.jsdelivr.net/npm/hockeystack@latest/hockeystack.min.js"
          data-apikey="23d8e394e3909e32513cb9e8576983"
          data-cookieless="1"
          data-auto-identify="1"
          strategy="beforeInteractive"
          id="hockeystack-script"
        />

        <Script
          id="gtm-script"
          src="/assets/gtm.js"
          strategy="beforeInteractive"
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YGT0HJBNX3"
          strategy="afterInteractive"
          id="gtag-script"
        />

        <Script
          id="gtag-config-script"
          src="/assets/gtag.js"
          strategy="afterInteractive"
        />
      </Head>
      <body>
        <noscript>
          <iframe
            title="google-tag-manager-noscript"
            src={`https://www.googletagmanager.com/ns.html?id=${constants.Analytics.NEXT_PUBLIC_GTM_TAG}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
