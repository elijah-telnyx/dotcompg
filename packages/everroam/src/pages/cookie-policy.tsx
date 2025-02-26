import OverviewHero from "ui/components/OverviewHero";
import { defaultGetStaticProps } from "utils/pageGeneration/defaultGetStaticProps";
import { getCookiePolicyPage } from "lib/Static";
import MarkdownSection from "ui/components/MarkdownSection";

type CookiePolicyPageProps = Awaited<ReturnType<typeof getCookiePolicyPage>>;

const CookiePolicy = ({ hero, markdownSection }: CookiePolicyPageProps) => {
  return (
    <>
      <OverviewHero {...hero} />
      <MarkdownSection {...markdownSection} />
    </>
  );
};

export const getStaticProps = defaultGetStaticProps<CookiePolicyPageProps>({
  page: "cookie-policy",
  getData: () => getCookiePolicyPage(),
});

export default CookiePolicy;
