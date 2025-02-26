import { keyframes, styled } from "ui/styles";
import AlienAvatar from "./assets/AlienAvatar";

const ANIMATION_DURATION = "120s"; // to account for idle time between left/right

const hover = keyframes({
  "0%, 100%": { transform: "translate(0,0)" },
  "50%": { transform: "translate(0,-3px)" },
});

/* tilt, moveEyes, and moveMouth keyframe percents
 * each percent corresponds to ~1.2 seconds, derived from 120s duration / 100
 */
const tilt = keyframes({
  "0%, 51%, 100%": { transform: "rotate(-7deg)" },
  "1%, 50%": { transform: "rotate(7deg)" },
});

const moveEyes = keyframes({
  "0%, 51%, 100%": { transform: "translate(-4px,0)" },
  "1%, 50%": { transform: "translate(4px,0)" },
});
const moveMouth = keyframes({
  "0%, 51%, 100%": { transform: "translate(-2px,0)" },
  "1%, 50%": { transform: "translate(2px,0)" },
});

export const Container = styled("div", {
  textAlign: "center",
});

export const Avatar = styled(AlienAvatar, {
  overflow: "visible",
  animation: `${hover} 1000ms ease-in-out infinite`,
  transformOrigin: "50% 50%",
  "#seti-avatar-ship": {
    animation: `${tilt} ${ANIMATION_DURATION} ease-in-out infinite`,
    transformOrigin: "50% 50%",
  },
  "#seti-avatar-alien-eyes": {
    animation: `${moveEyes} ${ANIMATION_DURATION} ease-in-out infinite`,
    transformOrigin: "50% 50%",
  },
  "#seti-avatar-alien-mouth": {
    animation: `${moveMouth} ${ANIMATION_DURATION} ease-in-out infinite`,
    transformOrigin: "50% 50%",
  },
});
