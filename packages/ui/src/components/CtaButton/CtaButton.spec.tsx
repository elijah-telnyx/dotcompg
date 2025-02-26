import { render } from '@testing-library/react';

import CtaButton, { CTAButtonProps } from './CtaButton';

const setup = (props: Partial<CTAButtonProps> = {}) => {
  return render(
    <CtaButton
      text='Cta button'
      href='#'
      buttonKind='primary'
      type='button'
      backgroundColor='cream'
      {...props}
    />
  );
};

describe('<CtaButton />', () => {
  it('should render the component', () => {
    const { container } = setup();
    expect(container).toBeInTheDocument();
  });
});
