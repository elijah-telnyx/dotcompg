import { useState } from 'react';
import Input, { type InputProps } from 'ui/components/Input';

const NumberInputWithWarning = ({ message, onKeyDown, ...props }: Omit<InputProps, 'type'>) => {
  const [showWarning, setShowWarning] = useState(false);

  return (
    <Input
      {...props}
      onKeyDown={(e) => {
        onKeyDown?.(e);

        if (e.key.length === 1 && !/^[0-9]\d*$/.test(e.key)) {
          setShowWarning(true);
        } else {
          setShowWarning(false);
        }
      }}
      message={
        message ||
        (showWarning
          ? {
              type: 'error',
              text: 'Please enter only numbers in this field, letters and symbols are not allowed.',
            }
          : undefined)
      }
      type='number'
    />
  );
};

export default NumberInputWithWarning;
