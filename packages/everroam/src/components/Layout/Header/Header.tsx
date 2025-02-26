import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import type { Optional } from "ui/utils/types";
import Button from "ui/components/Button";
import EverRoamLogoWithText from "../../Icons/EverRoamLogoWithText";
import * as css from "./Header.styled";
import { type AnchorHTMLAttributes } from "react";
import Grid from "ui/components/Grid";
import { AnchorElement } from "ui/components/Link";

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
  return (
    <css.Wrapper>
      <css.Header>
        <Grid.Item xs={2}>
          <css.LogoLink href="/">
            <EverRoamLogoWithText width={144} aria-hidden="true" />
            <VisuallyHidden.Root>Home</VisuallyHidden.Root>
          </css.LogoLink>
        </Grid.Item>
        <css.ButtonWrapper xs={1} small={2} large={1}>
          <css.TextLink href="#" target="_blank" rel="noopener noreferrer">
            Contact Us
          </css.TextLink>
          <Button
            htmlAs={AnchorElement}
            variant="header"
            kind="primary"
            background="dark"
            href="#"
            id="header-join-waitlist"
          >
            Join Waitlist
          </Button>
        </css.ButtonWrapper>
      </css.Header>
    </css.Wrapper>
  );
};

export default Header;
