import { isDarkBackgroundColor } from '../../styles/constants/backgroundColorOptions';
import CtaButton, { type CTAButtonProps } from '../CtaButton';
import Grid from '../Grid';
import Input, { type InputProps } from '../Input';
import Markdown from '../Markdown';
import { type SectionProps } from '../Section';
import SectionHeader from '../Section/SectionHeader';
import * as css from './HomePageCtaDarkSection.styled';

interface SignUpFormCtaProps {
  input: InputProps;
  ctaButton: CTAButtonProps;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  footerCopy?: string;
}

const SignUpFormCta = ({
  input,
  ctaButton: { href, ...cta },
  onSubmit,
  footerCopy,
}: SignUpFormCtaProps) => {
  return (
    <css.CtaForm action={href} method='get' onSubmit={onSubmit}>
      <css.InputWrapper>
        <Input {...input} />
      </css.InputWrapper>
      <css.CtaButtonWrapper desktop>
        <CtaButton {...cta} htmlAs='button' />
      </css.CtaButtonWrapper>
      {footerCopy && (
        <css.FooterCopyWrapper>
          <Markdown caption>{footerCopy}</Markdown>
        </css.FooterCopyWrapper>
      )}
      <css.CtaButtonWrapper>
        <CtaButton {...cta} htmlAs='button' />
      </css.CtaButtonWrapper>
    </css.CtaForm>
  );
};

export interface HomePageCtaDarkSectionProps extends SectionProps {
  tagline: string;
  heading: string;
  copy: string;
  form: SignUpFormCtaProps;
}

export const HomePageCtaDarkSection = ({
  tagline,
  heading,
  copy,
  form,
  ...sectionProps
}: HomePageCtaDarkSectionProps) => {
  const isDark = isDarkBackgroundColor(sectionProps.backgroundColor);

  return (
    <css.SectionWrapper {...sectionProps}>
      <Grid.Container>
        <Grid.FullWidthItem>
          <css.SectionHeader>
            <SectionHeader
              tagline={tagline}
              heading={heading}
              copy={copy}
              isDark={isDark}
              variant='center'
            />
          </css.SectionHeader>
        </Grid.FullWidthItem>
        <Grid.FullWidthItem>
          <SignUpFormCta {...form} />
        </Grid.FullWidthItem>
      </Grid.Container>
    </css.SectionWrapper>
  );
};

export default HomePageCtaDarkSection;
