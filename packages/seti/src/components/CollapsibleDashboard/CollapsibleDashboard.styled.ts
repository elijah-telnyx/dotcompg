import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { styled, keyframes } from "ui/styles";
import SectionComponent from "ui/components/Section";
import HeadingComponent from "ui/components/Typography/Heading";
import Input from "ui/components/Input";
import Grid from "ui/components/Grid";
import ChevronDownOutlineIcon from "ui/components/Icons/ChevronDownOutline";
import { CaptionDashboard } from "ui/components/Typography/Caption";

const FadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

export const Section = styled(SectionComponent, {});
export const Heading = styled(HeadingComponent, {
  variants: {
    size: {
      xs: {
        fontSize: "$xxs",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
      },
      small: {},
      medium: {},
      large: {},
    },
  },
});

export const TextContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$xxs",
  marginBottom: "$xxs",
});

export const Item = styled(Grid.Item, {
  position: "relative",

  variants: {
    chart: {
      true: {
        borderRadius: "$small",
        border: "1px solid $grayStroke",
        padding: "$medium",
      },
    },
  },
});

export const ChartContainer = styled("div", {
  height: 284, // figma

  variants: {
    size: {
      xs: {
        height: 70,
      },
      small: {
        height: 142,
      },
      medium: {},
      large: {
        height: 568,
      },
    },
  },
});

export const FeedbackContainer = styled("div", {
  color: "$cream",
  textAlign: "center",
  position: "absolute",
  right: 0,
  bottom: 0,
  backgroundColor: "$grayEmbedBlur",
  backdropFilter: "blur(2px)",
  width: "100%",
  height: "calc(100% - $space$large)", // account for title
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "& p": {
    marginBottom: "6.25%", // 1/8 of the container top portion size
  },
});

export const Copy = styled(CaptionDashboard, {
  variants: {
    error: {
      true: {
        color: "$redEmbed",
      },
    },
  },
});

export const HeadingIcon = styled(ChevronDownOutlineIcon, {
  color: "$cream",
  transition: "transform ease-out 0.25s",
  transform: "rotate(-90deg)",
});

export const TriggerContainer = styled(
  CollapsiblePrimitive.Trigger,
  Grid.Container,
  {
    display: "flex",
    gap: "$xxs",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",

    [`&[data-state='open']`]: {
      marginInline: "-$medium",
      transform: "translateX($space$medium)",
      padding: 0,

      [`& ${HeadingIcon}`]: {
        transform: "none",
      },
    },

    ['&[data-state="closed"]']: {
      padding: "$medium",

      "&:hover, &:focus": {
        backgroundColor: "$grayStroke",
      },
    },
  }
);

export const TriggerActionsContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "$xs",
});

// this needs to be a `div` with role `button` because it's already inside TriggerContainer which is already a button
export const RefreshButton = styled("div", {
  cursor: "pointer",
  color: "$cream",
  height: 16,
  unset: "all",

  "&:hover, &:focus": {
    color: "$grayHoverDarkBackground",
  },

  '&:disabled, &[aria-disabled="true"]': {
    cursor: "default",
    pointerEvents: "none",

    "& svg": {
      color: "$grayHoverDarkBackground",
    },
  },

  variants: {
    hidden: {
      true: {
        display: "none",
      },
    },
  },
});

export const InputField = styled(Input, {
  border: "none",
  backgroundColor: "transparent",
  color: "$cream",
  minWidth: "100%",
  // match heading size
  fontSize: "$small !important",
  lineHeight: "$xs !important",
  padding: 0,

  "&:hover, &:focus, &:active": {
    border: "none",
  },

  "& ::-webkit-calendar-picker-indicator": {
    color: "$cream",
  },

  "&:invalid": {
    color: "$redEmbed",

    "&::-webkit-datetime-edit-year-field, &::-webkit-datetime-edit-day-field, &::-webkit-datetime-edit-month-field ":
      {
        color: "$redEmbed",
      },
  },
});

// this needs to be a `div` with role `button` because it's already inside TriggerContainer which is already a button
export const DatetimeButton = styled("div", {
  cursor: "pointer",
  color: "$cream",
  height: 16,
  unset: "all",

  "&:hover": {
    color: "$grayHoverDarkBackground",
  },

  '&:disabled, &[aria-disabled="true"]': {
    cursor: "default",
    pointerEvents: "none",

    "& svg": {
      color: "$grayHoverDarkBackground",
    },
  },
});

export const DatetimeInputContainer = styled("div", {
  display: "flex",
  flexWrap: "nowrap",
  flexDirection: "row",
  gap: "$xxs",
});

export const ContentContainer = styled(CollapsiblePrimitive.Content, {
  height: "100%",
  position: "relative",
});

export const PanelsContainer = styled(Grid.Container, {
  height: "100%",
  width: "100%",
  rowGap: "$xl",

  [`[data-state='open'] &`]: {
    marginTop: "$xxl",
  },
});

export const LoaderOverlay = styled("div", {
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  background: "$grayEmbed",
  borderRadius: "$small",
  animation: `${FadeIn} 100ms linear forwards`,
});

export const CopyContainer = styled("div", {});

export const Container = styled(CollapsiblePrimitive.Root, {
  backgroundColor: "$setiTransparentGray",
  borderRadius: "$small",
  border: "1px solid $grayStroke",
  maxWidth: "$gridMaxWidth$base",
  marginInline: "auto",
  rowGap: "$xl",

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

  [`&[data-state='open']`]: {
    padding: "$medium",

    [`& ${Item}`]: {
      borderRadius: "none",
      border: "none",
      padding: 0,
    },
  },

  [`& ${TriggerContainer}`]: {
    borderRadius: "$small",
  },
});
