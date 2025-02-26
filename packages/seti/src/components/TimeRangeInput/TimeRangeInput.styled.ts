import { styled } from "ui/styles";
import Input from "ui/components/Input";
import Paragraph from "ui/components/Typography/Paragraph";

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

export const DatetimeInputContainer = styled("div", {
  display: "flex",
  flexWrap: "nowrap",
  flexDirection: "row",
  gap: "$xxs",
  alignItems: "flex-end",
  backgroundColor: "$setiTransparentGray",

  variants: {
    orientation: {
      vertical: {
        flexDirection: "column",
        padding: "$medium",
        borderRadius: "$small",
        border: "1px solid $grayStroke",
        marginBottom: "$medium",
      },
      horizontal: {},
    },
    hidden: {
      true: {
        display: "none",
      },
    },
  },
});

export const SelectContainer = styled("div", {
  display: "flex",
  gap: "$xxs",
  justifyContent: "flex-end",
  marginBottom: "$xxs",
});

export const FieldContainer = styled("div", {
  display: "flex",
  gap: "$xxs",
});

export const Label = styled(Paragraph, {
  color: "$grayHoverDarkBackground",

  variants: {
    center: {
      true: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
  },
});

export const RefreshButton = styled("div", {
  cursor: "pointer",
  color: "$cream",
  height: 16,
  padding: "calc($medium + 1px) $small",
  unset: "all",
  display: "flex",
  alignItems: "center",
  backgroundColor: "$setiTransparentGray",
  borderRadius: "$xs",
  border: "solid 1px $grayStroke",

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
