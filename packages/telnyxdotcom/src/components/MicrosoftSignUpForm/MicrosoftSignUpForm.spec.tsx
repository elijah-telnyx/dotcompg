import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import mockRouter from 'next-router-mock';

import constants from 'constants/env';
import type { MicrosoftSignUpFormProps } from './MicrosoftSignUpForm';

import MicrosoftSignUpForm from '.';

const MICROSOFT_ACTION = `${constants.api.BASE_URL}/users/auth/microsoft_graph`;
const DEFAULT_PROPS: MicrosoftSignUpFormProps = {
  children: 'Sign up with Microsoft',
  sift_session_id: '',
  buttonKind: 'social',
};
const setup = (props: MicrosoftSignUpFormProps = DEFAULT_PROPS, renderComponent = render) => {
  renderComponent(<MicrosoftSignUpForm {...props} />);
  const Form = screen.getByRole('form');
  const SubmitButton = within(Form).getByRole('button', { name: /Sign up with Microsoft/i });

  return {
    Form,
    SubmitButton,
  };
};

describe('SignUpForm component', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl({
      pathname: '/sign-up',
      query: {},
    });
  });

  describe('On load', () => {
    it('Should render the form', () => {
      const { Form, SubmitButton } = setup();
      expect(Form).toBeVisible();
      expect(SubmitButton).toBeVisible();
      expect(SubmitButton).toBeEnabled();

      expect(Form).toHaveFormValues({});
      expect(Form).toHaveAttribute('action', MICROSOFT_ACTION);
      expect(Form).toHaveAttribute('method', 'POST');
      expect(Form).not.toHaveTextContent(/loading/i);
      expect(SubmitButton).toHaveAttribute('type', 'submit');
    });
  });

  describe('On Submit', () => {
    it('Should trigger form action', async () => {
      const { Form } = setup();

      fireEvent.submit(Form);

      await waitFor(() => {
        expect(Form).toHaveTextContent(/loading/i);
      });

      // https://github.com/jsdom/jsdom/issues/2112
      expect(Form).toHaveAttribute('action', MICROSOFT_ACTION);
      expect(Form).toHaveFormValues({});
    });

    it('Should include params', async () => {
      const params = { promo_code: 'WELCOME10', sift_session_id: '1' };
      const { Form } = setup({ ...DEFAULT_PROPS, ...params });

      /**
       * hidden are not accessible roles.
       * If we wanted to select hidden inputs we'd need to add `aria-label="Promo Code"` to inputs and
       * select them with `const PromoCodeInput = within(Form).getByLabelText('Promo Code');`
       **/
      fireEvent.submit(Form);

      await waitFor(() => {
        expect(Form).toHaveTextContent(/loading/i);
      });

      // https://github.com/jsdom/jsdom/issues/2112
      expect(Form).toHaveAttribute('action', MICROSOFT_ACTION);
      expect(Form).toHaveFormValues(params);
    });
  });
});
