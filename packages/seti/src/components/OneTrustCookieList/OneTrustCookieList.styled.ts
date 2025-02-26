import { styled } from "ui/styles";
import Grid from "ui/components/Grid";

export const Container = styled(Grid.Container, {});

export const CookiePolicyItem = styled(Grid.Item, {
  "& h3": {
    marginBlockStart: "$large !important",

    "@medium": {
      marginBlockStart: "$xl !important",
    },
  },

  "& *": {
    color: "$grayHoverDarkBackground !important",
  },

  "& a": {
    background: "transparent !important",
  },

  // when cookie policy is visible, injected, other siblings are not relevant anymore
  // this is to avoid hydration issues - https://react.dev/reference/react-dom/hydrate#handling-different-client-and-server-content
  "&:empty ~ *": {
    display: "block",
  },
});

export const LoadingItem = styled("div", {
  display: "none",
  gridColumn: "span 12",
});
