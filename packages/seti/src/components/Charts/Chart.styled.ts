import { styled } from "ui/styles";

export const AbsoluteChart = styled("div", {
  backgroundColor: "$grayEmbed",
  borderRadius: "$small",
  border: "1px solid $grayStroke",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "$xl",
  width: "100%",
  height: "100%",
  textAlign: "center",
  fontSize: "$xxl",
  fontWeight: "bold",

  "@xl": {
    padding: "$xxxl",
  },

  variants: {
    backgroundColor: {
      green: {
        backgroundColor: "$green",
        color: "$black",
      },
      citron: {
        backgroundColor: "$citron",
        color: "$black",
      },
      orange: {
        backgroundColor: "$orange",
        color: "$black",
      },
      red: {
        backgroundColor: "$redEmbed",
        color: "$cream",
      },
      black: {
        backgroundColor: "$black",
        color: "$cream",
      },
    },
    size: {
      xs: {
        fontSize: "$xs",
        padding: "$medium",

        "@xl": {
          padding: "$xl",
        },
      },
      small: {
        fontSize: "$xl",
      },
      medium: {},
      large: {},
    },
  },
});

export const ChartLegendItem = styled("span", {
  variants: {
    active: {
      true: {
        opacity: 1,
      },
    },
  },
});
