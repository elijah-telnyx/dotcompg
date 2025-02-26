import Script from 'next/script';

const GoogleTagManager = () => (
  <>
    <Script
      id='google-tag-manager-script'
      strategy='afterInteractive'
      src={`https://www.googletagmanager.com/gtag/js?id=G-ZPM4K1DLND`}
    />
    <Script id='google-tag-manager-config-script' strategy='afterInteractive'>
      {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-ZPM4K1DLND');
        `}
    </Script>
  </>
);

export default GoogleTagManager;
