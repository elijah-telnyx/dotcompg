import type { ComponentProps } from 'react';
import Grid, { type GridItemProps } from '../Grid';
import Markdown from '../Markdown';
import { type SectionProps } from '../Section';
import { Section } from './MarkdownSection.styled';

export interface MarkdownSectionProps extends SectionProps {
  lead?: string;
  copy: string;
  sectionGrid?: GridItemProps;
  useRegularTable?: ComponentProps<typeof Section>['useRegularTable'];
  fullWidth?: boolean;
}

const MarkdownSection = ({
  lead,
  copy,
  sectionGrid = { xs: 4, small: 8 },
  useRegularTable = false,
  fullWidth = false,
  ...props
}: MarkdownSectionProps) => {
  const grid = fullWidth ? { xs: 4, small: 12 } : sectionGrid;

  return (
    <Section htmlAs='article' {...props} useRegularTable={useRegularTable}>
      <Grid.Container
        css={
          useRegularTable
            ? {
                '@lessThanMedium': {
                  maxWidth: '100%',
                },
              }
            : {}
        }
      >
        <Grid.Item {...grid}>
          {lead && <Markdown blog>{lead}</Markdown>}
          <Markdown blog>{copy}</Markdown>
        </Grid.Item>
      </Grid.Container>
    </Section>
  );
};

export default MarkdownSection;
