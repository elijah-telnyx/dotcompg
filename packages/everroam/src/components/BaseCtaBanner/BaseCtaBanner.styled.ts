import { styled } from "ui/styles";
import Section from "ui/components/Section";
import Heading from "ui/components/Typography/Heading";

export const ButtonsContainer = styled("div", {
  display: "flex",
  gap: "$medium",
  "@small": {
    gap: "$small",
  },
  "@medium": {
    gap: "$large",
  },
});

export const Wrapper = styled(Section, {
  variants: {
    centered: {
      true: {
        textAlign: "center",
        [`${ButtonsContainer}`]: {
          justifyContent: "center",
          marginTop: "$large",
        },
      },
    },
  },
});

export const Tagline = styled(Heading, {
  display: "inline-block",
  backgroundColor: "$tan",
  borderRadius: "$xl",
  padding: "$small $small $xs",
});
