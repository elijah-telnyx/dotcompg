import { useState } from "react";
import Button from "ui/components/Button";
import Input from "ui/components/Input";
import Grid from "ui/components/Grid";
import Markdown from "ui/components/Markdown";
import type { MediaProps } from "ui/components/Media";
import type { SectionProps } from "ui/components/Section";
import * as css from "./HomeHero.styled";
import emailSignupService from "services/emailSignupService";
import { type FieldMessageProps } from "ui/components/Input/FieldMessage";
import { email as validate } from "ui/utils/validators";

export interface HomeHeroProps extends SectionProps {
  heading: string;
  copy: string;
  media: MediaProps<"media">;
}

export type Message =
  | (Omit<FieldMessageProps, "children"> & {
      text?: string;
    })
  | undefined;

const HomeHero = ({ heading, copy, media }: HomeHeroProps) => {
  const [email, setEmail] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>(undefined);

  const dark = false;

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
    <css.SectionWrapper css={{ backgroundImage: `url(${media.src})` }}>
      <Grid.Container>
        <Grid.Item xs={4} small={6} medium={7} large={7}>
          <css.TextContainer>
            <css.HeadingOne level={1} dark={dark}>
              {heading}
            </css.HeadingOne>
            <css.WrapperCopy>
              {copy && (
                <Markdown dark={dark} lead={true}>
                  {copy}
                </Markdown>
              )}
              <css.FootnoteText>
                Join our waitlist for a chance to win 120GB of free data.
              </css.FootnoteText>
            </css.WrapperCopy>
            <css.CtaWrapper>
              <css.Form onSubmit={handleSubmit}>
                <Input
                  id="HeroEmailSignup"
                  name="HeroEmailSignup"
                  placeholder="Enter email"
                  disabled={message?.type === "success"}
                  message={message}
                  onChange={(i) => setEmail(i.target.value)}
                />
                <css.CtaButtonWrapper>
                  {message?.type !== "success" && (
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      loading={submitting}
                    >
                      submit
                    </Button>
                  )}
                </css.CtaButtonWrapper>
              </css.Form>
            </css.CtaWrapper>
          </css.TextContainer>
        </Grid.Item>
      </Grid.Container>
    </css.SectionWrapper>
  );
};

export default HomeHero;
