import { getLegalPage, getLegalPages } from 'lib/Contentful';

import About from 'ui/components/About';
import ErrorBoundary from 'components/ErrorBoundary';
import type { LegalPage } from 'lib/Contentful/types';
import MarkdownSection from 'ui/components/MarkdownSection';
import RichTextSection from 'ui/components/RichTextSection';
import OverviewHero from 'ui/components/OverviewHero';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import env from 'constants/env';
import { slug as SUBPROCESSOR_PAGE_SLUG } from 'pages/legal/subprocessors';

type LegalPageProps = Awaited<ReturnType<typeof getLegalPage>> & {
  preview: boolean;
};

const sectionsComponents = {
  sectionAbout: About,
  sectionMarkdown: MarkdownSection,
  sectionRichText: RichTextSection,
};

const Legal = ({ hero, sections, preview }: LegalPageProps) => {
  return (
    <>
      <ErrorBoundary preview={preview}>
        <OverviewHero {...hero} />
      </ErrorBoundary>
      {sections?.map(({ contentType, ...section }) => {
        const sectionType = contentType as keyof typeof sectionsComponents;
        const PageSection = sectionsComponents[sectionType];

        if (!PageSection) return null;

        if (sectionType === 'sectionMarkdown') {
          return (
            <ErrorBoundary key={section?.id} preview={preview}>
              <PageSection {...section} sectionGrid={{ xs: 4, small: 8, medium: 12 }} useRegularTable />
            </ErrorBoundary>
          );
        }

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
  const entries = await getLegalPages();
  if (entries) {
    return {
      fallback: env.generatePagesFallback.legal,
      paths: entries.items.reduce<Paths>((paths, page) => {
        const fields = page.fields;
        if (fields?.slug && fields?.slug !== SUBPROCESSOR_PAGE_SLUG) {
          paths.push({ params: { slug: fields.slug } });
        }
        return paths;
      }, []),
    };
  }
  return [];
};

export const getStaticProps = defaultGetStaticProps<LegalPage>({
  page: 'legal/[slug]',
  getData: ({ params, preview }) => getLegalPage({ slug: params?.slug as string }, { preview }),
});

export default Legal;
