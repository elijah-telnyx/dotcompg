import {
  isDarkCardTheme,
  type CardTheme,
} from '../../styles/constants/cardThemeOptions';

import CtaButton, { type CTAButtonProps } from '../CtaButton';
import * as css from './NavigationBubbles.styled';
import ChevronRight from '../Icons/ChevronRight';
import { useState } from 'react';
import useBrowserLayoutEffect from '../../utils/hooks/useBrowserLayoutEffect';
import useInitialScroll from '../../utils/hooks/useInitialScroll';
import VisuallyHidden from '../VisuallyHidden';
export interface NavigationBubblesProps {
  items: NavigationBubbleItemProps[];
  defaultExpandedItems?: NavigationBubbleItemProps['id'][];
}
export interface NavigationBubbleItemProps {
  id: string;
  heading: string;
  itemTheme?: CardTheme;
  navItems: NavigationBubbleGroupItemProps[];
}

export interface NavigationBubbleItemTypographyProps {
  dark: boolean;
  itemTheme?: CardTheme;
  inline?: boolean;
}

export interface NavigationBubbleGroupItemProps {
  label?: string;
  items: CTAButtonProps[];
}

const NavigationBubbleItemGroupItem = ({
  dark,
  itemTheme,
  inline,
  ...navItem
}: NavigationBubbleGroupItemProps & NavigationBubbleItemTypographyProps) => (
  <css.NavigationBubbleItemGroupItem itemTheme={itemTheme} inline={inline}>
    {navItem.label && (
      <css.NavigationBubbleItemGroupItemHeading
        level={2}
        dark={dark}
        category
        fixedHeight
      >
        {navItem.label}
      </css.NavigationBubbleItemGroupItemHeading>
    )}
    <css.NavigationBubbleItemGroupLinksContainer>
      {navItem?.items?.map((linkItem, linkItemIndex) => {
        return (
          <CtaButton
            key={linkItemIndex}
            {...linkItem}
            className='mchNoDecorate' // dynamically generated
            text={
              <>
                {linkItem.text} <ChevronRight width={12} height={12} />
              </>
            }
          />
        );
      })}
    </css.NavigationBubbleItemGroupLinksContainer>
  </css.NavigationBubbleItemGroupItem>
);

const NavigationBubbles = ({
  items,
  defaultExpandedItems = [],
}: NavigationBubblesProps) => {
  const [expanded, setExpanded] = useState<string[]>(defaultExpandedItems);

  const expand = () => {
    if (!expanded.length) {
      expandAll();
    }
  };

  useInitialScroll(expand);

  useBrowserLayoutEffect(() => {
    // if scroll down fails to open the bubbles, it try open when page loads
    window.addEventListener('load', expand);
  }, []);

  const expandAll = () => {
    setExpanded(items.map(({ id }) => id));
  };

  return (
    <css.NavigationBubblesContainer
      type='multiple'
      value={expanded}
      /**
       * Will expand all items but won't allow them to collapse again
       */
      onValueChange={expandAll}
    >
      {items?.map((item, index) => {
        const dark = isDarkCardTheme(item.itemTheme);
        const inline = item?.navItems?.length === 1;

        return (
          <css.NavigationBubbleItem
            key={index}
            value={item.id}
            id={item.id}
            itemTheme={item.itemTheme}
            inline={inline}
          >
            <css.NavigationBubbleItemTrigger asChild>
              <css.NavigationBubbleItemHeading
                id={item.id}
                level={2}
                dark={dark}
                inline={inline}
              >
                {item.heading}
              </css.NavigationBubbleItemHeading>
            </css.NavigationBubbleItemTrigger>

            <css.NavigationBubbleItemContent inline={inline}>
              {item?.navItems?.map((navItem, navItemIndex) => (
                <NavigationBubbleItemGroupItem
                  inline={inline}
                  {...navItem}
                  key={navItemIndex}
                  dark={dark}
                  itemTheme={item.itemTheme}
                />
              ))}
            </css.NavigationBubbleItemContent>

            <VisuallyHidden>
              {item?.navItems?.map((navItem, navItemIndex) => (
                <NavigationBubbleItemGroupItem
                  {...navItem}
                  key={navItemIndex}
                  dark={dark}
                  itemTheme={item.itemTheme}
                />
              ))}
            </VisuallyHidden>
          </css.NavigationBubbleItem>
        );
      })}
    </css.NavigationBubblesContainer>
  );
};

export default NavigationBubbles;
