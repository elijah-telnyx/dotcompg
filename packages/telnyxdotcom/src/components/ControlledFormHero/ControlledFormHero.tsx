import type { VoiceAIFormProps } from 'components/VoiceAIForm';
import dynamic from 'next/dynamic';
import { HorizontalFormSection, type HorizontalFormSectionProps } from 'ui/components/FormSection';
import type { MarketoFormProps } from 'ui/components/MarketoForm';

export interface FormWidget {
  heading: string;
  semanticHeading: boolean;
  formId?: number;
  formType?: 'Marketo' | 'VoiceAI';
  copy?: string;
  onSuccessRedirectsTo?: string;
  marketoRedirect?: boolean;
  disallowFreemail?: boolean;
}

type FormProps =
  | ({
      formType: 'Marketo';
    } & Partial<MarketoFormProps>)
  | ({
      formType: 'VoiceAI';
    } & Partial<VoiceAIFormProps>);

export type ControlledFormHeroProps = HorizontalFormSectionProps & { form: FormProps & FormWidget };

const MarketoForm = dynamic(() => import('ui/components/MarketoForm'));
const ControlledVoiceAIForm = dynamic(() => import('components/VoiceAIForm/ControlledVoiceAIForm'));

const Form = ({ formType, formId, ...props }: FormWidget) => {
  switch (formType) {
    case 'Marketo':
      if (!formId) return null;
      return <MarketoForm {...props} formId={formId} />;
    case 'VoiceAI':
      return <ControlledVoiceAIForm {...props} />;
    default:
      return null;
  }
};

export default function ControlledFormHero({ smallCopy, form, ...props }: ControlledFormHeroProps) {
  return (
    <HorizontalFormSection {...props} smallCopy={smallCopy} headingTag='h1' headingLevel={1}>
      <Form {...form} />
    </HorizontalFormSection>
  );
}
