import { isDarkBackgroundColor } from '../../../styles/constants/backgroundColorOptions';
import MarketoForm, {
  type MarketoFormProps,
  type MarketoNativeForm,
} from '../../MarketoForm';
import FormSection, { type FormSectionProps } from '../FormSection';

export interface MarketoFormSectionProps
  extends Omit<FormSectionProps, 'card'> {
  form: MarketoFormProps;
  onSuccessRedirectsTo?:
    | string
    | ((form: MarketoNativeForm, formid: number) => void);
}

const MarketoFormSection = ({ form, ...props }: MarketoFormSectionProps) => {
  const onlyMarketoHeading = !props.heading && form.heading;
  const isDark = isDarkBackgroundColor(props.backgroundColor);

  return (
    <FormSection
      {...props}
      card={!form.singleFieldLayout}
      fullHeight={!form.singleFieldLayout}
    >
      <MarketoForm
        {...form}
        isDark={isDark}
        headingTag={onlyMarketoHeading ? props.headingTag : undefined}
      />
    </FormSection>
  );
};

export default MarketoFormSection;
