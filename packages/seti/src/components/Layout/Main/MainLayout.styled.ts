import { styled } from "ui/styles";
import { SIDEBAR_WIDTH } from "utils/dashboards";

export const PageWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  maxWidth: "100vw",
  "& main": {
    gridColumn: 2,
  },
});

export const MainWrapper = styled("div", {
  "@small": { display: "grid", gridTemplateColumns: `${SIDEBAR_WIDTH}px auto` },
});
