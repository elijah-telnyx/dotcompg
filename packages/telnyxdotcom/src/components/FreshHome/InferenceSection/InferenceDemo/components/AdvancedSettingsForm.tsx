import Prompt from './Prompt';
import { useState } from 'react';
import ComboBox from 'ui/components/ComboBox';
import * as Inference from 'ui/components/Inference';
import Slider from 'ui/components/Input/Slider';
import Tooltip, { TooltipIcon } from 'ui/components/Tooltip';
import Label from 'ui/components/Typography/Label';
import type { InferenceDemoValues, LlmModel } from '../InferenceDemo';
import { styled } from 'ui/styles';

const FieldWrapper = styled('div', {
  display: 'grid',
  gap: '$xs',
  [`${Label.toString()}`]: {
    display: 'flex',
    alignItems: 'center',
    gap: '$xxs',
  },
});

const Form = styled('form', {
  display: 'grid',
  gap: '$large',
});
const Button = styled('button', {
  width: 'fit-content',
  borderRadius: '$xxxl',
  border: 'none',
  textTransform: 'uppercase',
  padding: '$small',
  paddingBottom: '$xs',
  backgroundColor: '$black',
  color: '$cream',
  fontFamily: '$formula',
  fontSize: '$xs',
  lineHeight: '$xs',
  fontWeight: '$extrabold',
  letterSpacing: '0.06em',
  '&:hover': {
    backgroundColor: '$grayHoverLightBackground',
    borderColor: '$grayHoverLightBackground',
  },
});

export type AdvancedSettingsFormValues = Pick<InferenceDemoValues, 'aiModel' | 'temperature' | 'prompt'>;

export interface AdvancedSettingsFormProps {
  isOpen: Inference.InferenceFloatingMenuProps['isOpen'];
  onOpenChange: Required<Inference.InferenceFloatingMenuProps>['onOpenChange'];
  onSubmit: (values: AdvancedSettingsFormValues) => void;
  modelOptions: LlmModel[];
  isFormDisabled: boolean;
  showTooltipOnHover?: boolean;
  initialValues?: AdvancedSettingsFormValues;
}

export function AdvancedSettingsForm({
  isOpen,
  onOpenChange,
  isFormDisabled,
  modelOptions,
  initialValues,
  onSubmit,
  showTooltipOnHover,
}: AdvancedSettingsFormProps) {
  const [aiModel, setAIModel] = useState<string>(initialValues?.aiModel ?? '');
  const [temperature, setTemperature] = useState<number>(initialValues?.temperature ?? 0);
  const [prompt, setPrompt] = useState<string>(initialValues?.prompt ?? '');

  const handleAdvancedSettingsUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit({ aiModel, temperature, prompt });
    }
  };

  const resetValues = () => {
    setAIModel(initialValues?.aiModel ?? '');
    setTemperature(initialValues?.temperature ?? 0);
    setPrompt(initialValues?.prompt ?? '');
  };

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);

    const isClosing = !isOpen;
    if (isClosing) {
      resetValues();
    }
  };

  return (
    <Inference.FloatingMenu
      label='Advanced Settings'
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      css={{
        backgroundColor: '$white',
      }}
      showTooltipOnHover={showTooltipOnHover}
    >
      <Form onSubmit={handleAdvancedSettingsUpdate}>
        <FieldWrapper>
          <Label id='aiModel'>Model(Required)</Label>
          <ComboBox
            placeholder=''
            onSelect={(option) => setAIModel(option.value)}
            value={aiModel}
            disabled={isFormDisabled}
            theme='light'
            options={modelOptions}
            modal={false}
          />
        </FieldWrapper>

        <FieldWrapper>
          <Label id='temperature'>
            Temperature
            <Tooltip
              content='Higher values will make the output more random, while lower values will make it more focused and
            deterministic.'
              variant='dark'
            >
              <TooltipIcon variant='dark' />
            </Tooltip>
          </Label>
          <Slider
            id='temperature-slider'
            defaultValue={[0.9]}
            describedBy='temperature'
            min={0}
            max={1}
            step={0.01}
            onValueChange={(value) => setTemperature(value[0])}
            disabled={isFormDisabled}
            value={[temperature]}
            theme='light'
            name='temperature'
          />
        </FieldWrapper>
        <FieldWrapper>
          <Label>Prompt</Label>
          <Prompt
            placeholder='You are a helpful assistant that summarizes long bodies of text.'
            disabled={isFormDisabled}
            onChange={(event) => setPrompt(event.target.value)}
            value={prompt}
          />
        </FieldWrapper>
        <Button type='submit' css={{ maxWidth: 'fit-content' }}>
          Confirm
        </Button>
      </Form>
    </Inference.FloatingMenu>
  );
}
