import { styled } from "ui/styles";
import { height, transition } from "../constants";

import { ScrollDirection } from "./useScrollDirection";

export const Container = styled("header", {
  zIndex: "$headerMenu",
  transition: "top 0.5s",
  position: "sticky",
  variants: {
    direction: {
      [ScrollDirection.UP]: {
        ...transition.up,
        top: 0,
      },
      [ScrollDirection.DOWN]: {
        ...transition.down,
        top: -height.xs,

        "&:focus-within, &:hover": {
          top: 0,
        },

        "@large": {
          top: -height.large,
        },
      },
    },
  },

  defaultVariants: {
    direction: ScrollDirection.UP,
  },
});
