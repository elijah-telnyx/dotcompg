import type { HeaderNavigationItemLink } from '../Header';
import { GroupItemWrapper, GroupItem } from './HeaderNavigation.styled';
import * as Header from 'ui/components/HeaderNew';

export type HeaderNavigationGroupProps = {
  items: HeaderNavigationItemLink[];
};

export const HeaderNavigationGroup = ({ items }: HeaderNavigationGroupProps) => {
  return (
    <GroupItemWrapper>
      {items.map((item) => (
        <GroupItem key={item.id}>
          <Header.NavigationMenuItem {...item} />
        </GroupItem>
      ))}
    </GroupItemWrapper>
  );
};
