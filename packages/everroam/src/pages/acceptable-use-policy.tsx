import OverviewHero from 'ui/components/OverviewHero';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import { getAcceptablePolicyPage } from 'lib/Static';
import MarkdownSection from 'ui/components/MarkdownSection';
type AcceptablePolicyPageProps = Awaited<ReturnType<typeof getAcceptablePolicyPage>>;

const AcceptablePolicy = ({ hero, markdownSection }: AcceptablePolicyPageProps) => {
  return (
    <>
      <OverviewHero {...hero} />
      <MarkdownSection {...markdownSection} />
    </>
  );
};

export const getStaticProps = defaultGetStaticProps<AcceptablePolicyPageProps>({
  page: 'acceptable-use-policy',
  getData: () => getAcceptablePolicyPage(),
});

export default AcceptablePolicy;
