import type { NextPageContext } from "next";
import CtaButton from "ui/components/CtaButton";
import Grid from "ui/components/Grid";
import Section from "ui/components/Section";
import Heading from "ui/components/Typography/Heading";
import Paragraph from "ui/components/Typography/Paragraph";

interface Props {
  statusCode?: number;
}

const ErrorPage = ({ statusCode }: Props) => {
  return (
    <Section
      backgroundColor="black"
      spacingTop="contrasting"
      spacingBottom="contrasting"
      hasOverflow={false}
    >
      <Grid.Container css={{ textAlign: "center", placeContent: "center" }}>
        <Grid.FullWidthItem>
          <Heading
            level={2}
            category
            dark
            dashboard
            css={{ marginBottom: "$xl" }}
          >
            Error {statusCode}
          </Heading>
          <Heading level={1} dark dashboard css={{ marginBottom: "$medium" }}>
            Unavailable{" "}
          </Heading>
          <Paragraph
            css={{
              marginBottom: "$xl",
              maxWidth: 530,
              marginInline: "auto",
              "@medium": {
                marginBottom: "$xxl",
              },
            }}
            dark
            dashboard
          >
            Sorry, this page is temporarily unavailable. Please try again in a
            few minutes.
          </Paragraph>
          <CtaButton
            href="/"
            type="button"
            text="Back to home"
            backgroundColor="black"
            buttonKind="secondary"
          />
        </Grid.FullWidthItem>
      </Grid.Container>
    </Section>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default ErrorPage;
