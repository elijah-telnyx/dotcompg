import type { SectionProps } from '../Section';
import Grid from '../Grid';
import { fullWidthColumns } from '../Grid/Grid';
import Markdown from '../Markdown';
import Heading from '../Typography/Heading';
import * as css from './Faq.styled';
import VisuallyHidden from '../VisuallyHidden';

interface Question {
  question: string;
  answer: string;
  id: string;
  blog?: boolean;
}

export interface FaqProps extends SectionProps {
  id?: string;
  heading?: string;
  tagline?: string;
  questions: Question[];
}

const Faq = ({ id, heading, tagline, questions, ...props }: FaqProps) => {
  return (
    <css.SectionWrapper {...props}>
      <Grid.Container
        {...fullWidthColumns}
        css={{
          rowGap: '$large',

          '@medium': {
            rowGap: '$xxl',
          },
        }}
      >
        <Grid.FullWidthItem>
          {tagline && (
            <Heading level={2} category id={heading ? '' : id}>
              {tagline}
            </Heading>
          )}
          {heading && (
            <Heading id={id} level={3} htmlAs='h2'>
              {heading}
            </Heading>
          )}
        </Grid.FullWidthItem>
        <Grid.FullWidthItem>
          <css.Accordion
            type='single'
            defaultValue={questions[0].id}
            collapsible
          >
            {questions.map(({ id, question, answer, blog }) => {
              return (
                <css.AccordionItem key={id} value={id}>
                  <css.Question>
                    <Heading level={3}>{question}</Heading>
                    <css.PlusIcon />
                  </css.Question>
                  <css.Answer>
                    <Markdown blog={blog}>{answer}</Markdown>
                    <VisuallyHidden>
                      <Markdown blog={blog}>{answer}</Markdown>
                    </VisuallyHidden>
                  </css.Answer>
                </css.AccordionItem>
              );
            })}
          </css.Accordion>
        </Grid.FullWidthItem>
      </Grid.Container>
    </css.SectionWrapper>
  );
};

export default Faq;
