import { render } from '@testing-library/react';

import About from '.';

const defaultProps = {
  tag: 'ABOUT',
  heading: 'Bring smart devices online, from anywhere',
  copy: 'As the name implies, Internet of Things (IoT) systems hinge on safe, stable internet connections. As such, IoT businesses are shifting device connectivity away from old-age WiFi and ethernet connections in favor of cellular data via IoT SIM cards.',
  media: {
    src: 'https://images.ctfassets.net/2vm221913gep/6F1aKkQRDYBWoqZafnLxg7/66f53b0cb029cd9bb0f2b5089ec9e21f/Product_Detail_Hero_Wireless_IoT-SIM-Card__9_.png',
    alt: 'sim card',
  },
};

describe('<About />', () => {
  it('should render the component', () => {
    const { container } = render(
      <About
        backgroundColor='cream'
        hasOverflow={false}
        spacingBottom='contrasting'
        spacingTop='contrasting'
        {...defaultProps}
      />
    );
    expect(container).toBeInTheDocument();
  });

  it('should render the component with correct text', () => {
    const { getByText } = render(
      <About
        backgroundColor='cream'
        hasOverflow={false}
        spacingBottom='contrasting'
        spacingTop='contrasting'
        {...defaultProps}
      />
    );
    expect(getByText(defaultProps.heading)).toBeInTheDocument();
    expect(getByText(defaultProps.copy)).toBeInTheDocument();
  });
});
