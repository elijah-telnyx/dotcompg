import { styled } from "ui/styles";
import Paragraph from "ui/components/Typography/Paragraph";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  "& svg": { overflow: "visible" },
});

export const Copy = styled(Paragraph, {
  color: "$cream",
  fontSize: "11px !important",
  fontFamily: "$formula !important",
  lineHeight: "24px !important",
});
