import { styled } from "ui/styles";
import H from "ui/components/Typography/Heading";
import Grid from "ui/components/Grid";
import MediaComponent from "ui/components/Media";

export const Container = styled(Grid.Container, {
  rowGap: "$medium",

  "@medium": {
    marginTop: "$large",
    rowGap: "$large",
  },
});

export const ContentItem = styled(Grid.Item, {
  order: 1,

  "@medium": {
    order: 2,
  },

  // for every first `p` or first `h2`, ignore the margin top as the top section already has margin that needs to be the same for the two column content
  "& div:first-child p:first-child, & div:first-child h2:first-child": {
    marginTop: 0,
  },
});
