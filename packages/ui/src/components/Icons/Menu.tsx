import type { SVGProps } from 'react';
import { keyframes, styled } from '../../styles';

type Props = { title?: string; open?: boolean } & SVGProps<SVGSVGElement>;
const Menu = ({ title, ...props }: Props) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      {title && <title>{title}</title>}

      <rect y='3' width='24' height='8' fill='currentColor' />
      <rect y='13' width='24' height='8' fill='currentColor' />
    </svg>
  );
};

const shift = (size: number) =>
  keyframes({
    '100%': {
      transform: `translateY(${size}px)`,
    },
  });

const ControlledMenu = styled(Menu, {
  display: 'flex',
  alignItems: 'center',
  variants: {
    open: {
      true: {
        'rect:nth-child(1)': {
          animation: `${shift(5)} 0.5s ease-out forwards`,
        },
        'rect:nth-child(2)': {
          animation: `${shift(-5)} 0.5s ease-out forwards`,
        },
      },
    },
  },
});

export default ControlledMenu;
