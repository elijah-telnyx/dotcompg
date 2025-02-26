import type { Meta, StoryObj } from '@storybook/react';

import SignUpForm, { type SignUpFormProps } from './SignUpForm';

const mock: SignUpFormProps = {
  signInLink: '#sign-in',
  initialValues: {
    promo_code: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    terms_and_conditions: false,
    subscription_opt_in: false,
    organization_invitation_email: 'lucas@telnyx.com',
    organization_invitation_id: 'asdasdas',
    organization_invitation_confirmation_token: 'dasdasdasd',
    campaign: undefined,
    referrer: '',
    sift_session_id: '',
  },
  termsAndConditionsUrl: 'https://telnyx.com/terms-and-conditions',
  privacyPolicyUrl: 'https://telnyx.com/privacy-policy',
  onEmailBlur: () => {
    console.log('email blur');
  },
  onSubmit: () => {
    console.log('submit');
  },
};

const componentMeta: Meta<SignUpFormProps> = {
  title: 'Form/Sign Up Form',
  component: SignUpForm,
  args: mock,
  argTypes: {
    onSubmit: { action: 'changed' },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type Story = StoryObj<SignUpFormProps>;

export const Default: Story = {
  render: (args) => (
    <div style={{ margin: '0 auto', maxWidth: 650 }}>
      <SignUpForm {...args} />
    </div>
  ),
};

export const WithLoading: Story = {
  args: {
    ...mock,
    loading: true,
  },
};
