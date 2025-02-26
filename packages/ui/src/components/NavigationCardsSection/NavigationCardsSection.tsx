import { isDarkBackgroundColor } from '../../styles/constants/backgroundColorOptions';
import Grid from '../Grid';
import NavigationCards from '../NavigationCards';
import type { NavigationCardsProps } from '../NavigationCards/NavigationCards';
import Section, { type SectionProps } from '../Section';
import Select, { type SelectProps } from '../Select';

import * as css from './NavigationCardsSection.styled';

export interface NavigationCardsSectionProps
  extends NavigationCardsProps,
    SectionProps {
  filter: SelectProps;
}

const NavigationCardsSection = ({
  items,
  filter,
  backgroundColor,
  ...props
}: NavigationCardsSectionProps) => {
  const dark = isDarkBackgroundColor(backgroundColor);

  return (
    <Section {...props} backgroundColor={backgroundColor}>
      {filter.items && filter.items.length > 0 && (
        <css.CategorySelectContainer>
          <Grid.Container>
            <Grid.Item xs={4} small={4} large={4} xl={4}>
              <Select {...filter}></Select>
            </Grid.Item>
          </Grid.Container>
        </css.CategorySelectContainer>
      )}
      <NavigationCards dark={dark} items={items}></NavigationCards>
    </Section>
  );
};

export default NavigationCardsSection;
