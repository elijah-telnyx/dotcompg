import type { CSSProperties } from "@stitches/react";
import { styled } from "ui/styles";
import Paragraph from "ui/components/Typography/Paragraph";
import Grid from "ui/components/Grid";

export const Container = styled("div", {
  display: "flex",
  gap: "$xxs",
  justifyContent: "flex-end",
  marginBottom: "$medium",
});

export const LabelContainer = styled(Grid.Container, {});

export const Label = styled(Grid.Item, Paragraph, {
  color: "$grayHoverDarkBackground",
});

export const buttonStyles: CSSProperties = {
  cursor: "pointer",
  color: "$cream",
  height: 16,
  padding: "calc($medium + 1px) $small",
  display: "flex",
  alignItems: "center",
  backgroundColor: "$setiTransparentGray",
  borderRadius: "$xs",
  border: "solid 1px $grayStroke",
};

export const buttonStylesDisabled: CSSProperties = {
  color: "$grayHoverDarkBackground",
  cursor: "default",
};

export const NotificationButton = styled("div", {
  ...buttonStyles,
  unset: "all",

  "&:hover": {
    cursor: "pointer",
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
    active: {
      true: {
        color: "$green",
      },
    },
    disabled: {
      true: {
        ...buttonStylesDisabled,

        "&:hover": {
          color: "$redEmbed",
        },
      },
    },
  },
});

export const ClearButton = styled("button", {
  ...buttonStyles,
  unset: "all",

  "&:hover": {
    color: "$grayHoverDarkBackground",
  },

  '&:disabled, &[aria-disabled="true"]': {
    cursor: "default",
    pointerEvents: "none",
  },

  variants: {
    disabled: {
      true: { ...buttonStylesDisabled },
    },
  },
});

export const PanelsContainer = styled(Grid.Container, {
  gap: "$xxs",
  marginTop: "$medium",
  width: "100%",
  height: "100%",
});

export const Panel = styled(Grid.Item, {});
