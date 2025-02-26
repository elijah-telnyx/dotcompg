import Grid from '../Grid';
import NavigationBubbles from '../NavigationBubbles';
import type { NavigationBubblesProps } from '../NavigationBubbles/NavigationBubbles';
import Section, { type SectionProps } from '../Section';

export interface NavigationBubblesSectionProps
  extends NavigationBubblesProps,
    SectionProps {}

const NavigationBubblesSection = ({
  items,
  backgroundColor,
  defaultExpandedItems,
  ...props
}: NavigationBubblesSectionProps) => {
  return (
    <Section {...props} backgroundColor={backgroundColor}>
      <Grid.Container>
        <Grid.FullWidthItem>
          <NavigationBubbles
            items={items}
            defaultExpandedItems={defaultExpandedItems}
          ></NavigationBubbles>
        </Grid.FullWidthItem>
      </Grid.Container>
    </Section>
  );
};

export default NavigationBubblesSection;
