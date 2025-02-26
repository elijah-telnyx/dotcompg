import * as css from './LLMComparisonTableSection.styled';
import Section from 'ui/components/Section';
import Grid from 'ui/components/Grid';
import LLMComparisonTable from './LLMComparisonTable';
import useMedia from 'ui/utils/hooks/useMedia';
import media from 'ui/styles/config/media';
import { type LLMModel } from './utils';
import LLMComparisonAccordion from './LLMComparisonAccordion';

// data is optional since async call can fail, default is empty array
export interface LLMComparisonTableSectionProps {
  heading?: string;
  copy?: string;
  data?: LLMModel[];
}

const LLMComparisonTableSection = ({ heading, copy, data = [], ...props }: LLMComparisonTableSectionProps) => {
  const isMobile = useMedia(media.lessThanMedium, true);
  return (
    <Section {...props}>
      <css.GridContainer>
        <css.TextWrapper xs={4} small={8}>
          <css.MaxWidthXs>
            {heading && <css.Heading level={2}>{heading}</css.Heading>}
            {copy && <css.Paragraph>{copy}</css.Paragraph>}
          </css.MaxWidthXs>
        </css.TextWrapper>
      </css.GridContainer>

      <css.LLMComparisonTable>
        <css.Container>
          <Grid.FullWidthItem>
            {isMobile ? (
              <css.MaxWidthXs>
                <LLMComparisonAccordion data={data} />
              </css.MaxWidthXs>
            ) : (
              <LLMComparisonTable data={data} />
            )}
          </Grid.FullWidthItem>
        </css.Container>
      </css.LLMComparisonTable>
    </Section>
  );
};

export default LLMComparisonTableSection;
