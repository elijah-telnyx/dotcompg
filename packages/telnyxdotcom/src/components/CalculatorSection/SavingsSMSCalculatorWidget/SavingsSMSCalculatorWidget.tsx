import { useEffect, useRef, useState } from 'react';
import { getSMSCalculatorPricing } from 'services/publicApiService';
import Card from 'ui/components/Card';
import Input from 'ui/components/Input/Input';
import Stepper, { useStepper } from 'ui/components/Stepper/Stepper';
import CTA from 'ui/components/Typography/CTA';
import Savings from './Savings';
import * as css from './SavingsSMSCalculatorWidget.styled';
import type { NumberType, QuantityType } from './constants';
import { type CTAButtonProps } from 'ui/components/CtaButton';
import { numberQuantityOptions, numberTypesOptions } from './constants';
import { errorLogger } from 'utils/errorHandler/errorLogger';

const NextStep = () => {
  const { currentStep, lastStepValue } = useStepper();
  return (
    <Stepper.Next>
      <css.NavButton htmlAs='span' kind='cta' Icon={<css.NavButtonIcon />}>
        {currentStep === lastStepValue - 1 ? 'Calculate savings' : 'Next'}
      </css.NavButton>
    </Stepper.Next>
  );
};

const StepperData = ({ dark }: { dark?: boolean }) => {
  const { currentStep, lastStepValue } = useStepper();
  return (
    <css.StepperDataWrapper>
      <css.BackButtonWrapper>
        <Stepper.Back>
          <css.NavButton htmlAs='span' kind='cta' Icon={<css.NavButtonIcon />} dark={dark} direction='rtl' back>
            Back
          </css.NavButton>
        </Stepper.Back>
      </css.BackButtonWrapper>
      <CTA dark={dark}>
        {currentStep} / {lastStepValue}
      </CTA>
      <Stepper.Progress getValueLabel={(currentStep, lastStepValue) => `Step ${currentStep} of ${lastStepValue}`} />
    </css.StepperDataWrapper>
  );
};

const SavingsSMSCalculatorWidget = ({ dark, ctas }: SavingsSMSCalculatorWidgetProps) => {
  const apiData = useRef<SMSCalculatorApiResponse['data']>();
  const [numberType, setNumberType] = useState<NumberType>();
  const [numberOfSendMessages, setNumberOfSendMessages] = useState<QuantityType>();
  const [numberOfReceiveMessages, setNumberOfReceiveMessages] = useState<QuantityType>();

  useEffect(() => {
    getSMSCalculatorPricing()
      .then(({ data }) => {
        apiData.current = data;
      })
      .catch((error) => errorLogger(error));
  }, []);

  return (
    <css.StepperBlockWrapper>
      <Stepper.Root firstStepValue={1} lastStepValue={4}>
        <StepperData dark={dark} />
        <Stepper.Item value={1}>
          <Card stepper>
            <css.CardHeading level={3}>What numbers will you use to send and receive messages?</css.CardHeading>
            <css.RadioGroup>
              {numberTypesOptions.map(({ label, value }, index) => {
                const name = 'number-type';
                const id = `${name}-${index}`;
                const checked = value === numberType;
                return (
                  <Input
                    checked={checked}
                    id={id}
                    key={id}
                    label={label}
                    name={name}
                    onChange={() => setNumberType(value)}
                    type='radio'
                    value={value}
                  />
                );
              })}
            </css.RadioGroup>
            {numberType && <NextStep />}
          </Card>
        </Stepper.Item>
        <Stepper.Item value={2}>
          <Card stepper>
            <css.CardHeading level={3}>How many messages will you send per month?</css.CardHeading>
            <css.RadioGroup>
              {numberQuantityOptions.map((option, index) => {
                const name = 'send-messages';
                const id = `${name}-${index}`;
                const checked = option === numberOfSendMessages;

                return (
                  <Input
                    checked={checked}
                    id={id}
                    key={id}
                    label={option}
                    name={name}
                    onChange={() => setNumberOfSendMessages(option)}
                    type='radio'
                  />
                );
              })}
            </css.RadioGroup>

            {numberOfSendMessages && <NextStep />}
          </Card>
        </Stepper.Item>
        <Stepper.Item value={3}>
          <Card stepper>
            <css.CardHeading level={3}>How many messages will you receive per month?</css.CardHeading>
            <css.RadioGroup>
              {numberQuantityOptions.map((option, index) => {
                const name = 'receive-messages';
                const id = `${name}-${index}`;
                const checked = option === numberOfReceiveMessages;

                return (
                  <Input
                    checked={checked}
                    id={id}
                    key={id}
                    label={option}
                    name={name}
                    onChange={() => setNumberOfReceiveMessages(option)}
                    type='radio'
                  />
                );
              })}
            </css.RadioGroup>
            {numberOfReceiveMessages && <NextStep />}
          </Card>
        </Stepper.Item>
        <Stepper.Item value={4}>
          <Savings
            priceData={apiData.current}
            numberType={numberType}
            numberOfReceiveMessages={numberOfReceiveMessages}
            numberOfSendMessages={numberOfSendMessages}
            ctas={ctas}
          />
        </Stepper.Item>
      </Stepper.Root>
    </css.StepperBlockWrapper>
  );
};

type SMSCalculatorApiResponse = Awaited<ReturnType<typeof getSMSCalculatorPricing>>;

export default SavingsSMSCalculatorWidget;

export interface SavingsSMSCalculatorWidgetProps {
  dark?: boolean;
  ctas?: CTAButtonProps[];
}
