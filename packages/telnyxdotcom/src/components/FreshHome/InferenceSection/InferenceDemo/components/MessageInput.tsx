import { useState } from 'react';
import * as Inference from 'ui/components/Inference';

interface MessageInputProps {
  onMessage: Inference.InferenceMessageInputProps['onMessage'];
  disabled?: boolean;
}

export function MessageInput({ onMessage, disabled }: MessageInputProps) {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleOnMessage = (message: string) => {
    setValue('');
    onMessage(message);
  };

  return (
    <Inference.MessageInput
      label='Message'
      placeholder='Enter text here'
      onMessage={handleOnMessage}
      value={value}
      onChange={handleChange}
      isButtonDisabled={!value}
      disabled={disabled}
    />
  );
}
