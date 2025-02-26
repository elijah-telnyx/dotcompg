import { render } from '@testing-library/react';

import ProductHero from '.';

describe('<ProductHero />', () => {
  it('should render the component', () => {
    const { container } = render(
      <ProductHero
        heading='IoT SIM Cards'
        copy='Secure global connectivity for your IoT devices—simplified. Telnyx IoT SIM Cards offer flexible data coverage in 180+ countries and an API to manage and configure SIMs over the air.'
        ctaButtons={[
          {
            type: 'button',
            backgroundColor: 'cream',
            text: 'ORDER A SIM CARD',
            href: '/',
          },
        ]}
        ctaCopy='Questions? [Ask our experts.](https://google.com)'
        media={{
          src: 'https://images.ctfassets.net/2vm221913gep/5Ig6k7ICLq6sPTHKZ2kOEZ/0a095368f1e0ecee5a9341c570b2aec5/Telnyx_Product_IoTSIM_HIW_1.svg',
          alt: 'iot sim card hero',
        }}
        backgroundColor='cream'
        hasOverflow={false}
        spacingBottom='contrasting'
        spacingTop='contrasting'
      />
    );
    expect(container).toBeInTheDocument();
  });
});
