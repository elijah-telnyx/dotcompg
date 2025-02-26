import { keyframes, styled } from "ui/styles";
import Paragraph from "ui/components/Typography/Paragraph";
import satellite from "./assets/satellite";

const panLeftRight = keyframes({
  "0%": { transform: "rotate(-33deg)" },
  "50%": { transform: "rotate(33deg)" },
  "100%": { transform: "rotate(-33deg)" },
});

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
});

export const Satellite = styled(satellite, {
  overflow: "visible",
  "#loader-satellite-dish": {
    animation: `${panLeftRight} 4000ms ease-out infinite`,
    transformOrigin: "50% 50%",
  },
});

export const Copy = styled(Paragraph, {
  width: "100%",
  textAlign: "center",
  color: "$cream",
  fontSize: "11px !important",
  fontFamily: "$formula !important",
  lineHeight: "24px !important",
  margin: "0 !important",
  padding: "0 !important",
});
