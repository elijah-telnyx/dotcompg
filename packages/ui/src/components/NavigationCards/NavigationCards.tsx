import type { CardTheme } from '../../styles/constants/cardThemeOptions';

import Heading from '../Typography/Heading';
import CTA from '../Typography/CTA';
import Paragraph from '../Typography/Paragraph';
import * as css from './NavigationCards.styled';

import Grid from '../Grid';
import { Internal } from '../Icons';
import { isDarkBackgroundColor } from '../../styles/constants/backgroundColorOptions';

export interface NavigationCardsProps {
  items: NavigationCardItem[];
  dark?: boolean;
}
export interface NavigationCardItem {
  id: string;
  heading: string;
  dark: boolean;
  itemTheme?: CardTheme;
  navItems: NavigationItem[];
}

export interface NavigationItem {
  label?: string;
  items: Item[];
}

export interface Item {
  label: string;
  copy: string;
  href: string;
  dark?: boolean;
  backgroundColor?: CardTheme;
}

const NavigationCardItemLink = ({
  label,
  copy,
  href,
  backgroundColor,
}: Item) => {
  const dark = isDarkBackgroundColor(backgroundColor);
  return (
    <css.Link href={href}>
      <css.NavigationCardItemLinkContainer backgroundColor={backgroundColor}>
        <div>
          <CTA dark={dark}>{label}</CTA>
          <Paragraph dark={dark}>{copy}</Paragraph>
        </div>
        <css.ArrowIconWrapper dark={dark}>
          <Internal />
        </css.ArrowIconWrapper>
      </css.NavigationCardItemLinkContainer>
    </css.Link>
  );
};

const NavigationCards = ({ items, dark = false }: NavigationCardsProps) => {
  return (
    <Grid.Container>
      {items?.map((item, index) => {
        return (
          <css.NavigationCardsGridItem
            key={index}
            xs={4}
            small={8}
            large={8}
            xl={8}
            id={item.id}
          >
            <Heading level={2} dark={dark}>
              {item.heading}
            </Heading>
            <div>
              {item?.navItems?.map((navItem, navItemIndex) => {
                return (
                  <div key={navItemIndex}>
                    {navItem.label && (
                      <css.SubHeading level={2} category dark={dark}>
                        {navItem.label}
                      </css.SubHeading>
                    )}
                    <css.NavigationCardItemsContainer>
                      {navItem?.items?.map((linkItem, linkItemIndex) => {
                        return (
                          <NavigationCardItemLink
                            key={linkItemIndex}
                            backgroundColor={item.itemTheme}
                            {...linkItem}
                          />
                        );
                      })}
                    </css.NavigationCardItemsContainer>
                  </div>
                );
              })}
            </div>
          </css.NavigationCardsGridItem>
        );
      })}
    </Grid.Container>
  );
};

export default NavigationCards;
