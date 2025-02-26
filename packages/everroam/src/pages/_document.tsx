import { Head, Html, Main, NextScript } from "next/document";

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

        <Script
          src="https://cdn.jsdelivr.net/npm/hockeystack@latest/hockeystack.min.js"
          data-apikey="23d8e394e3909e32513cb9e8576983"
          data-cookieless="1"
          data-auto-identify="1"
          strategy="beforeInteractive"
          id="hockeystack-script"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
