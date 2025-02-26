import type { HTMLAttributes } from "react";
import Section from "ui/components/Section";
import Grid from "ui/components/Grid";
import Paragraph from "ui/components/Typography/Paragraph";
import { BRANCH_NAME, BUILD_NUMBER } from "env";

type CopyProps = HTMLAttributes<HTMLParagraphElement>;

const Copy = (props: CopyProps) => (
  <Paragraph
    dashboard
    dark
    css={{ color: "$grayHoverDarkBackground" }}
    {...props}
  />
);

const MetaCopy = () => {
  return (
    <Section
      backgroundColor="black"
      spacingTop="none"
      spacingBottom="continuous"
      css={{
        marginInline: "auto",
        maxWidth: "$gridMaxWidth$base",

        "@xs": {
          maxWidth: "$gridMaxWidth$xs",
        },
        "@small": {
          maxWidth: "$gridMaxWidth$xs",
        },
        "@medium": {
          maxWidth: "$gridMaxWidth$small",
        },
        "@large": {
          maxWidth: "$gridMaxWidth$large",
        },
        "@xl": {
          maxWidth: "$gridMaxWidth$xl",
        },
      }}
    >
      <Grid.Container>
        <Grid.Item xs={4} small={8} medium={12}>
          <Copy>
            Branch: {BRANCH_NAME}, Version: {BUILD_NUMBER}
          </Copy>
        </Grid.Item>
      </Grid.Container>
    </Section>
  );
};

export default MetaCopy;
