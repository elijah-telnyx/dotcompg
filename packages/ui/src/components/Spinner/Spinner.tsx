import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import * as css from './Spinner.styled';

export interface SpinnerProps {
  size?: 'xs' | 'small' | 'medium' | 'big';
  background?: 'dark' | 'light';
  title?: string;
  outline?: boolean;
}

const Spinner = ({
  size = 'small',
  background = 'light',
  title = 'Loading...',
  outline = false,
}: SpinnerProps) => {
  return (
    <css.Spinner
      size={size}
      background={background}
      strokeWidth={outline ? '2' : '4'}
    >
      <VisuallyHidden.Root>{title}</VisuallyHidden.Root>
    </css.Spinner>
  );
};

export default Spinner;
