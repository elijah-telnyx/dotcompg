import { styled } from "ui/styles";
import Section from "ui/components/Section";

export const ButtonsContainer = styled("div", {
  display: "block",
  gap: "$medium",
  "@small": {
    gap: "$small",
  },
  "@medium": {
    gap: "$large",
  },
});

export const Wrapper = styled(Section, {
  background: "linear-gradient(0deg, $colors$cream, $colors$citron) !important",
  variants: {
    centered: {
      true: {
        textAlign: "center",
        [`${ButtonsContainer}`]: {
          justifyContent: "center",
        },
      },
    },
  },
});

export const EmailField = styled("div", {});

export const TermsCopy = styled("span", {
  display: "inline-block",
  fontStyle: "italic",
  marginTop: "$small",
});

export const Form = styled("form", {
  display: "flex",
  marginTop: "$large",
  placeContent: "center",
  flexDirection: "column",
  gap: "$small",
  "@medium": {
    flexDirection: "row",
  },
});
