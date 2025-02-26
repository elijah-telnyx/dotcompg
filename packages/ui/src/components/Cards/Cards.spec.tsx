import { render } from '@testing-library/react';

import Cards from '.';

const defaultProps = {
  items: [
    {
      heading: 'Multi-carrier SIM',
      copy: `Use one SIM card to connect your devices to over 400 LTE, 3G, 2G and LTE-M networks in over 180 countries—including all 4 major incumbents in the U.S.`,
    },
    {
      heading: 'Intelligent network switching',
      copy: `Configure eUICC SIMs to automatically select the best available network, or pin them to a network of your choice.`,
    },
  ],
};

describe('<Cards />', () => {
  it('should render the component', () => {
    const { container } = render(<Cards {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });
});
