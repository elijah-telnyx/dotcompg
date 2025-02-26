import { getLegalPage } from 'lib/Contentful';

import About from 'ui/components/About';
import ErrorBoundary from 'components/ErrorBoundary';
import type { LegalPage } from 'lib/Contentful/types';
import SubprocessorSubForm from '../../components/SubprocessorSubForm';
import MarkdownSection from 'ui/components/MarkdownSection';
import RichTextSection from 'ui/components/RichTextSection';
import OverviewHero from 'ui/components/OverviewHero';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';

export const slug = 'subprocessors';

type LegalPageProps = Awaited<ReturnType<typeof getLegalPage>> & {
  preview: boolean;
};

const sectionsComponents = {
  sectionAbout: About,
  sectionMarkdown: MarkdownSection,
  sectionRichText: RichTextSection,
};

const Page = ({ hero, sections, preview }: LegalPageProps) => {
  return (
    <>
      <ErrorBoundary preview={preview}>
        <OverviewHero {...hero} />
        <SubprocessorSubForm />
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

export const getStaticProps = defaultGetStaticProps<LegalPage>({
  page: `legal/${slug}`,
  getData: ({ preview }) => getLegalPage({ slug }, { preview }),
});

export default Page;
