import type { HeaderNavigationItemGroup, HeaderNavigationItemLink } from '../Header';
import * as Header from 'ui/components/HeaderNew';
import * as css from './HeaderNavigation.styled';

export function HeaderResourcesNavigation({ label, seeMoreLink, items }: HeaderNavigationItemGroup) {
  return (
    <Header.NavigationMenu label={label} seeMoreLink={seeMoreLink}>
      <css.ThreeColumnGrid>
        {items.map((item) => (
          <css.GroupItem key={item.id}>
            <Header.NavigationMenuItem {...(item as HeaderNavigationItemLink)} />
          </css.GroupItem>
        ))}
      </css.ThreeColumnGrid>
    </Header.NavigationMenu>
  );
}
