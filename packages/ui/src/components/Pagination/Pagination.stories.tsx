import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { useArgs } from '@storybook/client-api';
import type { Meta, StoryObj } from '@storybook/react';

import Pagination, {
  type PaginationRootProps,
  type PaginationPageCounterProps,
} from './Pagination';
import { useDark } from '../../utils/storybook';

// just to be able to use [], so the story can show code that can be just copy/paste
const keys = {
  prev: 'prev',
  counter: 'counter',
  next: 'next',
};

const setup = (element: HTMLElement) => {
  const canvas = within(element);
  return {
    ...canvas,
    getPreviousButton: () =>
      canvas.queryByRole('button', {
        name: 'Go to previous page',
      }) as HTMLElement,
    getNextButton: () =>
      canvas.queryByRole('button', { name: 'Go to next page' }) as HTMLElement,
    getCurrentPage: (page: number) =>
      canvas.getByLabelText(`Current Page, Page ${page}`),
    getTotalPages: (totalPages: number) =>
      canvas.getByLabelText(`Total pages, ${totalPages}`),
  };
};

const componentMeta: Meta<PaginationRootProps & PaginationPageCounterProps> = {
  title: 'Components/Pagination',
  component: Pagination.Root,
  args: {
    dark: false,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
};

export default componentMeta;

export const FirstPage: StoryObj<
  PaginationRootProps & PaginationPageCounterProps
> = {
  decorators: [
    (Story) => {
      const [{ dark, currentPage, totalPages }] = useArgs();

      useDark({ dark });
      return Story({
        args: {
          dark,
          children: [
            <Pagination.PreviousButton disabled key={keys.prev} dark={dark} />,
            <Pagination.PageCounter
              currentPage={currentPage}
              totalPages={totalPages}
              key={keys.counter}
            />,
            <Pagination.NextButton key={keys.next} dark={dark} />,
          ],
        },
      });
    },
  ],
  args: {
    currentPage: 1,
    totalPages: 10,
  },
  play: async ({ canvasElement }) => {
    const { getPreviousButton, getNextButton, getCurrentPage, getTotalPages } =
      setup(canvasElement);
    await expect(getPreviousButton()).toHaveAttribute('aria-disabled', 'true');
    await expect(getNextButton()).toBeInTheDocument();
    await expect(getCurrentPage(1)).toBeInTheDocument();
    await expect(getTotalPages(10)).toBeInTheDocument();
  },
};

export const LastPage: StoryObj<
  PaginationRootProps & PaginationPageCounterProps
> = {
  decorators: [
    (Story) => {
      const [{ dark, currentPage, totalPages }] = useArgs();
      useDark({ dark });
      return Story({
        args: {
          dark,
          children: [
            <Pagination.PreviousButton key={keys.prev} dark={dark} />,
            <Pagination.PageCounter
              currentPage={currentPage}
              totalPages={totalPages}
              key={keys.counter}
            />,
            <Pagination.NextButton key={keys.next} dark={dark} disabled />,
          ],
        },
      });
    },
  ],
  args: {
    currentPage: 10,
    totalPages: 10,
  },
  play: async ({ canvasElement }) => {
    const { getPreviousButton, getNextButton, getCurrentPage, getTotalPages } =
      setup(canvasElement);
    await expect(getNextButton()).toHaveAttribute('aria-disabled', 'true');
    await expect(getPreviousButton()).toBeInTheDocument();
    await expect(getCurrentPage(10)).toBeInTheDocument();
    await expect(getTotalPages(10)).toBeInTheDocument();
  },
};

export const Navigation: StoryObj<
  PaginationRootProps & PaginationPageCounterProps
> = {
  decorators: [
    (Story) => {
      const [args, setArgs] = useArgs();
      const { dark, currentPage, totalPages } = args;

      const setCurrentPage = (page: number) => {
        setArgs({ ...args, currentPage: page });
      };
      useDark({ dark });

      const isFirstPage = currentPage === 1;
      const isLastPage = currentPage === totalPages;
      const goToPreviousPage = () => {
        if (!isFirstPage) {
          setCurrentPage(currentPage - 1);
        }
      };

      const goToNextPage = () => {
        if (!isLastPage) {
          setCurrentPage(currentPage + 1);
        }
      };
      return Story({
        args: {
          ...args,
          children: [
            <Pagination.PreviousButton
              disabled={isFirstPage}
              onClick={goToPreviousPage}
              key={keys.prev}
              dark={dark}
            />,

            <Pagination.PageCounter
              currentPage={currentPage}
              totalPages={totalPages}
              key={keys.counter}
            />,

            <Pagination.NextButton
              disabled={isLastPage}
              onClick={goToNextPage}
              key={keys.next}
              dark={dark}
            />,
          ],
        },
      });
    },
  ],
  args: {
    dark: false,
    currentPage: 3,
    totalPages: 3,
  },
  play: async ({ canvasElement }) => {
    const { getNextButton, getPreviousButton, getCurrentPage } =
      setup(canvasElement);
    await userEvent.click(getPreviousButton());
    await waitFor(async () => {
      await expect(getCurrentPage(2)).toBeInTheDocument();
    });
    await userEvent.click(getPreviousButton());

    await waitFor(async () => {
      await expect(getCurrentPage(1)).toBeInTheDocument();
      await expect(getPreviousButton()).toHaveAttribute(
        'aria-disabled',
        'true'
      );
      await expect(getNextButton()).not.toHaveAttribute(
        'aria-disabled',
        'true'
      );
    });

    await userEvent.click(getNextButton());
    await waitFor(async () => {
      await expect(getCurrentPage(2)).toBeInTheDocument();
      await expect(getNextButton()).not.toHaveAttribute(
        'aria-disabled',
        'true'
      );
      await expect(getPreviousButton()).not.toHaveAttribute(
        'aria-disabled',
        'true'
      );
    });
    await userEvent.click(getNextButton());
    await waitFor(async () => {
      await expect(getCurrentPage(3)).toBeInTheDocument();
      await expect(getNextButton()).toHaveAttribute('aria-disabled', 'true');
      await expect(getPreviousButton()).not.toHaveAttribute(
        'aria-disabled',
        'true'
      );
    });
  },
};
