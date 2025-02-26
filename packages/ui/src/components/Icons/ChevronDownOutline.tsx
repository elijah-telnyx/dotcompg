import type { SVGProps } from 'react';
import { A11ySVG } from './A11ySVG';

type Props = { title?: string } & SVGProps<SVGSVGElement>;
const ChevronDownOutlineIcon = ({ title, ...props }: Props) => (
  <A11ySVG
    viewBox='0 0 10 6'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    {title && <title>{title}</title>}
    <path
      d='M9 1.00005L5 5L1 1.00005'
      stroke='currentColor'
      strokeLinecap='square'
    />
  </A11ySVG>
);

export default ChevronDownOutlineIcon;
