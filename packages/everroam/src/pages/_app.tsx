import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ScriptProps } from "next/script";
import localFont from "next/font/local";
import { useRouter } from "next/router";
import Head from "next/head";
import { createContext, useMemo, useState, type ReactNode } from "react";
import MainLayout from "components/Layout/Main";
import ScrollSnapLayout, {
  type ScrollSnapLayoutProps,
} from "components/Layout/ScrollSnap";

import GlobalStyle from "ui/styles/GlobalStyle";
import MetaTags from "components/MetaTags";
import { COOKIE_POLICY } from "lib/Cookie";

const { COOKIE_STATUS } = COOKIE_POLICY;

const interFont = localFont({
  src: [
    {
      path: "../fonts/Inter-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/Inter-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Inter-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--fonts-inter",
  fallback: ["sans-serif"],
  preload: false,
});

const ppFormulaFont = localFont({
  src: "../fonts/PPFormula-Extrabold.woff2",
  weight: "800",
  style: "normal",
  variable: "--fonts-formula",
  fallback: ["Neue Montreal", "sans-serif"],
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
  scrollSnap?: ScrollSnapLayoutProps["scrollSnap"];
}

const Layout = ({
  children,
  className,
  PageLayout = MainLayout,
  scrollSnap,
}: LayoutProps) => (
  <PageLayout scrollSnap={scrollSnap} className={className}>
    {children}
  </PageLayout>
);

export type GlobalValues = {
  referrer?: string;
  setReferrer: (referrer: GlobalValues["referrer"]) => void;
  signupEmail?: string;
  setSignupEmail: (signupEmail: GlobalValues["signupEmail"]) => void;
  cookieStatus: keyof typeof COOKIE_STATUS;
  setCookieStatus: (cookieStatus: GlobalValues["cookieStatus"]) => void;
};

export const GlobalContext = createContext<GlobalValues>({
  referrer: "",
  setReferrer: () => {
    /* empty */
  },
  signupEmail: "",
  setSignupEmail: () => {
    /* empty */
  },
  cookieStatus: COOKIE_STATUS.unknown,
  setCookieStatus: () => {
    /* empty */
  },
});

GlobalContext.displayName = "GlobalContext";

function App({
  Component,
  pageProps: { preview, fallback, ...pageProps } = {},
  router,
}: Props) {
  const [referrer, setReferrer] = useState<GlobalValues["referrer"]>("");
  const [signupEmail, setSignupEmail] =
    useState<GlobalValues["signupEmail"]>("");
  const [cookieStatus, setCookieStatus] = useState<
    GlobalValues["cookieStatus"]
  >(COOKIE_STATUS.unknown);
  const { pathname } = useRouter();
  // DOTCOM-2414 - `ref` is reserved - https://legacy.reactjs.org/docs/error-decoder.html/?invariant=290&args%5B%5D=productHunt
  const { ref, ...query } = router.query;

  // https://beta.reactjs.org/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions
  const globalContextValue = useMemo(
    () => ({
      referrer,
      signupEmail,
      cookieStatus,
      setReferrer,
      setSignupEmail,
      setCookieStatus,
    }),
    [referrer, signupEmail, cookieStatus]
  );

  GlobalStyle();

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
      </Head>
      <MetaTags
        {...pageProps.seo}
        locales={pageProps?.countryList}
        {...query}
      />
      <GlobalContext.Provider value={globalContextValue}>
        <Layout
          PageLayout={
            pageProps?.scrollSnap ? ScrollSnapLayout : Component?.Layout
          }
          scrollSnap={pageProps?.scrollSnap}
          className={`${interFont.variable} ${ppFormulaFont.variable}`}
        >
          <Component {...pageProps} preview={preview} />
        </Layout>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
