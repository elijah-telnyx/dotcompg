import { styled } from "ui/styles";
import SectionComponent from "ui/components/Section";
import HeadingComponent from "ui/components/Typography/Heading";
import Paragraph from "ui/components/Typography/Paragraph";

export const Section = styled(SectionComponent, {
  marginInline: "auto",
  maxWidth: "$gridMaxWidth$base",

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

export const TextContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$xxs",
});

export const DatetimeInputContainer = styled("div", {
  display: "flex",
  flexWrap: "nowrap",
  flexDirection: "row",
  gap: "$xxs",
});

export const WrapperCopy = styled("div", {});

export const Copy = styled(Paragraph, {
  color: "$grayHoverDarkBackground",
});

export const Heading = styled(HeadingComponent, {});

export const LoadingContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  paddingInline: "$medium",
  marginBottom: "$medium",
});
