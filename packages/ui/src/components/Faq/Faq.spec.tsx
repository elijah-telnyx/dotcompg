import { render } from '@testing-library/react';

import Faq, { type FaqProps } from '.';

const setup = (props: Partial<FaqProps> = {}) => {
  return render(
    <Faq
      tagline='Faq'
      questions={[
        {
          id: String(Math.random()),
          question: 'What is an IoT SIM card?',
          answer:
            'An IoT SIM card is a small card that can be inserted into any compatible device to give it internet connectivity. IoT SIM cards are often used in IoT sensors and devices, as well as in vehicle tracking, point-of-sale terminals, and retail IoT displays.',
        },
        {
          id: String(Math.random()),
          question: 'What is cellular IoT?',
          answer: `The Internet of Things (IoT) refers to the [billions of devices that are connected to the internet, collecting and sharing data](https://www.zdnet.com/article/what-is-the-internet-of-things-everything-you-need-to-know-about-the-iot-right-now/). Cellular IoT simply connects IoT devices using cellular (or mobile) networks. Learn more about IoT connectivity best practices [here](https://telnyx.com/resources/iot-connectivity-guide).`,
        },
        {
          id: String(Math.random()),
          question: 'How much do Telnyx cellular IoT SIM cards cost?',
          answer: `Telnyx charges $1 per SIM card (plus shipping) and then $2 per active SIM per month. You can find more detailed information about Wireless pricing, including data charges [here](https://telnyx.com/pricing/wireless-pricing), or to find out more about discounts for bulk orders, please [get in touch](https://telnyx.com/contact-us).`,
        },
      ]}
      backgroundColor='cream'
      spacingTop='continuous'
      spacingBottom='continuous'
      hasOverflow={false}
      {...props}
    />
  );
};

describe('<Faq />', () => {
  it('should render the component', () => {
    const { container } = setup();
    expect(container).toBeInTheDocument();
  });
});
