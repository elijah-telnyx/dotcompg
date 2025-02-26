import * as css from './Progress.styled';
import type {
  ProgressProps as PrimitiveProgressProps,
  ProgressIndicatorProps as PrimitiveProgressIndicatorProps,
} from '@radix-ui/react-progress';

export interface ProgressProps extends PrimitiveProgressProps {
  value: number;
  max: number;
}

export const ProgressBar = css.ProgressBar;
ProgressBar.displayName = 'Progress.Bar';

export interface ProgressIndicatorProps
  extends PrimitiveProgressIndicatorProps {
  value: number;
  max: number;
}

const getPercent = ({ value, max }: { value: number; max: number }) =>
  100 - (value / max) * 100;

export const ProgressIndicator = ({
  value,
  max,
  ...props
}: ProgressIndicatorProps) => (
  <css.ProgressIndicator
    {...props}
    css={{
      ['$$filled-percent']: `${getPercent({ value, max }) * -1}%`,
    }}
  />
);
ProgressIndicator.displayName = 'Progress.Indicator';

export default {
  Bar: ProgressBar,
  Indicator: ProgressIndicator,
};
