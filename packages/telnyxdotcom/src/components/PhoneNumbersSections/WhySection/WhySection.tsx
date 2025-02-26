import type { CardsProps } from 'ui/components/Cards';
import type { CTAButtonProps } from 'ui/components/CtaButton';
import Section, { type SectionProps } from 'ui/components/Section';
import Grid from 'ui/components/Grid';
import Cards from './Cards';
import CtaButton from 'ui/components/CtaButton';
import SectionHeader from 'ui/components/Section/SectionHeader';
import * as css from './WhySection.styled';

export interface WhySectionProps extends SectionProps {
  id?: string;
  tagline: string;
  heading?: string;
  copy: string;
  lead?: boolean;
  items: CardsProps['items'];
  withOrder: CardsProps['withOrder'];
  ctaButtons: CTAButtonProps[];
}
const WhySection = ({ id, tagline, heading, copy, lead, items, withOrder, ctaButtons, ...props }: WhySectionProps) => {
  return (
    <Section {...props}>
      <css.Container>
        <Grid.Item xs={4} small={6} medium={9} large={8}>
          <SectionHeader copy={copy} heading={heading} tagline={tagline} />
        </Grid.Item>
        <Grid.Item xs={4} small={8} medium={12} large={12} xl={12}>
          <Cards items={items} withOrder={withOrder} sectionBackgroundColor={props.backgroundColor} />
        </Grid.Item>
        {ctaButtons?.length && (
          <Grid.FullWidthItem>
            <css.ButtonsContainer>
              {ctaButtons.map((cta) => (
                <CtaButton {...cta} key={cta.href} backgroundColor={props.backgroundColor} />
              ))}
            </css.ButtonsContainer>
          </Grid.FullWidthItem>
        )}
      </css.Container>
    </Section>
  );
};

export default WhySection;
