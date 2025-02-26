import { styled } from "ui/styles";
import { height } from "./constants";

export const Wrapper = styled("div", {
  backgroundColor: "$grayEmbed",
  border: "1px solid $grayStroke",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: height.xs,
  paddingLeft: "$xl",
  paddingRight: "$xl",
  "@large": {
    height: height.large,
    paddingLeft: "$xl",
    paddingRight: "$xl",
  },
});

export const AlienModeButton = styled("button", {});

export const TextLink = styled("a", {
  marginLeft: "$medium",
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
  display: "flex",
  flexDirection: "column",
});

export const LogoText = styled("span", {
  textTransform: "uppercase",
  color: "$green",
  fontFamily: "$inter",
  fontSize: "10px", // too small
  lineHeight: "13px", // too small
  fontWeight: "$medium",
  letterSpacing: "0.4px",
  "-webkit-text-stroke-width": ".1mm",
  "-webkit-text-stroke-color": "$grayStroke", // brand new, from figma
});

export const ButtonWrapper = styled("div", {
  display: "flex",
  gap: "$small",
  justifyContent: "space-between",
  alignItems: "center",
});
