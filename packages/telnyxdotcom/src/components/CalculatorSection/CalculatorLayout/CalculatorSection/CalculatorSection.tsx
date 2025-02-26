import { type ReactNode } from 'react';
import CtaButton, { type CTAButtonProps } from 'ui/components/CtaButton';
import Grid from 'ui/components/Grid';
import type { SectionProps } from 'ui/components/Section';
import type { CalculatorTypes } from '../Calculator';
import Section from 'ui/components/Section/Section';
import Tagline from 'ui/components/Tagline';
import Paragraph from 'ui/components/Typography/Paragraph';
import SavingsSMSCalculatorSection from './SavingsSMSCalculatorSection';
import { isDarkColor } from 'ui/styles/utils';
import * as css from './CalculatorSection.styled';

export interface CalculatorSectionProps extends SectionProps {
  heading: string;
  copy: string;
  tagline: string;
  ctas: CTAButtonProps[];
  children: ReactNode;
}

const CalculatorSectionDefault = ({ heading, copy, tagline, ctas, children, ...props }: CalculatorSectionProps) => {
  const isDark = isDarkColor(props.backgroundColor);

  return (
    <Section {...props}>
      <Grid.Container>
        <Grid.Item xs={4} small={8} large={5}>
          <css.ContentWrapper>
            <css.ContentTaglineWrapper>
              <Tagline isDark={isDark}>{tagline}</Tagline>
            </css.ContentTaglineWrapper>

            <css.ContentHeading level={2} dark={isDark}>
              {heading}
            </css.ContentHeading>

            <Paragraph lead dark={isDark}>
              {copy}
            </Paragraph>
            <css.ContentButtonsWrapper>
              {ctas?.map((button) => (
                <CtaButton {...button} key={button.href} backgroundColor={props.backgroundColor} />
              ))}
            </css.ContentButtonsWrapper>
          </css.ContentWrapper>
        </Grid.Item>
        <Grid.Item xs={4} small={8} large={7}>
          {children}
        </Grid.Item>
      </Grid.Container>
    </Section>
  );
};

export const CalculatorSection = ({ type, ...props }: CalculatorSectionProps & { type: CalculatorTypes }) => {
  switch (type) {
    case 'sms':
      return <SavingsSMSCalculatorSection {...props} />;

    default:
      return <CalculatorSectionDefault {...props} />;
  }
};
