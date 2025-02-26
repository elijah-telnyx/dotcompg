import type { ProgressProps } from '../Progress';
import * as css from './StepperProgress.styled';

export type StepperProgressProps = ProgressProps;

const StepperProgress = ({ value, max }: StepperProgressProps) => {
  return (
    <css.ProgressBar
      value={value}
      max={max}
      getValueLabel={(value, max) => `Step ${value} of ${max}`}
    >
      <css.ProgressIndicator value={value} max={max} />
    </css.ProgressBar>
  );
};

export default StepperProgress;
