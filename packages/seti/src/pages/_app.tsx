import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ScriptProps } from "next/script";
import localFont from "next/font/local";

import Head from "next/head";
import { createContext, type ReactNode } from "react";
import MainLayout from "components/Layout/Main";
import { SetiGlobalStyles } from "ui/styles/GlobalStyle";
import MetaTags from "components/MetaTags";

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
  PageLayout?: typeof MainLayout;
}

const Layout = ({
  children,
  className,
  PageLayout = MainLayout,
}: LayoutProps) => <PageLayout className={className}>{children}</PageLayout>;

export type GlobalValues = unknown;

export const GlobalContext = createContext<GlobalValues>({});

function App({
  Component,
  pageProps: { preview, fallback, ...pageProps } = {},
  router,
}: Props) {
  // DOTCOM-2414 - `ref` is reserved - https://legacy.reactjs.org/docs/error-decoder.html/?invariant=290&args%5B%5D=productHunt
  const { ref, ...query } = router.query;

  SetiGlobalStyles();

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
      </Head>
      <MetaTags {...pageProps.seo} {...query} />
      <GlobalContext.Provider value={{}}>
        <Layout
          PageLayout={Component?.Layout}
          className={`${interFont.variable} ${ppFormulaFont.variable}`}
        >
          <Component {...pageProps} preview={preview} />
        </Layout>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
