import Section, { type SectionProps } from 'ui/components/Section';
import SectionHeader from 'ui/components/Section/SectionHeader';
import Markdown from 'ui/components/Markdown';
import * as css from './MarkdownSection.styled';

export interface MarkdownSectionProps extends SectionProps {
  copy?: string;
  heading?: string;
  tagline?: string;
  markdown?: string;
}

const MarkdownSection = ({ copy, heading, tagline, markdown, ...props }: MarkdownSectionProps) => {
  return (
    <Section {...props}>
      <css.Container>
        <css.Item xs={4} small={8} medium={6}>
          <SectionHeader copy={copy} heading={heading} tagline={tagline} />
        </css.Item>
        <css.Item xs={4} small={8} medium={6}>
          <css.Content>
            <css.FadeOverlay />
            <css.MarkdownWrapper>{markdown && <Markdown hideOverflow>{markdown}</Markdown>}</css.MarkdownWrapper>
          </css.Content>
        </css.Item>
      </css.Container>
    </Section>
  );
};

export default MarkdownSection;
