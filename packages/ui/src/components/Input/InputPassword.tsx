import { forwardRef, useState, type ForwardedRef } from 'react';
import IconEyeClosed from '../Icons/EyeClosed';
import IconEyeOpened from '../Icons/EyeOpened';

import FieldMessage, { type FieldMessageProps } from './FieldMessage';
import * as css from './Input.styled';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string | React.ReactNode;
  name: string;
  showMessageOnActive?: boolean;
  message?: Omit<FieldMessageProps, 'children'> & {
    text?: string;
  };
}

const InputPassword = (
  { label, message, showMessageOnActive, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {};
  const messageProps: React.HTMLAttributes<HTMLDivElement> = {};

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (message?.text && message?.type) {
    inputProps['aria-invalid'] = false;
    messageProps['id'] = `${props.id}_message`;

    if (message.type === 'error') {
      inputProps['aria-invalid'] = message.type === 'error';
      inputProps['aria-errormessage'] = messageProps.id;
    } else {
      inputProps['aria-describedby'] = messageProps.id;
    }
  }

  return (
    <css.Wrapper showMessageOnActive={showMessageOnActive}>
      {label && <css.Label htmlFor={props.id}>{label}</css.Label>}
      <css.InputWithSuffixWrapper>
        <css.Input
          as='input'
          ref={ref}
          {...inputProps}
          {...props}
          type={!showPassword ? 'password' : 'text'}
        />
        <css.SuffixWrapper
          css={{ cursor: 'pointer' }}
          aria-label={!showPassword ? 'show password' : 'hide password'}
          onClick={handleShowPassword}
        >
          {!showPassword ? <IconEyeOpened /> : <IconEyeClosed />}
        </css.SuffixWrapper>
      </css.InputWithSuffixWrapper>
      {message?.text && (
        <FieldMessage
          {...messageProps}
          type={message?.type}
          multiline={message?.multiline}
        >
          {message.text}
        </FieldMessage>
      )}
    </css.Wrapper>
  );
};

export default forwardRef<HTMLInputElement, InputProps>(InputPassword);
