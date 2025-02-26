import Section, { type SectionProps } from 'ui/components/Section';
import Grid from 'ui/components/Grid';
import AvailabilityTable from './AvailabilityTable';
import SectionHeader from 'ui/components/Section/SectionHeader';

export interface AvailabilitySectionProps extends SectionProps {
  copy?: string;
  heading?: string;
  tagline?: string;
  metro:
    | {
        localCode: string;
        region: string;
        count: number;
        countDisplay: string | undefined;
      }[]
    | undefined;
}

const AvailabilitySection = ({ metro, copy, heading, tagline, ...props }: AvailabilitySectionProps) => {
  return metro ? (
    <Section {...props}>
      <Grid.Container>
        <Grid.Item xs={4} small={4} medium={6}>
          <SectionHeader copy={copy} heading={heading} tagline={tagline} />
        </Grid.Item>
        <Grid.Item xs={4} small={4} medium={6}>
          <AvailabilityTable metro={metro} />
        </Grid.Item>
      </Grid.Container>
    </Section>
  ) : null;
};

export default AvailabilitySection;
