import Grid from 'ui/components/Grid';
import Markdown from 'ui/components/Markdown';
import * as css from './LLMLibrarySections.styled';
import { type ReactNode } from 'react';

const LLMLibraryAboutSection = ({ markdown }: { markdown: string }) => {
  const Row = ({ alt = false, children }: { alt?: boolean; children: ReactNode }) => (
    <Grid.Item medium={10} small={8} xs={4}>
      {alt ? <css.Alt>{children}</css.Alt> : children}
    </Grid.Item>
  );

  return (
    <css.SectionWrapper>
      <css.Container>
        <Row>
          <css.Header level={2} category>
            faqs
          </css.Header>
          {markdown && (
            <Markdown
              options={{
                overrides: {
                  h3: css.FaqQuestion,
                  p: css.FaqAnswer,
                },
              }}
            >
              {markdown}
            </Markdown>
          )}
        </Row>
      </css.Container>
    </css.SectionWrapper>
  );
};

export default LLMLibraryAboutSection;
