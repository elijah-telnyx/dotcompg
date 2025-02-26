import { styled } from "ui/styles";
import H from "ui/components/Typography/Heading";
import Grid from "ui/components/Grid";
import MediaComponent from "ui/components/Media";
import Input from "ui/components/Input";
import Button from "ui/components/Button";

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

export const SidebarItem = styled(Grid.Item, {
  marginTop: "$large",
  order: 2,

  "@medium": {
    marginTop: 0,
    order: 1,
  },
});

export const AuthorCardWrapper = styled("div", {
  marginTop: "$xl",

  "@medium": {
    marginTop: "$xxl",
  },
});

export const SocialShareWrapper = styled("div", {
  marginTop: "$xl",

  "@medium": {
    marginTop: "$xxl",
  },
});

export const SidebarWrapper = styled("div", {
  "@medium": {
    paddingTop: "$xs", // account for Content line height spacing
    position: "sticky",
    top: "calc(48px + var(--headerPaddingY))",
    transition: "top 0.5s ease-in-out",
  },
});

export const SidebarLinksWrapper = styled("div", {
  "@medium": {
    marginBottom: "$xxl",
  },
});

export const FormHeading = styled(H, {
  marginBottom: "$xs",
  "@medium": {
    marginBottom: "$medium",
  },
});

export const Media = styled(MediaComponent, {
  borderRadius: "$medium",
  "@medium": {
    borderRadius: "$large",
  },
});

export const Form = styled("div", {});

export const EmailInput = styled(Input, {
  minWidth: "unset",
});

export const SubmitButton = styled(Button, {
  marginTop: "$small",
});
