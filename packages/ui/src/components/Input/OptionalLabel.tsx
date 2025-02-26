import { LabelOptional } from './Input.styled';

export type OptinalLabelForm = {
  label: string;
};

export const OptionalLabel = ({ label }: OptinalLabelForm) => {
  return (
    <LabelOptional>
      {label} <em>Optional</em>
    </LabelOptional>
  );
};
