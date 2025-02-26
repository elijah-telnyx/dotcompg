import Section, { type SectionProps } from '../Section';
import type { GridItemProps } from '../Grid';
import { MediaSVG, type MediaProps } from '../Media';
import type { CTAButtonProps } from '../CtaButton';
import Grid from '../Grid';
import Heading from '../Typography/Heading';
import Quote from '../Typography/Quote';
import Paragraph from '../Typography/Paragraph';
import Caption from '../Typography/Caption';
import CtaButton from '../CtaButton';
import { isDarkBackgroundColor } from '../../styles/constants/backgroundColorOptions';
import * as css from './CustomerStories.styled';

const gridColumns: GridItemProps = {
  xs: 4,
  small: 8,
  medium: 12,
  large: 12,
  xl: 12,
};

const gapGridColumns: GridItemProps = {
  xs: 0,
  small: 0,
  medium: 0,
  large: 4,
};

export interface CustomerStoriesProps extends SectionProps {
  tagline: string;
  quote: string;
  copy: string;
  caption: string;
  link?: CTAButtonProps;
  icon?: MediaProps<'svg'>;
}
const CustomerStories = ({
  tagline,
  quote,
  copy,
  caption,
  link,
  icon,
  ...props
}: CustomerStoriesProps) => {
  const dark = isDarkBackgroundColor(props.backgroundColor);

  return (
    <Section {...props}>
      <css.Container>
        <Grid.Item {...gridColumns} htmlAs='header'>
          <Heading level={2} dark={dark} category>
            {tagline}
          </Heading>
        </Grid.Item>

        <Grid.Item {...gridColumns}>
          <css.StoryContainer>
            <Grid.Item xs={12} small={6} medium={9} large={8}>
              <Quote dark={dark}>{quote}</Quote>
            </Grid.Item>

            <css.CustomerItem xs={12} large={4}>
              <css.CustomerWrapper>
                <css.CustomerIcon hasIcon={Boolean(icon)}>
                  {icon && <MediaSVG {...icon} dark={dark} />}
                </css.CustomerIcon>
                <css.CustomerInfo>
                  <Paragraph dark={dark}>{copy}</Paragraph>
                  <Caption dark={dark}>{caption}</Caption>
                </css.CustomerInfo>
              </css.CustomerWrapper>
            </css.CustomerItem>
          </css.StoryContainer>
        </Grid.Item>

        <Grid.Item {...gapGridColumns} />

        {link && (
          <Grid.Item xs={4} small={8} medium={12} large={8}>
            <CtaButton {...link} backgroundColor={props.backgroundColor} />
          </Grid.Item>
        )}
      </css.Container>
    </Section>
  );
};

export default CustomerStories;
