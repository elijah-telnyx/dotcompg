import { getLegalPrivacyPolicyPage, getLegalPrivacyPolicyPages } from 'lib/Contentful';

import About from 'ui/components/About';
import ErrorBoundary from 'components/ErrorBoundary';
import type { LegalPage } from 'lib/Contentful/types';
import MarkdownSection from 'ui/components/MarkdownSection';
import OverviewHero from 'ui/components/OverviewHero';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import env from 'constants/env';

type LegalPrivacyPolicyPageProps = Awaited<ReturnType<typeof getLegalPrivacyPolicyPage>> & {
  preview: boolean;
};

const sectionsComponents = {
  sectionAbout: About,
  sectionMarkdown: MarkdownSection,
};

const PrivacyPolicy = ({ hero, sections, preview }: LegalPrivacyPolicyPageProps) => {
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
  const entries = await getLegalPrivacyPolicyPages();
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
  page: 'legal/privacy-policy/[slug]',
  getData: ({ params, preview }) => getLegalPrivacyPolicyPage({ slug: params?.slug as string }, { preview }),
});

export default PrivacyPolicy;
