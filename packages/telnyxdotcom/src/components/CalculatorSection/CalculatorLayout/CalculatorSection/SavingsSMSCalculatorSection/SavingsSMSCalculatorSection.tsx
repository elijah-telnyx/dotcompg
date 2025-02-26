import Grid from 'ui/components/Grid';
import Section from 'ui/components/Section';
import type { CalculatorSectionProps } from '../CalculatorSection';
import Paragraph from 'ui/components/Typography/Paragraph';

import { isDarkColor } from 'ui/styles/utils';
import * as css from './SavingsSMSCalculatorSection.styled';

const SavingsSMSCalculatorSection = ({
  tagline = 'SAVINGS CALCULATOR',
  heading,
  copy,
  backgroundColor = 'black',
  ctas,
  children,
  ...props
}: CalculatorSectionProps) => {
  const isDark = isDarkColor(backgroundColor);

  return (
    <Section {...props} backgroundColor={backgroundColor}>
      <Grid.Container>
        <Grid.Item xs={4} medium={8}>
          {tagline && (
            <css.Tagline dark={isDark} level={2} category>
              {tagline}
            </css.Tagline>
          )}
          <css.Heading level={2} dark={isDark}>
            {heading}
          </css.Heading>
          {copy && (
            <Paragraph lead dark={isDark}>
              {copy}
            </Paragraph>
          )}
        </Grid.Item>
        <Grid.FullWidthItem>{children}</Grid.FullWidthItem>
      </Grid.Container>
    </Section>
  );
};

export default SavingsSMSCalculatorSection;
