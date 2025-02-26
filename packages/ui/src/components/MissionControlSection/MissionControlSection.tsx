import Section, { type SectionProps } from '../Section';
import SectionHeader from '../Section/SectionHeader';
import * as css from './MissionControlSection.styled';
import Grid from '../Grid';
import LargeLinkImageRowSection, {
  type LargeLinkImageProps,
} from '../LargeLinkImageRowSection';

export interface MissionControlSectionProps extends SectionProps {
  tagline: string;
  heading: string;
  copy: string;
  images: LargeLinkImageProps[];
}

const MissionControlSection = ({
  tagline,
  heading,
  copy,
  images,
  ...props
}: MissionControlSectionProps) => {
  return (
    <Section {...props}>
      <Grid.FullWidthItem>
        <css.HeaderWrapper>
          <SectionHeader
            copy={copy}
            heading={heading}
            tagline={tagline}
            variant='center'
          />
        </css.HeaderWrapper>
      </Grid.FullWidthItem>
      <Grid.FullWidthItem>
        <LargeLinkImageRowSection images={images} />
      </Grid.FullWidthItem>
    </Section>
  );
};

export default MissionControlSection;
