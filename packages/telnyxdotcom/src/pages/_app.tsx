import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ScriptProps } from 'next/script';
import type { CampaignParams } from 'components/scripts/Campaign';
import localFont from 'next/font/local';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { createContext, useMemo, useState, type ReactNode } from 'react';
import MainLayout from 'components/Layout/Main';
import ScrollSnapLayout, { type ScrollSnapLayoutProps } from 'components/Layout/ScrollSnap';

import GlobalStyle from 'ui/styles/GlobalStyle';
import MetaTags from 'components/MetaTags';
import GoogleTagManager from 'components/scripts/GoogleTagManager';
import Sift from 'components/scripts/Sift';
import Campaign from 'components/scripts/Campaign';
import Referrer from 'components/scripts/Referrer';
import OpenReplay from 'components/scripts/OpenReplay';
import Munchkin from 'components/scripts/Munchkin';
import Bugsnag from 'components/scripts/Bugsnag';
import UserLed from 'components/scripts/UserLed';
import constants from 'constants/env';
import { COOKIE_POLICY } from 'lib/Cookie';
import { RUNTIME_ENV } from 'env';

// widget must be client-side only to reduce impact on page performance
const ChatWidget = dynamic(() => import('components/ChatWidget'), { ssr: false });

const { COOKIE_STATUS } = COOKIE_POLICY;
// client-side only to avoid loading this component when it's disabled (depending on env)
const AdminTools = dynamic(() => import('components/AdminTools'), { ssr: false });
// one trust must be client-side only to use One Trust SDK methods
const OneTrust = dynamic(() => import('components/scripts/OneTrust'), { ssr: false });
// settings need to be client-side to avoid calling intercom ping twice with inconsistent
const IntercomSettings = dynamic(() => import('components/scripts/IntercomSettings'), { ssr: false });
// intentionally client-side
const GrowthBook = dynamic(() => import('components/scripts/GrowthBook'), { ssr: false });

const interFont = localFont({
  src: [
    {
      path: '../fonts/Inter-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../fonts/Inter-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/Inter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Inter-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--fonts-inter',
  fallback: ['sans-serif'],
  preload: false,
});

const ppFormulaFont = localFont({
  src: '../fonts/PPFormula-Extrabold.woff2',
  weight: '800',
  style: 'normal',
  variable: '--fonts-formula',
  fallback: ['Neue Montreal', 'sans-serif'],
  preload: false,
});

type Page<P = Record<string, never>> = NextPage<P> & {
  Layout: (page: ScriptProps) => JSX.Element;
};

type Props = AppProps & {
  Component: Page;
};

interface LayoutProps {
  children: ReactNode;
  className: string;
  PageLayout?: typeof MainLayout | typeof ScrollSnapLayout;
  simpleHeaderfooter: boolean;
  scrollSnap?: ScrollSnapLayoutProps['scrollSnap'];
}

const Layout = ({
  children,
  className,
  PageLayout = MainLayout,
  simpleHeaderfooter = false,
  scrollSnap,
}: LayoutProps) => (
  <PageLayout simpleHeaderfooter={simpleHeaderfooter} scrollSnap={scrollSnap} className={className}>
    {children}
  </PageLayout>
);

export type GlobalValues = {
  campaign: CampaignParams;
  setCampaign: (campaign: GlobalValues['campaign']) => void;
  referrer?: string;
  setReferrer: (referrer: GlobalValues['referrer']) => void;
  signupEmail?: string;
  setSignupEmail: (signupEmail: GlobalValues['signupEmail']) => void;
  cookieStatus: keyof typeof COOKIE_STATUS;
  setCookieStatus: (cookieStatus: GlobalValues['cookieStatus']) => void;
};

export const GlobalContext = createContext<GlobalValues>({
  campaign: {},
  setCampaign: () => {
    /* empty */
  },
  referrer: '',
  setReferrer: () => {
    /* empty */
  },
  signupEmail: '',
  setSignupEmail: () => {
    /* empty */
  },
  cookieStatus: COOKIE_STATUS.unknown,
  setCookieStatus: () => {
    /* empty */
  },
});

GlobalContext.displayName = 'GlobalContext';

function App({ Component, pageProps: { preview, fallback, trackingData, ...pageProps } = {}, router }: Props) {
  const [campaign, setCampaign] = useState<GlobalValues['campaign']>({});
  const [referrer, setReferrer] = useState<GlobalValues['referrer']>('');
  const [signupEmail, setSignupEmail] = useState<GlobalValues['signupEmail']>('');
  const [cookieStatus, setCookieStatus] = useState<GlobalValues['cookieStatus']>(COOKIE_STATUS.unknown);
  const { pathname } = useRouter();
  // DOTCOM-2414 - `ref` is reserved - https://legacy.reactjs.org/docs/error-decoder.html/?invariant=290&args%5B%5D=productHunt
  const { ref, ...query } = router.query;

  // https://beta.reactjs.org/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions
  const globalContextValue = useMemo(
    () => ({
      campaign,
      referrer,
      signupEmail,
      cookieStatus,
      setCampaign,
      setReferrer,
      setSignupEmail,
      setCookieStatus,
    }),
    [campaign, referrer, signupEmail, cookieStatus]
  );

  GlobalStyle();

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1 maximum-scale=1' />
      </Head>
      <MetaTags {...pageProps.seo} locales={pageProps?.countryList} {...query} />
      <GlobalContext.Provider value={globalContextValue}>
        <Layout
          PageLayout={pageProps?.scrollSnap ? ScrollSnapLayout : Component?.Layout}
          simpleHeaderfooter={pageProps?.simpleHeaderfooter}
          scrollSnap={pageProps?.scrollSnap}
          className={`${interFont.variable} ${ppFormulaFont.variable}`}
        >
          {(RUNTIME_ENV === 'staging' || RUNTIME_ENV === 'dev') && (
            <AdminTools preview={preview} pageId={pageProps?.id} />
          )}
          {constants.oneTrust.enabled && <OneTrust />}
          {constants.env === 'production' && <UserLed />}
          <GoogleTagManager />
          <IntercomSettings />
          <Campaign />
          <Referrer />
          <OpenReplay />
          <Sift {...(pathname === '/sign-up' && { strategy: 'lazyOnload' })} />
          <GrowthBook preview={preview} trackingData={trackingData} />
          <Munchkin />
          <Bugsnag />
          <Component {...pageProps} preview={preview} />
          <ChatWidget />
        </Layout>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
