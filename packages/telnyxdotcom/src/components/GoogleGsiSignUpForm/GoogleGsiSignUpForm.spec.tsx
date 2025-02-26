import { render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';

import type { GoogleGsiSignUpFormProps } from './GoogleGsiSignUpForm';
import GoogleGsiSignUpForm from '.';

const DEFAULT_PROPS: GoogleGsiSignUpFormProps = {
  sift_session_id: '1',
};
const setup = (props: GoogleGsiSignUpFormProps = DEFAULT_PROPS, renderComponent = render) => {
  renderComponent(<GoogleGsiSignUpForm {...props} />);
  const Loading = screen.getByRole('img', { name: /Loading/i });

  return {
    Loading,
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
    it('Should render the form', async () => {
      const { Loading } = setup();

      expect(Loading).toBeVisible();
    });
  });
});
