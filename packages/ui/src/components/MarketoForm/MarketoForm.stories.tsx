import type { Meta, StoryObj } from '@storybook/react';
import MarketoForm, { type MarketoFormProps } from './MarketoForm';
import type { MarketoNativeForm } from './';
import { generateURLWithSearchParams } from '../../utils/route/generateURLWithSearchParams';

const componentMeta: Meta<MarketoFormProps> = {
  title: 'Components/MarketoForm',
  component: MarketoForm,
  args: {
    copy: `** * Always your @telnyx.com email for testing forms.**`,
  },
};

export default componentMeta;

const redirect = (form: MarketoNativeForm, formid: number) => {
  const isUSA = form?.getValues().Phone_Number_Extension__c === '+1';

  if (isUSA) {
    const { Email = '' } = form.getValues();

    const parsedURL = generateURLWithSearchParams({
      url: 'https://telnyx.com/thank-you-plus-one',
      params: { formid, email: Email },
    });

    window.location.assign(parsedURL);
  }
};

type Story = StoryObj<MarketoFormProps>;

export const Default: Story = {
  args: {
    formId: 1989,
  },
};

export const DarkBackground: Story = {
  args: {
    formId: 1989,
  },
};

export const WithRedirect: Story = {
  args: {
    formId: 1987,
    copy: `This is to represent how the redirects works with Marketo Forms.

Select USA or Canada and submit the form. You will be redirected to the
"/thank-you-plus-one" page. But if you select any other country, you will not be
redirected.

Even if you select the "Support" option, you will not be redirected. Since our
function is overriding the default Marketo behavior.

** * Always your @telnyx.com email for testing forms.**`,
    onSuccessRedirectsTo: redirect,
  },
};

export const WithContenfulRedirect: Story = {
  args: {
    formId: 1987,
    onSuccessRedirectsTo: 'https://telnyx.com/thank-you-testing-page',
    copy: `** * Always your @telnyx.com email for testing forms.**`,
  },
};

export const ContactUs: StoryObj<MarketoFormProps> = {
  args: {
    formId: 1987,
    onLoad: () => {
      const fillForm = () => {
        [
          {
            id: 'Reason_for_Contact__c',
            value: 'Support',
          },
          {
            id: 'FirstName',
            value: 'Testing',
          },
          {
            id: 'LastName',
            value: 'Marketo',
          },
          {
            id: 'Company',
            value: 'Telnyx',
          },
          {
            id: 'Email',
            value: 'dotcom.squad@telnyx.company',
          },
          {
            id: 'Phone_Number_Extension__c',
            value: '+1',
          },
          {
            id: 'Phone_Number_Base__c',
            value: '(212) 555-1212',
          },
          {
            id: 'Website',
            value: 'https://telnyx.com',
          },
          {
            id: 'Form_Additional_Information__c',
            value: 'testing',
          },
          {
            id: 'How_did_you_hear_about_Telnyx_Open__c',
            value: 'work',
          },
        ].forEach((field) => {
          const element: HTMLInputElement | undefined = document.getElementById(
            field.id
          ) as HTMLInputElement;
          if (element) element.value = field.value;
        });
      };

      fillForm();
    },
  },
};
