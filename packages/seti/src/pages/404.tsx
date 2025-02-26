import CtaButton from "ui/components/CtaButton";
import Grid from "ui/components/Grid";
import Section from "ui/components/Section";
import Heading from "ui/components/Typography/Heading";
import Paragraph from "ui/components/Typography/Paragraph";
import { defaultGetStaticProps } from "utils/pageGeneration/defaultGetStaticProps";

const Error404 = () => {
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
            Error 404
          </Heading>
          <Heading level={1} dark dashboard css={{ marginBottom: "$medium" }}>
            Oops, this page doesn’t exist
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
            Unless you’re trying to access our 404 page. If you are, then you’re
            in the right place.
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

export const getStaticProps = defaultGetStaticProps({
  page: "404",
  getData: () => ({
    seo: { robots: "nofollow,noindex" },
  }),
});

export default Error404;
