import type { Meta, StoryObj } from '@storybook/react';

import type { MediaProps } from '../Media';
import SignUpForm from '../SignUpForm';
import type { SignUpFormValues } from '../SignUpForm';
import FormSection, { type FormSectionProps } from './FormSection';

const mediaMock: MediaProps<'img'> = {
  src: 'https://images.ctfassets.net/2vm221913gep/1RBkXVLKJeRucChx7WjCZX/2fd36da90aaaeb8d8a9be31344754a52/Form_LogoCrop_Background.svg',
  alt: 'telnyx colorful logo',
};

const mock: FormSectionProps = {
  heading: 'Create a Telnyx account',
  copy: 'Sign up for a free Mission Control Portal account to access all Telnyx products.',
  media: mediaMock,
  footerCopy: `This site is protected by reCAPTCHA and the [Google Privacy Policy](https://policies.google.com/privacy) and [Terms of Service apply](https://policies.google.com/terms).`,
  backgroundColor: 'black',
};

const signupMock = {
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
    campaign: {},
    referrer: '',
    sift_session_id: '',
  },
};

const componentMeta: Meta<FormSectionProps> = {
  title: 'Layout/Form Section',
  component: FormSection,
  args: mock,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'black',
    },
  },
};

export default componentMeta;

type Story = StoryObj<FormSectionProps>;

export const Default: Story = {
  render: (args) => (
    <FormSection {...args}>
      <SignUpForm
        initialValues={signupMock.initialValues}
        signInLink={signupMock.signInLink}
        onEmailBlur={(value) => {
          console.log('triggered email validation', value);
        }}
        onSubmit={(values: SignUpFormValues | undefined) =>
          console.log('send to API', values)
        }
        termsAndConditionsUrl='/terms-and-conditions-of-service'
        privacyPolicyUrl='/privacy-policy'
      />
    </FormSection>
  ),
};

export const WithLoading: Story = {
  render: (args) => (
    <FormSection {...args} loading>
      <SignUpForm
        initialValues={signupMock.initialValues}
        signInLink={signupMock.signInLink}
        loading={true}
        onEmailBlur={(value) => {
          console.log('triggered email validation', value);
        }}
        onSubmit={(values: SignUpFormValues | undefined) =>
          console.log('send to API', values)
        }
        termsAndConditionsUrl='/terms-and-conditions-of-service'
        privacyPolicyUrl='/privacy-policy'
      />
    </FormSection>
  ),
};
