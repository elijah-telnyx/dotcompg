import { fireEvent, render } from '@testing-library/react';
import { ResizeObserver } from '../../../test/mocks/ResizeObserverMock';
import HeaderContainer from './HeaderContainer';

/**
 * - https://github.com/stitchesjs/stitches/discussions/800
 * - https://github.com/stitchesjs/stitches/issues/1067
 */
describe.skip('<HeaderContainer />', () => {
  beforeAll(() => {
    window.ResizeObserver =
      ResizeObserver as unknown as typeof window.ResizeObserver;
  });

  it('should be position relative on scroll down', async () => {
    const { container } = render(<HeaderContainer>content</HeaderContainer>);

    // scroll down
    await fireEvent.scroll(window, { target: { scrollY: 0 } });
    await fireEvent.scroll(window, { target: { scrollY: 100 } });

    expect(container.firstChild).toHaveStyle('position: relative;');
  });
  it('should be position sticky on scroll up', async () => {
    const { container } = render(<HeaderContainer>content</HeaderContainer>);

    // scroll up
    await fireEvent.scroll(window, { target: { scrollY: 100 } });
    await fireEvent.scroll(window, { target: { scrollY: 0 } });

    expect(container.firstChild).toHaveStyle('position: sticky;');
  });
});
