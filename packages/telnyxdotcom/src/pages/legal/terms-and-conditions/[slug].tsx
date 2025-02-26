import { getLegalTermsAndConditionsPage, getLegalTermsAndConditionsPages } from 'lib/Contentful';

import About from 'ui/components/About';
import ErrorBoundary from 'components/ErrorBoundary';
import type { LegalPage } from 'lib/Contentful/types';
import MarkdownSection from 'ui/components/MarkdownSection';
import OverviewHero from 'ui/components/OverviewHero';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import env from 'constants/env';

type LegalTermsAndConditionsPageProps = Awaited<ReturnType<typeof getLegalTermsAndConditionsPage>> & {
  preview: boolean;
};

const sectionsComponents = {
  sectionAbout: About,
  sectionMarkdown: MarkdownSection,
};

const TermsAndConditions = ({ hero, sections, preview }: LegalTermsAndConditionsPageProps) => {
  return (
    <>
      <ErrorBoundary preview={preview}>
        <OverviewHero {...hero} />
      </ErrorBoundary>
      {sections?.map(({ contentType, ...section }) => {
        const sectionType = contentType as keyof typeof sectionsComponents;
        const PageSection = sectionsComponents[sectionType];

        if (!PageSection) return null;

        return (
          <ErrorBoundary key={section?.id} preview={preview}>
            <PageSection {...section} />
          </ErrorBoundary>
        );
      })}
    </>
  );
};

type Paths = { params: { slug: string; locale?: string } }[];
export const getStaticPaths = async () => {
  const entries = await getLegalTermsAndConditionsPages();
  if (entries) {
    return {
      fallback: env.generatePagesFallback.legal,
      paths: entries.items.reduce<Paths>((paths, page) => {
        const fields = page.fields;
        if (fields?.slug) {
          paths.push({ params: { slug: fields.slug } });
        }
        return paths;
      }, []),
    };
  }
  return [];
};

export const getStaticProps = defaultGetStaticProps<LegalPage>({
  page: 'legal/terms-and-conditions/[slug]',
  getData: ({ params, preview }) => getLegalTermsAndConditionsPage({ slug: params?.slug as string }, { preview }),
});

export default TermsAndConditions;
