import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import type { Optional } from "ui/utils/types";
import SetiLogo from "../../Icons/SetiLogo";
import AlienModeToggle from "../../Icons/AlienModeToggle";
import * as css from "./Header.styled";
import { type AnchorHTMLAttributes } from "react";
import { EnableAlienMode } from "ui/styles/GlobalStyle";
import useLocalStorage from "utils/hooks/useLocalStorage";
import { LocalStorage } from "data/storage";
import featureFlippers from "constants/featureFlippers";

export interface HeaderLinkProps
  extends Pick<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "rel" | "target" | "referrerPolicy"
  > {
  href: string;
  /**
   * The content of the button that will open the dropdown
   */
  label: string;
  id: string;
}

export interface NavigationItem extends Optional<HeaderLinkProps, "href"> {
  /**
   * The content of the dropdown
   */
  items?: HeaderLinkProps[];
  /**
   * The see more link of the end of dropdown list
   */
  seeMoreLink?: HeaderLinkProps;
}

const Header = () => {
  const { getItem, setItem } = useLocalStorage();

  // fetch session storage and apply theme accordingly
  const alienModeEnabled = getItem(LocalStorage.ALIEN_MODE);
  if (alienModeEnabled && featureFlippers.DOTCOM_3869_FACEHUGGER)
    EnableAlienMode();

  // check string values because LocalStorage doesn't set/get as boolean
  const toggleTheme = () => {
    setItem(LocalStorage.ALIEN_MODE, String(!alienModeEnabled));
    window.location.reload();
  };

  return (
    <css.Wrapper>
      <css.LogoLink href="/">
        <SetiLogo aria-hidden="true" />
        <VisuallyHidden.Root>Home</VisuallyHidden.Root>
      </css.LogoLink>
      <css.ButtonWrapper>
        <css.TextLink
          href="https://telnyx.com/contact-us"
          target="_blank"
          rel="noopener"
        >
          Contact Us
        </css.TextLink>
        {featureFlippers.DOTCOM_3869_FACEHUGGER && (
          <css.AlienModeButton
            onClick={toggleTheme}
            aria-label={`Switch to ${
              alienModeEnabled ? "default theme" : "alien mode"
            }`}
          >
            <AlienModeToggle />
          </css.AlienModeButton>
        )}
      </css.ButtonWrapper>
    </css.Wrapper>
  );
};

export default Header;
