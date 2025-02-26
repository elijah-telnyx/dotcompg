import Grid from "ui/components/Grid";
import Link from "ui/components/Link";
import { Content } from "ui/components/Link/Link.styled";
import { styled, theme } from "ui/styles";

import { height } from "./constants";

const calcMaxWidthFrom = (viewport: keyof typeof theme.viewports) => {
  const value = theme.viewports[viewport].value.split("px")[0];
  const breakingPoint = Number(value) - 1 + "px";
  return `@media (max-width: ${breakingPoint})`;
};
export const mediaOnlyBelowMedium = calcMaxWidthFrom("large");

export const MainItem = styled(Link, {
  "@large": {
    [`& ${Content}`]: {
      "&:before": {
        all: "unset",
      },
      typography: "$cta.mobile",
      // used to nav items to match with figma layout
      fontSize: "15px",
      "&:hover": {
        color: "$grayHoverDarkBackground",
      },
      '&:active, [data-state="open"] &': {
        color: "$green",
      },
      color: "$cream",
    },
    paddingInline: "6px",
  },
  [mediaOnlyBelowMedium]: {
    [`& ${Content}`]: {
      fontSize: "$xl",
      lineHeight: "$xl",
    },
    width: "100%",

    // padding bottom is smaller because of the extra bottom space from the typography
    paddingBlock: "10px 6px",
  },
});

export const Wrapper = styled("div", {
  backgroundColor: "$black",
  height: height.xs,
  "@large": {
    height: height.large,
  },
  display: "flex",
  alignItems: "end",
});

export const ButtonWrapper = styled(Grid.Item, {
  alignSelf: "center",
  justifySelf: "end",
  alignItems: "baseline",
  display: "flex !important",
  gridColumnStart: "-2 !important",
  gap: "$small",
});

export const TextLink = styled("a", {
  whiteSpace: "nowrap",
  alignItems: "center",
  fontFamily: "$formula",
  fontSize: "$xxs",
  fontWeight: "$extrabold",
  color: "$cream",
  lineHeight: "$large",
  textTransform: "uppercase",

  "& svg": {
    height: "$lineHeights$small",
    width: "$lineHeights$small",
    marginBlockEnd: "$xxxs", // account for font bottom pad
    marginInlineStart: "$xs",
  },

  "@large": {
    paddingInline: "$xs",
    "&:nth-child(2)": {
      paddingRight: 0,
    },
    fontSize: "$xxs",
    lineHeight: "$medium",
    color: "$cream",

    "& svg": {
      height: "$lineHeights$xxs",
      width: "$lineHeights$xxs",
    },
  },
});

export const LogoLink = styled("a", {
  gridColumn: "span 2",
  color: "$cream",
});

export const Navigation = styled("nav", {
  display: "flex",
  marginLeft: "0px",
  "@large": {
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: "$xxs",
    "& > a, & > button": {
      paddingLeft: "$medium",
      paddingRight: "$medium",
    },
  },
  [mediaOnlyBelowMedium]: {
    flexWrap: "wrap",
    marginBottom: 6,
    gap: "$xs",
    // TODO: The a element don't apply the grid gap correctly
    "& > a": {
      marginBottom: "$xs",
    },
  },
});

export const Header = styled(Grid.Container, {
  alignItems: "end",
  paddingBlock: "$small",
  width: "100%",
  "@large": {
    maxWidth: "100%",
    paddingLeft: "40px",
    paddingRight: "40px",
  },
});

export const LogoOnlyHeader = styled(Header, {
  height: "100%",
});

export const MenuButton = styled("button", {
  display: "flex",
  color: "$cream",
  padding: "$small",
  paddingRight: 0,
  position: "relative",
  zIndex: "$headerMenuBtn",
  transition: "color 0.25s ease-out",
  "&:hover": {
    color: "$grayHoverDarkBackground",
  },
  rect: {
    transition: "transform 0.5s ease-out",
  },
  '&[aria-expanded="true"]': {
    color: "$black",
    "rect:nth-child(1)": {
      transform: "translateY(5px)",
    },
    "rect:nth-child(2)": {
      transform: "translateY(-5px)",
    },
    svg: {
      display: "flex",
      alignItems: "center",
    },
  },
});

export const MenuNavigationContainer = styled("div", {
  background: "$green",
  overflow: "auto",
  height: "100vh",
  width: "100vw",
  position: "fixed",
  paddingTop: 80,
  paddingInline: 28,
  "#mobile-navigation-sign-up": {
    marginTop: "calc($xl + $xxs)",
  },
  "@small": {
    paddingInline: 40,
    [`#mobile-navigation-sign-up`]: {
      display: "none",
    },
  },
  left: 0,
  top: 0,
  transform: "translateY(-100%)",
  opacity: 0,
  transition: "transform 0.5s ease-in-out, opacity 0.2s linear",
  '[aria-expanded="true"] + &': {
    transform: "translateY(0%)",
    opacity: 1,
  },
});

export const HiddenOnLarge = styled("div", {
  display: "block",
  "@large": {
    display: "none",
  },
});

export const NavigationWrapper = styled(Grid.Item, {
  display: "none",
  "@medium": {
    display: "grid",
  },
  "@large": {
    display: "flex!important",
    justifyContent: "center",
  },
});

export const MobileNavigationWrapper = styled(Grid.Container, {
  paddingLeft: "$xxs",
});
