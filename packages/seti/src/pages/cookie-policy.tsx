import dynamic from "next/dynamic";
import Hero, { type HeroProps } from "components/Hero";
import { defaultGetStaticProps } from "utils/pageGeneration/defaultGetStaticProps";
import { PAGES } from "data/pages";

// this component must be client-side only to receive one trust script load
const OneTrustCookieDisclosure = dynamic(
  () => import("components/OneTrustCookieList"),
  { ssr: false }
);

type CookiePolicyPageProps = typeof PAGES.overview;

const CookiePolicy = ({ hero }: CookiePolicyPageProps) => {
  return (
    <>
      <Hero {...(hero as HeroProps)} />
      <OneTrustCookieDisclosure />
    </>
  );
};

export const getStaticProps = defaultGetStaticProps({
  page: "cookie-policy",
  getData: () => ({
    hero: {
      heading: "Cookie Policy",
      backgroundColor: "black",
      spacingTop: "continuous",
      spacingBottom: "continuous",
    },
  }),
});

export default CookiePolicy;
