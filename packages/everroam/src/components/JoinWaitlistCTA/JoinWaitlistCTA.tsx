import { useState } from "react";
import * as css from "./JoinWaitlistCTA.styled";
import Input from "ui/components/Input";
import Button from "ui/components/Button";
import Grid from "ui/components/Grid";
import { fullWidthColumns } from "ui/components/Grid/Grid";
import type { SectionProps } from "ui/components/Section";
import Heading from "ui/components/Typography/Heading";
import Paragraph from "ui/components/Typography/Paragraph";
import emailSignupService from "services/emailSignupService";
import type { Message } from "components/HomeHero/HomeHero";
import { email as validate } from "ui/utils/validators";

export interface JoinWaitlistCTAProps extends SectionProps {}

const JoinWaitlistCTA = ({ ...props }: JoinWaitlistCTAProps) => {
  const [email, setEmail] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>(undefined);

  const handleSubmit = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setSubmitting(true);

    if (!email || validate(email)) {
      setMessage({
        type: "error",
        text: validate(email) || "Please enter a valid email address.",
      });
      setSubmitting(false);
      return;
    }

    try {
      await emailSignupService.submitEmailSignup(email);
      setMessage({
        type: "success",
        text: "Submission successful",
      });
      return;
    } catch (e) {
      console.error("Failed to submit email signup", e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <css.Wrapper htmlAs="div" centered={true} {...props}>
      <Grid.Container>
        <Grid.Item {...fullWidthColumns}>
          <Heading level={2} htmlAs={"strong"}>
            Join the waitlist
          </Heading>
          <Paragraph
            lead
            css={{
              marginTop: "$xs",
              "@medium": {
                marginTop: "$medium",
              },
            }}
          >
            Sign up for our marketing newsletter for new products and feature
            updates, tutorials, and events.
          </Paragraph>
          <css.Form onSubmit={handleSubmit}>
            <css.EmailField>
              <Input
                id="HeroEmailSignup"
                name="HeroEmailSignup"
                placeholder="Enter email"
                disabled={message?.type === "success"}
                onChange={(i) => setEmail(i.target.value)}
                message={message}
              />
            </css.EmailField>
            <css.ButtonsContainer>
              {message?.type !== "success" && (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  loading={submitting}
                >
                  submit
                </Button>
              )}
            </css.ButtonsContainer>
          </css.Form>
          <css.TermsCopy>
            You can unsubscribe at any time. Read our privacy policy and terms
            and conditions.
          </css.TermsCopy>
        </Grid.Item>
      </Grid.Container>
    </css.Wrapper>
  );
};

export default JoinWaitlistCTA;
