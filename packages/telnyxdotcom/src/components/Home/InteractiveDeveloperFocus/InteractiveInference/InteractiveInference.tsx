import { InferenceDemoForm, type InferenceDemoFormProps } from 'components/InferenceDemo';

import * as css from './InteractiveInference.styled';

export interface InteractiveInferenceProps {
  form: InferenceDemoFormProps;
}

export const InteractiveInference = ({ form }: InteractiveInferenceProps) => {
  return (
    <css.Wrapper>
      <InferenceDemoForm {...form} embed />
    </css.Wrapper>
  );
};

export default InteractiveInference;
