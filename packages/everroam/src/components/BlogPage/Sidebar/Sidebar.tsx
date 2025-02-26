import { useState } from "react";
import * as css from "./Sidebar.styled";
import SidebarLinks, {
  type SidebarLinksProps,
} from "ui/components/SidebarLinks";
import emailSignupService from "services/emailSignupService";
import type { Message } from "components/HomeHero/HomeHero";
import { email as validate } from "ui/utils/validators";

export interface SidebarProps {
  jumpLinks?: SidebarLinksProps;
}

const Sidebar = ({ jumpLinks }: SidebarProps) => {
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
    <css.SidebarItem xs={4} small={4} medium={4} large={4}>
      <css.SidebarWrapper>
        {jumpLinks && (
          <css.SidebarLinksWrapper>
            <SidebarLinks {...jumpLinks} />
          </css.SidebarLinksWrapper>
        )}
        <css.FormHeading level={3} htmlAs="h2">
          Join the waitlist
        </css.FormHeading>
        <css.Form>
          <css.EmailInput
            id="HeroEmailSignup"
            name="HeroEmailSignup"
            placeholder="Enter email"
            disabled={message?.type === "success"}
            onChange={(i) => setEmail(i.target.value)}
            message={message}
          />
          {message?.type !== "success" && (
            <css.SubmitButton
              type="button"
              onClick={handleSubmit}
              loading={submitting}
            >
              submit
            </css.SubmitButton>
          )}
        </css.Form>
      </css.SidebarWrapper>
    </css.SidebarItem>
  );
};

export default Sidebar;
