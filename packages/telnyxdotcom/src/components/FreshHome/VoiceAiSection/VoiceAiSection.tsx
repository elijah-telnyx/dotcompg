import type { SectionProps } from 'ui/components/Section';
import CtaButton, { type CTAButtonProps } from 'ui/components/CtaButton';
import SectionHeader from 'ui/components/Section/SectionHeader';
import { type VoiceAIFormProps } from 'components/VoiceAIForm';
import Caption from 'ui/components/Typography/Caption';
import IconStars from 'ui/components/Icons/Stars';
import { isDarkBackgroundColor } from 'ui/styles/constants/backgroundColorOptions';

import * as css from './VoiceAiSection.styled';
import ControlledVoiceAIForm from 'components/VoiceAIForm/ControlledVoiceAIForm';

export interface VoiceAiSectionProps extends SectionProps {
  tagline: string;
  heading: string;
  copy: string;
  caption: string;
  cta: CTAButtonProps;
  form: Omit<VoiceAIFormProps, 'onClickReturn' | 'onSubmit' | 'loading' | 'disabled' | 'apiMessage'>;
}

export const VoiceAiSection = ({ tagline, heading, copy, caption, cta, form, ...props }: VoiceAiSectionProps) => {
  const isDark = isDarkBackgroundColor(props.backgroundColor);

  return (
    <css.Section {...props}>
      <css.Wrapper>
        <css.HeaderWrapper>
          <SectionHeader tagline={tagline} heading={heading} copy={copy} cta={cta} isDark={isDark} variant='center' />
        </css.HeaderWrapper>

        <css.FormWrapper>
          <css.CaptionWrapper>
            <IconStars animate />
            <Caption>{caption}</Caption>
          </css.CaptionWrapper>
          <css.FormCard form embed>
            <ControlledVoiceAIForm {...form} embed />
          </css.FormCard>
        </css.FormWrapper>

        <css.CtaWrapper>
          <CtaButton {...cta} />
        </css.CtaWrapper>
      </css.Wrapper>
    </css.Section>
  );
};

export default VoiceAiSection;
