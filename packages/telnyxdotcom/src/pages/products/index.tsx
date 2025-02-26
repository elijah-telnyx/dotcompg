import OverviewHero from 'ui/components/OverviewHero';
import NavigationBubblesSection from 'ui/components/NavigationBubblesSection';

import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import { getProductsOverviewPage } from 'lib/Static';

type ProductsOverviewPageProps = Awaited<ReturnType<typeof getProductsOverviewPage>>;

const PricingOverview = ({ hero, navigation }: ProductsOverviewPageProps) => {
  return (
    <>
      <OverviewHero {...hero} />
      <NavigationBubblesSection {...navigation} />
    </>
  );
};

export const getStaticProps = defaultGetStaticProps<ProductsOverviewPageProps>({
  page: 'products',
  getData: () => getProductsOverviewPage(),
  scripts: {
    pipedata: true,
  },
});

export default PricingOverview;
