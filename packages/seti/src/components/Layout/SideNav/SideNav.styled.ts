import { styled } from "ui/styles";
import { SIDEBAR_WIDTH } from "utils/dashboards";

export const Wrapper = styled("nav", {
  display: "none",
  "@small": {
    display: "flex",
  },
  flexDirection: "column",
  justifyContent: "space-between",
  position: "fixed",
  top: 0,
  left: 0,
  width: SIDEBAR_WIDTH,
  height: "100%",
  paddingTop: "$xxxl",
  color: "$cream",
  fontWeight: "bold",
  backgroundColor: "$grayEmbed",
  borderRight: "1px solid $grayStroke",
});

export const NavGroup = styled("ul", {
  listStyleType: "none",
  padding: "$medium $small",
  margin: 0,
});
export const NavItem = styled("li", {
  marginBottom: "$xxs",
  borderRadius: "$xs",
  transition: "all 0.15s ease-in-out",
  "&:hover": {
    backgroundColor: "$grayStroke",
  },
  a: {
    display: "block",
    padding: "$xs $small",
    cursor: "pointer",
  },
  variants: {
    selected: {
      true: {
        backgroundColor: "$black",
      },
    },
  },
});
