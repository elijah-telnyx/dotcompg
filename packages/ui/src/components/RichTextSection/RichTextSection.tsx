import type { Document } from '@contentful/rich-text-types';
import Grid from '../Grid';
import RichText from '../RichText';
import Section, { type SectionProps } from '../Section';

export interface RichTextSectionProps extends SectionProps {
  lead?: string;
  copy: Document;
}

const RichTextSection = ({ copy, ...props }: RichTextSectionProps) => {
  return (
    <Section htmlAs='article' {...props}>
      <Grid.Container>
        <Grid.Item xs={4} small={8}>
          <RichText data={copy} />
        </Grid.Item>
      </Grid.Container>
    </Section>
  );
};

export default RichTextSection;
