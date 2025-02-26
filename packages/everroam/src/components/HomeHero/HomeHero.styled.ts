import { styled, theme } from "ui/styles";
import Section from "ui/components/Section";
import Heading from "ui/components/Typography/Heading";
import Grid from "ui/components/Grid";

export const TaglineWrapper = styled("div", {
  marginBottom: "$medium",
  "@medium": {
    marginBottom: "$xl",
  },
});

export const SectionWrapper = styled(Section, {
  backgroundSize: "cover",
  "@large": {
    display: "flex",
    alignItems: "center",
    height: "748px",
    "& > *": {
      width: "100%",
    },
  },
});

export const TextContainer = styled("div", {
  background: "$cream",
  borderRadius: "$xl",
  "@lessThanMedium": { padding: "$xl" },
  "@medium": { padding: "$xxl" },
});

export const ImageItem = styled(Grid.Item, {});

export const TextWrapper = styled("div", {
  display: "grid",
  justifyContent: "left",
  alignItems: "end",
  gap: "$xxl",
  gridArea: "main",
});

export const CtaWrapper = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: "$xs",
  "@medium": {
    gap: "$small",
  },
});

export const CtaCopyWrapper = styled("div", {
  marginTop: "$xs",
  "@medium": {
    marginTop: "$small",
  },
});

export const WrapperCopy = styled("div", {
  marginTop: "$xs",
  marginBottom: "$large",

  "@medium": {
    marginTop: "$small",
    marginBottom: "$xl",
  },
  "@large": {
    marginTop: "$large",
    marginBottom: "$xxl",
  },
});

export const HeadingOne = styled(Heading, {
  "@medium": {
    typography: "$h1.alt",
  },
  "@large": {
    typography: "$h1",
  },
});

export const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "$small",
  "@medium": {
    flexDirection: "row",
  },
});

export const CtaButtonWrapper = styled("div", {});

export const FootnoteText = styled("p", {
  marginTop: "$large",
  color: "$grayHoverLightBackground",
});
