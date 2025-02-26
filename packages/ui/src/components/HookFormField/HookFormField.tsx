import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from 'react-hook-form';
import { email } from '../../utils/validators';
import { defaultErrorMessages } from '../../utils/validators';
import Select from '../Select';
import Label from '../Typography/Label';
import Input, { Message } from '../Input';
import { styled } from '../../styles';
import Tooltip, { TooltipIcon } from '../Tooltip';

type FieldShared<T extends FieldValues> = {
  id: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  disabled?: boolean;
  defaultValue?: string;
};

type SelectField = {
  type: 'select';
  items: { value: string; name: string }[];
};

type TextField = {
  type: 'text' | 'textarea';
};

type EmailField = {
  type: 'email';
};

type TelField = {
  type: 'tel';
};

type RadioField = {
  type: 'radio';
  items: { value: string; label: string }[];
};

type FileField = {
  type: 'file';
};

type FieldTypes =
  | SelectField
  | TextField
  | EmailField
  | TelField
  | RadioField
  | FileField;

export type Field<T extends FieldValues> = FieldShared<T> & FieldTypes;

export default function HookFormField<T extends FieldValues>({
  register,
  errors,
  control,
  ...field
}: Field<T> & {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  control: Control<T>;
}) {
  const generateValidation = (field: Field<T>) => {
    const validation: Record<
      string,
      string | ((value?: string | undefined) => string | undefined)
    > = {};
    if (field.required) {
      validation.required = defaultErrorMessages.required.defaultMessage;
    }
    if (field.type === 'email') {
      validation.validate = email;
    }

    return validation;
  };

  /**
   * TODO: fix type for register
   */
  switch (field.type) {
    case 'select':
      return (
        <div>
          <Label css={{ marginBottom: '$xxs' }}>
            {field.label}{' '}
            {field.helpText && (
              <Tooltip content={field.helpText}>
                <TooltipIcon variant='dark' />
              </Tooltip>
            )}
          </Label>

          <Controller
            control={control}
            name={field.id}
            rules={generateValidation(field)}
            render={({ field: { onChange, ref, ...fieldProps } }) => {
              return (
                <Select
                  onValueChange={(value) => onChange(value)}
                  {...field}
                  {...fieldProps}
                  triggerLabel={field.label}
                  placeholder={field.placeholder || 'Select an option'}
                  items={field.items}
                />
              );
            }}
          ></Controller>
          {errors[field.id]?.message && (
            <Message type='error'>
              {errors[field.id]?.message as string}
            </Message>
          )}
        </div>
      );

    case 'text':
      return (
        <Input
          {...field}
          {...register(field.id as Path<T>, generateValidation(field))}
          message={{
            text: errors[field.id]?.message as string,
            type: 'error',
          }}
        />
      );
    case 'textarea':
      return (
        <Input
          {...field}
          {...register(field.id as Path<T>, generateValidation(field))}
          type='textarea'
          message={{
            text: errors[field.id]?.message as string,
            type: 'error',
          }}
        />
      );
    case 'email':
      return (
        <Input
          {...field}
          type='email'
          placeholder={field.placeholder || 'name@company.com'}
          {...register(field.id as Path<T>, generateValidation(field))}
          message={{
            text: errors[field.id]?.message as string,
            type: 'error',
          }}
        />
      );
    case 'tel':
      return (
        <Input
          {...field}
          type='tel'
          pattern='^[\+]?[1-9]\d{1,14}$'
          placeholder={field.placeholder || '##########'}
          {...register(field.id as Path<T>, generateValidation(field))}
          message={{
            text: errors[field.id]?.message as string,
            type: 'error',
          }}
        />
      );
    case 'radio': {
      return (
        <RadioFieldWrapper>
          <Label>
            {field.label}{' '}
            {field.helpText && (
              <Tooltip content={field.helpText}>
                <TooltipIcon variant='dark' />
              </Tooltip>
            )}
          </Label>
          <RadioGroup>
            {field.items.map((item) => {
              return (
                <Input
                  key={item.value}
                  id={field.id + '-' + item.label}
                  value={item.value}
                  label={item.label}
                  type='radio'
                  labelSize='small'
                  {...register(field.id as Path<T>, generateValidation(field))}
                />
              );
            })}
            {errors[field.id]?.message && (
              <Message type='error'>
                {errors[field.id]?.message as string}
              </Message>
            )}
          </RadioGroup>
        </RadioFieldWrapper>
      );
    }
    case 'file':
      return (
        <Input
          {...field}
          type='file'
          {...register(field.id as Path<T>, generateValidation(field))}
          message={{
            text: errors[field.id]?.message as string,
            type: 'error',
          }}
        />
      );
  }
  return null;
}

const RadioGroup = styled('div', {
  marginTop: '$xxs',
  display: 'grid',
  gap: '$xxs',
});

const RadioFieldWrapper = styled('div');
