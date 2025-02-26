import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResizeObserver } from '../../../test/mocks/ResizeObserverMock';

import HeaderDropdown from '.';

const user = userEvent.setup();

const DEFAULT_PROPS = {
  label: 'Label',
  items: [
    { label: 'Item 1', href: '#1', id: '#1' },
    { label: 'Item 2', href: '#2', id: '#2' },
    { label: 'Item 3', href: '#3', id: '#3' },
  ],
};

// ci timing out on synthetic events propagaton - user event
describe.skip('<HeaderDropdown />', () => {
  beforeAll(() => {
    window.ResizeObserver =
      ResizeObserver as unknown as typeof window.ResizeObserver;
  });

  it('should open on click', async () => {
    render(
      <HeaderDropdown
        label='Label'
        items={[{ label: 'Item', href: '#', id: '1' }]}
      />
    );
    const button = await screen.findByRole('button');
    await user.click(button);

    const menu = await screen.findByRole('menu');
    expect(menu).toBeInTheDocument();
  });
  describe('a11y', () => {
    describe('Trigger', () => {
      it('should be focusable', async () => {
        render(
          <HeaderDropdown
            label='Label'
            items={[{ label: 'Item', href: '#', id: '1' }]}
          />
        );
        await user.tab();
        const button = await screen.findByRole('button');
        expect(button).toHaveFocus();
      });
      describe('should open the dropdown with space, enter or arrow down when focused', () => {
        test.each([' ', 'Enter', 'ArrowDown'])('%s', async (key) => {
          render(<HeaderDropdown {...DEFAULT_PROPS} />);
          const button = await screen.findByRole('button');

          await user.tab();
          await user.type(button, `{${key}}`);
          const menu = await screen.findByRole('menu');
          expect(menu).toBeInTheDocument();
        });
      });
    });
    describe('Menu', () => {
      it('should have the first item focused when opened', async () => {
        render(<HeaderDropdown {...DEFAULT_PROPS} />);
        const button = await screen.findByRole('button');
        await user.click(button);
        await user.keyboard('{ArrowDown}');

        const menuItems = await screen.findAllByRole('menuitem');
        expect(menuItems[0]).toBe(document.activeElement);
      });
      it('should navigate using the up arrow and down arrow keys', async () => {
        render(<HeaderDropdown {...DEFAULT_PROPS} />);
        await user.tab();
        await user.keyboard('{ArrowDown}');

        const menuItems = await screen.findAllByRole('menuitem');
        expect(menuItems[0]).toBe(document.activeElement);

        await user.keyboard('{ArrowDown}');
        expect(document.activeElement).toBe(menuItems[1]);

        await user.keyboard('{ArrowUp}');
        expect(menuItems[0]).toBe(document.activeElement);
      });
      it('should close with ESC', async () => {
        render(<HeaderDropdown {...DEFAULT_PROPS} />);
        await user.tab();
        await user.keyboard('{ArrowDown}');

        const menu = await screen.findByRole('menu');
        expect(menu).toBeInTheDocument();

        await user.keyboard('{Escape}');
        expect(menu).not.toBeInTheDocument();
      });
    });
  });
});
