import { render } from '@testing-library/react';

import Media, { type MediaProps, MediaSVG } from './Media';
import { generateSrcSet } from './utils';

const setup = (props: Partial<MediaProps<'media'>> = {}) => {
  return render(<Media src='' alt='' {...props} />);
};

const setupSVG = (props: Partial<MediaProps<'svg'>> = {}) => {
  return render(<MediaSVG src='' alt='' {...props} />);
};

describe('<Media />', () => {
  it('should render the component', () => {
    const { container } = setup();
    expect(container).toBeInTheDocument();
  });
});

describe('<MediaSVG />', () => {
  it('should render the component', () => {
    const { container } = setupSVG();
    expect(container).toBeInTheDocument();
  });
});

describe('Generate image srcSet', () => {
  const input = {
    src: '//images.ctfassets.net/2vm221913gep/IY2ieeVf3dsEVQjoduuES/7707a41dfe9f1c76f9434817afec9935/Account_notifications.png',
    params: { w: 2240, h: 924 },
  };
  it('generateSrcSet should generate different images based on breakpoints', () => {
    const output = generateSrcSet(input);

    // template string with indentation spaces and line breaks to be readable
    const expected = `${input.src}?w=624&h=924 624w,\
      ${input.src}?w=944&h=924 944w,\
      ${input.src}?w=1032&h=924 1032w,\
      ${input.src}?w=1120&h=924 1120w,\
      ${input.src}?w=${input.params.w}&h=924 ${input.params.w}w`;

    // remove indentation spaces from expectedSrcSet
    expect(output).toBe(expected.replace(/\s{6}/g, ' '));
  });
});

describe('Set image sizes', () => {
  it('sizes should be 50vw to pick correct image for viewport', () => {
    const { getByRole } = setup({
      src: '//images.ctfassets.net/2vm221913gep/IY2ieeVf3dsEVQjoduuES/7707a41dfe9f1c76f9434817afec9935/Account_notifications.png',
      width: 2240,
      height: 924,
    });

    const image = getByRole('img');

    expect(image).toHaveAttribute(
      'sizes',
      '@media (max-width: 430px) 624px, 50vw'
    );
  });
});
