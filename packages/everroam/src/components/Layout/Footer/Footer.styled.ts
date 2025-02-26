import { AnchorElement } from "ui/components/Link";
import { Base } from "ui/components/Typography/utils";
import Section from "ui/components/Section";
import EverRoamLogoWithText from "../../Icons/EverRoamLogoWithText";
import { styled } from "ui/styles";

export const Footer = styled(Section, {
  borderTop: "1px solid $tan",
  maxWidth: "$gridMaxWidth$base",
  marginInline: "auto",
  width: "100%",
  "@xs": {
    maxWidth: "$gridMaxWidth$xs",
  },
  "@small": {
    maxWidth: "$gridMaxWidth$small",
  },
  "@medium": {
    maxWidth: "$gridMaxWidth$medium",
  },
  "@large": {
    maxWidth: "$gridMaxWidth$large",
  },
  "@xl": {
    maxWidth: "$gridMaxWidth$xl",
  },
});

export const NavigationLink = styled(AnchorElement, {
  typography: "$h2.category.mobile",

  "@medium": {
    typography: "$h2.category.mobile",
  },

  "&:hover, &:active": {
    color: "$grayHoverLightBackground",
  },
});

export const LogoItem = styled("div", {
  "@lessThanMedium": {
    marginTop: "$xl",
    order: 2,
  },
});

export const Logo = styled(EverRoamLogoWithText, {
  width: 200,
  height: 100,

  "@medium": {
    width: 157,
    height: 38,
  },

  "@large": {
    height: 65,
    width: 256,
  },
});

export const NavigationList = styled("ul", {
  listStyleType: "none",
  padding: 0,
  margin: 0,

  display: "grid",
  gap: "$large",
  "@medium": {
    gap: "$xl",
  },
  "@lessThanSmall": {
    "&:not(:last-child)": {
      marginBottom: "$xxl",
    },
  },
});

export const Container = styled("div", {
  marginBottom: "$xl",
  display: "grid",
  "@small": {
    gridTemplateColumns: "repeat(3, 1fr)",
    alignItems: "flex-start",
    columnGap: "$medium",
    [`${LogoItem}`]: {
      gridColumn: "span 3",
    },
  },
  "@medium": {
    gridTemplateColumns: "repeat(9, 1fr)",
    [`${NavigationList}`]: {
      gridColumn: "span 2",
    },
    [`${LogoItem}`]: {
      gridColumn: "span 5",
    },
  },
});

export const NavigationListItem = styled("li", {});

export const TileContainer = styled("div", {
  alignItems: "center",
  display: "flex !important",
  justifyContent: "space-between",
});

export const CopyrightText = styled(Base("span"), {
  fontFamily: "$inter",
  fontStyle: "normal",
  fontWeight: "$regular",
  fontSize: "$xxs",
  lineHeight: "$xxs",
});

export const SocialNavigationList = styled("ul", {
  listStyleType: "none",
  paddingInlineStart: 0,
  display: "flex",
  gap: "$xs",
  maxHeight: "24px",
  marginBlock: 0,
});

export const SocialNavigationItem = styled("li", {});

export const SocialIconLink = styled("a", {
  "&:hover, &:active": {
    color: "$blue",
  },
  "&:active": {
    color: "$green",
  },
});
