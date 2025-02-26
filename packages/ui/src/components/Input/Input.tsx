import { forwardRef, type ForwardedRef, useState } from 'react';
import * as css from './Input.styled';
import FieldMessage, { type FieldMessageProps } from './FieldMessage';
import type { VariantProps } from '@stitches/react';
import Tooltip, { TooltipIcon } from '../Tooltip';

const DEFAULT_TYPE = 'text';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    Pick<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows' | 'cols'>,
    VariantProps<typeof css.Input> {
  id: string;
  suffix?: React.ReactNode;
  label?: string | React.ReactNode;
  labelSize?: 'small';
  name: string;
  message?: Omit<FieldMessageProps, 'children'> & {
    text?: string;
  };
  helpText?: string;
  isDark?: boolean;
  min?: number | string;
  max?: number | string;
  minLabel?: string;
  maxLabel?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (
  {
    type = DEFAULT_TYPE,
    label,
    labelSize,
    message,
    isDark,
    suffix,
    helpText,
    ...props
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {};
  const messageProps: React.HTMLAttributes<HTMLDivElement> = {};

  const [rangeInputTmpValue, setRangeInputTmpValue] = useState(
    props.defaultValue || 0
  );

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

  if (type === 'checkbox') {
    return (
      <css.Wrapper>
        <css.CheckboxWrapper>
          <css.Input
            as='input'
            labelSize={labelSize}
            type={type}
            ref={ref}
            {...inputProps}
            {...props}
          />
          <css.Label size={labelSize} htmlFor={props.id}>
            {label}
          </css.Label>
        </css.CheckboxWrapper>
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
  }
  if (type === 'range') {
    const update = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.onChange !== undefined) {
        props.onChange(e);
      }
      setRangeInputTmpValue(+e.target.value);
      return +e.target.value;
    };
    const min = { value: props.min || 1, label: props.minLabel || '' };
    const max = { value: props.max || 1, label: props.maxLabel || '' };

    return (
      <css.Wrapper>
        <css.RangeWithLabelWrapper>
          <css.Wrapper>
            <css.Input
              as='input'
              labelSize={labelSize}
              type={type}
              ref={ref}
              value={rangeInputTmpValue}
              min={min.value}
              max={max.value}
              {...inputProps}
              {...props}
              onChange={update}
            />
            <css.RangeLabelsWrapper>
              <css.RangeLabel>{min.value + min.label}</css.RangeLabel>
              <css.RangeLabel>{max.value + max.label}</css.RangeLabel>
            </css.RangeLabelsWrapper>
          </css.Wrapper>
          <css.RangeInput
            as='input'
            type={'number'}
            value={rangeInputTmpValue}
            min={min.value}
            max={max.value}
            onChange={update}
          />
          {props?.minLabel}
        </css.RangeWithLabelWrapper>
      </css.Wrapper>
    );
  }
  if (type === 'radio') {
    return (
      <css.Wrapper>
        <css.RadioWrapper>
          <css.Input
            as='input'
            labelSize={labelSize}
            type='radio'
            ref={ref}
            {...inputProps}
            {...props}
          />

          <css.Label size={labelSize} htmlFor={props.id}>
            {label}
          </css.Label>
        </css.RadioWrapper>
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
  }

  const input = (
    <css.Input
      as={type === 'textarea' ? 'textarea' : 'input'}
      labelSize={labelSize}
      type={type}
      ref={ref}
      isDark={isDark}
      {...inputProps}
      {...props}
    />
  );

  return (
    <css.Wrapper>
      {label && (
        <css.Label size={labelSize} htmlFor={props.id} isDark={isDark}>
          {label}{' '}
          {helpText && (
            <Tooltip content={helpText}>
              <TooltipIcon variant='dark' isDark={isDark} />
            </Tooltip>
          )}
        </css.Label>
      )}
      {suffix ? (
        <css.InputWithSuffixWrapper isDark={isDark}>
          {input}
          <css.SuffixWrapper>{suffix}</css.SuffixWrapper>
        </css.InputWithSuffixWrapper>
      ) : (
        input
      )}
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

export default forwardRef<HTMLInputElement, InputProps>(Input);
