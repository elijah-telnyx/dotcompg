import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import { getFreshHomePageData } from 'lib/Contentful';
import InferenceSection from 'components/FreshHome/InferenceSection';

export default function InferenceDemoPage({ sections }: any) {
  return <InferenceSection {...sections.inference} />;
}

export const getStaticProps = defaultGetStaticProps({
  page: 'homepage',
  getData: async ({ preview }) => {
    const pageData = await getFreshHomePageData({ preview });

    return {
      ...pageData,
    };
  },
});
