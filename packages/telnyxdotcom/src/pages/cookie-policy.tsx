import dynamic from 'next/dynamic';
import OverviewHero from 'ui/components/OverviewHero';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import { getCookiePolicyPage } from 'lib/Static';
import MarkdownSection from 'ui/components/MarkdownSection';

type CookiePolicyPageProps = Awaited<ReturnType<typeof getCookiePolicyPage>>;

// this component must be client-side only to receive one trust script load
const OneTrustCookieDisclosure = dynamic(() => import('components/OneTrustCookieDisclosure'), { ssr: false });

const CookiePolicy = ({ hero, markdownSection }: CookiePolicyPageProps) => {
  return (
    <>
      <OverviewHero {...hero} />
      <MarkdownSection {...markdownSection} />
      <OneTrustCookieDisclosure />
    </>
  );
};

export const getStaticProps = defaultGetStaticProps<CookiePolicyPageProps>({
  page: 'cookie-policy',
  getData: () => getCookiePolicyPage(),
});

export default CookiePolicy;
