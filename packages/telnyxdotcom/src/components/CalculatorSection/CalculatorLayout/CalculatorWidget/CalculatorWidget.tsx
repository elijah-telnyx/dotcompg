import { useId, type ReactNode } from 'react';
import Card from 'ui/components/Card';
import InfoTooltip from 'ui/components/InfoTooltip';
import Stepper, { useStepper } from 'ui/components/Stepper';
import CTA from 'ui/components/Typography/CTA';
import Heading from 'ui/components/Typography/Heading';

import type { StepperItemProps, StepperProps } from 'ui/components/Stepper/@types';
import * as css from './CalculatorWidget.styled';

const CalculatorWidgetStepperProgress = ({ isDark }: { isDark?: boolean }) => {
  const { currentStep, lastStepValue } = useStepper();

  return (
    <css.StepperDataWrapper>
      <CTA dark={isDark}>
        {currentStep} / {lastStepValue}
      </CTA>
      <Stepper.Progress getValueLabel={(currentStep, lastStepValue) => `Step ${currentStep} of ${lastStepValue}`} />
    </css.StepperDataWrapper>
  );
};

interface StepCardProps {
  children: ReactNode;
  heading?: string;
  hideNext?: boolean;
  infoTooltip?: string;
  lastStepCopy?: string;
}

const CalculatorWidgetCard = ({ heading, infoTooltip, hideNext, children, lastStepCopy = 'Next' }: StepCardProps) => {
  const id = useId();
  const { currentStep, lastStepValue } = useStepper();

  return (
    <Card stepper>
      {heading && (
        <css.CardHeader hasTooltip={Boolean(infoTooltip)}>
          <Heading level={3}>{heading}</Heading>
          {infoTooltip && (
            <InfoTooltip id={id} triggerLabel='info'>
              {infoTooltip}
            </InfoTooltip>
          )}
        </css.CardHeader>
      )}
      {children}

      <css.StepperNavButtonsWrapper>
        <Stepper.Back>
          <css.NavButton htmlAs='span' kind='cta' Icon={<css.NavButtonIcon />} direction='rtl' back>
            Back
          </css.NavButton>
        </Stepper.Back>

        {!hideNext && (
          <css.StepperNext disabled={hideNext}>
            <css.NavButton htmlAs='span' kind='cta' Icon={<css.NavButtonIcon />}>
              {currentStep === lastStepValue - 1 ? lastStepCopy : 'Next'}
            </css.NavButton>
          </css.StepperNext>
        )}
      </css.StepperNavButtonsWrapper>
    </Card>
  );
};

export interface CalculatorWidgetRootProps extends StepperProps {
  isDark?: boolean;
}

export const CalculatorWidgetRoot = ({ isDark, children, ...props }: CalculatorWidgetRootProps) => {
  return (
    <Stepper.Root {...props}>
      <CalculatorWidgetStepperProgress isDark={isDark} />
      {children}
    </Stepper.Root>
  );
};
CalculatorWidgetRoot.displayName = 'Calculator.WidgetRoot';

export interface CalculatorWidgetItemProps extends StepperItemProps, StepCardProps {}

export const CalculatorWidgetItem = ({ value, children, ...props }: CalculatorWidgetItemProps) => {
  return (
    <Stepper.Item value={value}>
      <CalculatorWidgetCard {...props}>{children}</CalculatorWidgetCard>
    </Stepper.Item>
  );
};

CalculatorWidgetItem.displayName = 'Calculator.WidgetItem';
