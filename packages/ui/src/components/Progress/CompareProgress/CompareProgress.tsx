import type { ProgressProps } from '../Progress';
import * as css from './CompareProgress.styled';
import type { CSSVariables } from '../../../styles/config/stitches.config';
import type { ReactNode } from 'react';

export interface CompareProgressProps extends ProgressProps {
  color?: CSSVariables<'colors'> | string;
  label: string;
  valuePrefix?: ReactNode;
  fullWidth?: boolean;
}

const CompareProgress = ({
  valuePrefix,
  value,
  max,
  color = '$blue',
  label,
  fullWidth,
  ...props
}: CompareProgressProps) => {
  const content = (
    <>
      <css.Label category level={2}>
        {label}
      </css.Label>
      <css.Value>
        {valuePrefix}
        {value}
      </css.Value>
      <css.ProgressBar value={value} max={max} {...props}>
        <css.ProgressIndicator
          value={value}
          max={max}
          css={{ backgroundColor: color }}
        />
      </css.ProgressBar>
    </>
  );
  if (fullWidth) return <css.FullWidthWrapper>{content}</css.FullWidthWrapper>;
  return <css.Wrapper>{content}</css.Wrapper>;
};

export default CompareProgress;
