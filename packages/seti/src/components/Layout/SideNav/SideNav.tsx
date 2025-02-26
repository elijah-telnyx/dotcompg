import * as css from "./SideNav.styled";
import Link from "next/link";
import data from "data/navigation";
import AlienAvatar from "components/AlienAvatar";
import useLocalStorage from "utils/hooks/useLocalStorage";
import { LocalStorage } from "data/storage";

const SideNav = ({ current }: { current: string }) => {
  const { getItem } = useLocalStorage();

  const alienModeEnabled = getItem(LocalStorage.ALIEN_MODE);

  return (
    <css.Wrapper>
      <css.NavGroup>
        {data.map(({ title, href }, index) => {
          return (
            <css.NavItem
              key={`navitem-${href}-${index}`}
              selected={href === current}
            >
              <Link href={href}>{title}</Link>
            </css.NavItem>
          );
        })}
      </css.NavGroup>
      {alienModeEnabled && <AlienAvatar />}
    </css.Wrapper>
  );
};

export default SideNav;
