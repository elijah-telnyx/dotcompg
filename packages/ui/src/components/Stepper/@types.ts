import type { ReactNode } from 'react';
import type { StepperProgressProps } from '../Progress/StepperProgress';

export interface StepperContextProps {
  currentStep: number;
  firstStepValue: number;
  lastStepValue: number;
  goToNextStep: (arg: number) => void;
  goToPreviousStep: (arg: number) => void;
}

export type StepperProps = Pick<
  StepperContextProps,
  'firstStepValue' | 'lastStepValue'
> & {
  children: ReactNode;
};

export type StepperProviderProps = StepperProps;

export interface StepperItemProps {
  children: ReactNode;
  value: number;
}

export interface NavButton {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export type Progress = Omit<StepperProgressProps, 'value' | 'max'>;
