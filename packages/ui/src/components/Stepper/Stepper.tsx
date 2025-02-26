import { createContext, useState, useContext, useEffect } from 'react';
import * as css from './Stepper.styled';
import * as T from './@types';
import StepperProgress from '../Progress/StepperProgress/StepperProgress';

const StepperContext = createContext<T.StepperContextProps | null>(null);

const StepperContextProvider = ({
  children,
  firstStepValue = 0,
  lastStepValue = 0,
}: T.StepperProviderProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(
    function setInitialValue() {
      if (typeof firstStepValue === 'number') {
        setCurrentStep(firstStepValue);
      }
    },
    [firstStepValue]
  );

  const goToNextStep = (currentStep: number) => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };
  const goToPreviousStep = (currentStep: number) => {
    const nextStep = currentStep - 1;
    setCurrentStep(nextStep);
  };

  return (
    <StepperContext.Provider
      value={{
        currentStep,
        goToNextStep,
        goToPreviousStep,
        firstStepValue,
        lastStepValue,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};

export const useStepper = () => {
  const stepperContext = useContext(StepperContext);

  if (!stepperContext) {
    throw new Error(
      'useStepper has to be used within <StepperContext.Provider>'
    );
  }

  return stepperContext;
};

const NextButton = ({ children, disabled, className }: T.NavButton) => {
  const { goToNextStep, currentStep, lastStepValue } = useStepper();

  if (currentStep === lastStepValue) {
    return null;
  }

  return (
    <css.NavigationButton
      disabled={disabled}
      className={className}
      onClick={() => goToNextStep(currentStep)}
    >
      {children}
    </css.NavigationButton>
  );
};

NextButton.displayName = 'Stepper.Next';

const BackButton = ({ children, disabled }: T.NavButton) => {
  const { goToPreviousStep, currentStep, firstStepValue } = useStepper();

  if (currentStep === firstStepValue) {
    return null;
  }

  return (
    <css.NavigationButton
      disabled={disabled}
      onClick={() => goToPreviousStep(currentStep)}
    >
      {children}
    </css.NavigationButton>
  );
};

BackButton.displayName = 'Stepper.Back';

const Stepper = ({
  children,
  firstStepValue,
  lastStepValue,
}: T.StepperProps) => {
  return (
    <StepperContextProvider
      firstStepValue={firstStepValue}
      lastStepValue={lastStepValue}
    >
      <css.Root>{children}</css.Root>
    </StepperContextProvider>
  );
};
Stepper.displayName = 'Stepper.Root';

const StepperItem = ({ children, value }: T.StepperItemProps) => {
  const { currentStep } = useStepper();
  if (currentStep !== value) return null;
  return <css.Item data-value={value}>{children}</css.Item>;
};
StepperItem.displayName = 'Stepper.Item';

const Progress = (props: T.Progress) => {
  const { currentStep, lastStepValue } = useStepper();
  return <StepperProgress {...props} value={currentStep} max={lastStepValue} />;
};
Progress.displayName = 'Stepper.Progress';

export default {
  Root: Stepper,
  Item: StepperItem,
  Next: NextButton,
  Back: BackButton,
  Progress,
};
