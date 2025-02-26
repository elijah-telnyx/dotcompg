import React from "react";
import useBrowserLayoutEffect from "ui/utils/hooks/useBrowserLayoutEffect";
import { height } from "../constants";
import { config } from "ui/styles";
import useMedia from "ui/utils/hooks/useMedia";

const CSS_VAR_HEADER_SCROLL_PADDING_Y = "--headerPaddingY";
const UNIT = "px";

export enum ScrollDirection {
  UP = "UP",
  DOWN = "DOWN",
}

const setHeaderPaddingY = (valueInPx: number) => {
  // at the first direction change, headerPaddingY doesn't get reflected faster then the scroll start
  document.documentElement.style.setProperty(
    CSS_VAR_HEADER_SCROLL_PADDING_Y,
    String(valueInPx) + UNIT
  );
};

const useScrollDirection = () => {
  const lastScrollRef = React.useRef(0);
  const [direction, setDirection] = React.useState(ScrollDirection.UP);
  const isLargeViewport = useMedia(config.media.large);

  useBrowserLayoutEffect(() => {
    const onScroll = () => {
      const direction =
        window.scrollY > lastScrollRef.current
          ? ScrollDirection.DOWN
          : ScrollDirection.UP;
      setDirection(direction);
      lastScrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useBrowserLayoutEffect(() => {
    if (direction === ScrollDirection.UP) {
      setHeaderPaddingY(isLargeViewport ? height.large : height.xs);
    } else {
      setHeaderPaddingY(0);
    }
  }, [direction, isLargeViewport]);

  return direction;
};
export default useScrollDirection;
