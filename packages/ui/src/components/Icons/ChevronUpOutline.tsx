import type { SVGProps } from 'react';
import { A11ySVG } from './A11ySVG';

type Props = { title?: string } & SVGProps<SVGSVGElement>;
const ChevronUpOutlineIcon = ({ title, ...props }: Props) => (
  <A11ySVG
    viewBox='0 0 10 6'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    {title && <title>{title}</title>}
    <path
      d='M1 4.99995L5 1L9 4.99995'
      stroke='currentColor'
      strokeLinecap='square'
    />
  </A11ySVG>
);

export default ChevronUpOutlineIcon;
