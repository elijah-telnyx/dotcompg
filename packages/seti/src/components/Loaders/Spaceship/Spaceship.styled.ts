import { keyframes, styled } from "ui/styles";
import Paragraph from "ui/components/Typography/Paragraph";
import ship from "./assets/ship";

const FlyIn = keyframes({
  "0%": { transform: "scale(0.10,0.10) rotate(4deg) translate(0,-20px)" },
  "25%": { transform: "scale(0.25,0.25) rotate(-3deg) translate(50px,-15px)" },
  "50%": { transform: "scale(0.5,0.5) rotate(2deg) translate(-50px,-10px)" },
  "75%": { transform: "scale(0.75,0.75) rotate(-2deg) translate(50px,-5px)" },
  "100%": { transform: "scale(1,1) rotate(0deg) translate(0,0)" },
});

const BeamDown = keyframes({
  "0%": { opacity: 0, transform: "scale(0.25,0.5)" },
  "25%": { opacity: 0.25, transform: "scale(0.25,1)" },
  "50%": { opacity: 1, transform: "scale(1,1)" },
  "75%": { opacity: 0.5, transform: "scale(0.25,1)" },
  "100%": { opacity: 0.25, transform: "scale(0.25,0.25)" },
});

const Hover = keyframes({
  "0%": { transform: "rotate(0deg) translateX(1px) rotate(0deg)" },
  "100%": { transform: "rotate(360deg) translateX(1px) rotate(-360deg);" },
});

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
});

export const Ship = styled(ship, {
  overflow: "visible",
  transformOrigin: "50% 0",
  animation: `${FlyIn} 1000ms linear forwards`,
  "#loader-spaceship-beam": {
    opacity: 0,
    transformOrigin: "50% 0",
    animation: `${BeamDown} 2000ms ease-out 1250ms infinite`,
  },
  "#loader-spaceship-body-yellow": {
    transformOrigin: "50% 50%",
    animation: `${Hover} 500ms linear reverse infinite`,
  },
  "#loader-spaceship-body-green": {
    transformOrigin: "50% 50%",
    animation: `${Hover} 666ms linear infinite`,
  },
  "#loader-spaceship-body-orange": {
    transformOrigin: "50% 50%",
    animation: `${Hover} 789ms linear infinite`,
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
