import Section, { type SectionProps } from '../Section';
import Grid from '../Grid';
import CtaButton, { type CTAButtonProps } from '../CtaButton';
import Heading from '../Typography/Heading';
import Markdown from '../Markdown';
import * as css from './ReleaseNote.styled';
import { formatDate } from '../../utils/formatDate';

export interface ReleaseNoteProps extends SectionProps {
  breadcrumbLink: CTAButtonProps;
  publishDate: string;
  heading: string;
  copy: string;
}

const ReleaseNote = ({
  breadcrumbLink,
  heading,
  publishDate,
  backgroundColor,
  copy,
}: ReleaseNoteProps) => {
  return (
    <>
      <Section
        backgroundColor={backgroundColor || 'cream'}
        spacingTop={'continuous'}
        spacingBottom={'continuous'}
      >
        <css.Container>
          <css.BreadcrumbItem xs={12}>
            <CtaButton {...breadcrumbLink} />
          </css.BreadcrumbItem>
          <Grid.Item xs={12}>
            <Heading level={2} htmlAs='h1'>
              {heading}
            </Heading>
            <css.TagItem>
              <Heading level={3} blog>
                {formatDate(publishDate || '')}
              </Heading>
            </css.TagItem>
          </Grid.Item>
        </css.Container>
      </Section>
      <Section spacingTop='continuous'>
        <css.Container>
          <Grid.Item xs={8} small={8} medium={9} large={10}>
            <Markdown blog>{copy}</Markdown>
          </Grid.Item>
        </css.Container>
      </Section>
    </>
  );
};

export default ReleaseNote;
