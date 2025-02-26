import { jest } from '@storybook/jest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUpForm, { type SignUpFormValues } from './SignUpForm';

const user = userEvent.setup();

const props = {
  initialValues: {
    organization_invitation_email: '',
    organization_invitation_id: '',
    organization_invitation_confirmation_token: '',
    campaign: {},
    referrer: '',
    sift_session_id: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    terms_and_conditions: false,
    promo_code: '',
    subscription_opt_in: false,
  },
  signInLink: '',
  loading: false,
  apiMessage: { message: '', success: false, reasons: {} },
  termsAndConditionsUrl: '/terms-and-conditions-of-service',
  privacyPolicyUrl: '/privacy-policy',
  onEmailBlur: () => {
    //
  },
  onSubmit: (values: SignUpFormValues) => {
    console.log(values);
  },
};

jest.spyOn(props, 'onEmailBlur').mockImplementation(jest.fn());

describe('SignUpForm', () => {
  it('should render SignUpForm with valid fields', () => {
    render(<SignUpForm {...props} />);
    const email = screen.getByRole('textbox', { name: /Company email/i });
    const first_name = screen.getByRole('textbox', { name: /First name/i });
    const last_name = screen.getByRole('textbox', { name: /Last name/i });
    const password = screen.getByLabelText(/^Password$/i);
    const terms_and_conditions = screen.getByLabelText(/Terms & Conditions/i);

    const privacy_policy = screen.getByText(/Privacy Polic./i);

    const subscription_opt_in = screen.getByText(
      /I want to receive marketing emails from Telnyx./i
    );

    const promo_code = screen.queryByRole('textbox', {
      name: /Promo code/i,
      hidden: false,
    });

    const signUpButton = screen.getByRole('button', { name: /SIGN UP/i });

    expect(email).toBeInTheDocument();
    expect(first_name).toBeInTheDocument();
    expect(last_name).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(terms_and_conditions).toBeInTheDocument();
    expect(privacy_policy).toBeInTheDocument();
    expect(subscription_opt_in).toBeInTheDocument();
    expect(promo_code).not.toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
    expect(email).toBeValid();
    expect(first_name).toBeValid();
    expect(last_name).toBeValid();
    expect(password).toBeValid();
    expect(terms_and_conditions).toBeValid();
  });

  it('should render SignUpForm without invitation fields', () => {
    render(<SignUpForm {...props} />);
    const organization_invitation_id = screen.queryByRole('textbox', {
      name: /organization_invitation_id/i,
    });

    const organization_invitation_confirmation_token = screen.queryByRole(
      'textbox',
      { name: /organization_invitation_confirmation_token/i }
    );

    expect(organization_invitation_id).not.toBeInTheDocument();
    expect(organization_invitation_confirmation_token).not.toBeInTheDocument();
  });

  it('should render SignUpForm with invitation fields', () => {
    render(
      <SignUpForm
        {...props}
        initialValues={{
          ...props.initialValues,
          organization_invitation_id: '12345',
          organization_invitation_confirmation_token: 'xpto_123',
        }}
      />
    );
    const Form = screen.getByRole('form');

    const organization_invitation_id = screen.getByDisplayValue('12345');
    const organization_invitation_confirmation_token =
      screen.getByDisplayValue('xpto_123');

    expect(organization_invitation_id).toBeInTheDocument();
    expect(organization_invitation_confirmation_token).toBeInTheDocument();
    expect(Form).toHaveFormValues({
      organization_invitation_id: '12345',
      organization_invitation_confirmation_token: 'xpto_123',
    });
  });

  it('should render email input in read only mode if it contains invitation email field', () => {
    render(
      <SignUpForm
        {...props}
        initialValues={{
          ...props.initialValues,
          organization_invitation_email: 'user@telnyx.com',
        }}
      />
    );

    const email = screen.getByRole('textbox', {
      name: /Company email/i,
    }) as HTMLInputElement;
    expect(email).toBeInTheDocument();
    expect(email.readOnly).toBeTruthy();
  });

  it('should render promo_code input if it contains promo_code value', () => {
    render(
      <SignUpForm
        {...props}
        initialValues={{
          ...props.initialValues,
          promo_code: 'PROMO10',
        }}
      />
    );

    const promo_code = screen.queryByRole('textbox', {
      name: /Promo code/i,
      hidden: false,
    });
    expect(promo_code).toBeInTheDocument();
  });

  it('should fill inputs and send submit event', async () => {
    const handleSubmit = jest.fn();
    render(<SignUpForm {...props} onSubmit={handleSubmit} />);

    const email = screen.getByRole('textbox', { name: /Company email/i });
    const first_name = screen.getByRole('textbox', { name: /First name/i });
    const last_name = screen.getByRole('textbox', { name: /Last name/i });

    const terms_and_conditions = screen.getByLabelText(/Terms & Conditions/i);
    const subscription_opt_in = screen.getByLabelText(
      /I want to receive marketing emails from Telnyx/i
    );
    const password = screen.getByLabelText(/^Password$/i);

    const signUpButton = screen.getByRole('button', { name: /SIGN UP/i });
    await act(async () => {
      await user.type(email, 'user-test@telnyx.com');
      await user.type(first_name, 'Test');
      await user.type(last_name, 'Name');
      await user.type(password, 'Asd123@#23$dSDFF422');
      await user.click(terms_and_conditions);
      await user.click(subscription_opt_in);
      await user.click(signUpButton);
    });

    expect(email).toHaveValue('user-test@telnyx.com');
    expect(first_name).toHaveValue('Test');
    expect(last_name).toHaveValue('Name');
    expect(password).toHaveValue('Asd123@#23$dSDFF422');
    expect(terms_and_conditions).toBeChecked();
    expect(subscription_opt_in).toBeChecked();
    expect(email).toBeValid();
    expect(first_name).toBeValid();
    expect(last_name).toBeValid();
    expect(password).toBeValid();
    expect(terms_and_conditions).toBeValid();

    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'user-test@telnyx.com',
      first_name: 'Test',
      last_name: 'Name',
      password: 'Asd123@#23$dSDFF422',
      terms_and_conditions: true,
      subscription_opt_in: true,
      organization_invitation_confirmation_token: '',
      organization_invitation_email: '',
      organization_invitation_id: '',
      promo_code: '',
    });
  });

  it('should fill the inputs and send submit event with invitation and promo fields', async () => {
    const handleSubmit = jest.fn();
    render(
      <SignUpForm
        {...props}
        initialValues={{
          ...props.initialValues,
          organization_invitation_email: 'user-test@telnyx.com',
          organization_invitation_id: '12345',
          organization_invitation_confirmation_token: 'xpto_123',
          promo_code: 'PROMO10',
        }}
        onSubmit={handleSubmit}
      />
    );

    const email = screen.getByRole('textbox', {
      name: /Company email/i,
    }) as HTMLInputElement;
    const first_name = screen.getByRole('textbox', { name: /First name/i });
    const last_name = screen.getByRole('textbox', { name: /Last name/i });

    const terms_and_conditions = screen.getByLabelText(/Terms & Conditions/i);
    const subscription_opt_in = screen.getByLabelText(
      /I want to receive marketing emails from Telnyx/i
    );
    const password = screen.getByLabelText(/^Password$/i);

    const signUpButton = screen.getByRole('button', { name: /SIGN UP/i });
    await act(async () => {
      await user.type(first_name, 'Test');
      await user.type(last_name, 'Name');
      await user.type(password, 'Asd123@#23$dSDFF422');
      await user.click(terms_and_conditions);
      await user.click(subscription_opt_in);
      await user.click(signUpButton);
    });

    expect(email.value).toEqual('user-test@telnyx.com');
    expect(first_name).toHaveValue('Test');
    expect(last_name).toHaveValue('Name');
    expect(password).toHaveValue('Asd123@#23$dSDFF422');
    expect(terms_and_conditions).toBeChecked();
    expect(subscription_opt_in).toBeChecked();

    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'user-test@telnyx.com',
      first_name: 'Test',
      last_name: 'Name',
      password: 'Asd123@#23$dSDFF422',
      terms_and_conditions: true,
      subscription_opt_in: true,
      organization_invitation_id: '12345',
      organization_invitation_confirmation_token: 'xpto_123',
      promo_code: 'PROMO10',
      organization_invitation_email: 'user-test@telnyx.com',
    });
  });

  it('should fill the email input and not call email validate callback on blur if input value is the same', async () => {
    render(
      <SignUpForm
        {...props}
        initialValues={{
          ...props.initialValues,
          organization_invitation_email: 'user@telnyx.com',
        }}
      />
    );

    const email = screen.getByRole('textbox', { name: /Company email/i });

    await act(async () => {
      email.focus();
      await user.type(email, 'user-test@telnyx.com');
      email.blur();
      await expect(props.onEmailBlur).toHaveBeenCalledWith(
        'user-test@telnyx.com'
      );
      await email.focus();
      await email.blur();
      await expect(props.onEmailBlur).toHaveBeenCalledTimes(1);
    });
  });

  it('should show password hint', async () => {
    const handleSubmit = jest.fn();
    render(<SignUpForm {...props} onSubmit={handleSubmit} />);

    const password = screen.getByLabelText(/^Password$/i);
    expect(password).toBeValid();
    expect(password).toHaveAccessibleDescription(/Password must/i);
    expect(password).toHaveAccessibleDescription(
      /be at least 12 characters long/i
    );
    expect(password).toHaveAccessibleDescription(
      /contain at least one number/i
    );
    expect(password).toHaveAccessibleDescription(/one symbol/i);
    expect(password).toHaveAccessibleDescription(/one upper-case letter/i);
  });

  it('should show password error list when password is not provided', async () => {
    const handleSubmit = jest.fn();
    render(
      <SignUpForm
        {...props}
        initialValues={{
          ...props.initialValues,
          organization_invitation_email: 'user-test@telnyx.com',
          organization_invitation_id: '12345',
          organization_invitation_confirmation_token: 'xpto_123',
          promo_code: 'PROMO10',
        }}
        onSubmit={handleSubmit}
      />
    );
    const signUpButton = screen.getByRole('button', { name: /SIGN UP/i });
    const password = screen.getByLabelText(/^Password$/i);
    await act(async () => {
      await user.click(signUpButton);
    });
    expect(password).toBeInvalid();
    expect(password).toHaveAccessibleErrorMessage(/Password must/i);
    expect(
      screen.getByText(/Password must be at least 12 characters/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Password must contain at least one number/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Password must contain at least one symbol/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Password must contain at least one upper-case letter/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Password must contain at least one lower-case letter/i)
    ).toBeInTheDocument();
  });

  it('should show required field errors when not provided', async () => {
    const handleSubmit = jest.fn();
    render(<SignUpForm {...props} onSubmit={handleSubmit} />);
    const email = screen.getByRole('textbox', { name: /Company email/i });
    const first_name = screen.getByRole('textbox', { name: /First name/i });
    const last_name = screen.getByRole('textbox', { name: /Last name/i });
    const password = screen.getByLabelText(/^Password$/i);
    const terms_and_conditions = screen.getByLabelText(/Terms & Conditions/i);
    const signUpButton = screen.getByRole('button', { name: /SIGN UP/i });
    await act(async () => {
      await user.click(signUpButton);
    });

    expect(email).toBeInvalid();
    expect(email).toHaveAccessibleErrorMessage(/required/i);
    expect(first_name).toBeInvalid();
    expect(first_name).toHaveAccessibleErrorMessage(/required/i);
    expect(last_name).toBeInvalid();
    expect(last_name).toHaveAccessibleErrorMessage(/required/i);
    expect(terms_and_conditions).toBeInvalid();
    expect(terms_and_conditions).toHaveAccessibleErrorMessage(
      /please accept the terms and conditions/i
    );
    expect(password).toBeInvalid();
    expect(password).toHaveAccessibleErrorMessage(/Password must/i);
  });
});
