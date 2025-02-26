import type { SVGProps } from 'react';
import { styled } from '../../styles';

type Props = { title?: string } & SVGProps<SVGSVGElement>;
const ChevronDown = ({ title, ...props }: Props) => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    {title && <title>{title}</title>}
    <path
      d='M14.6286 19.2206C13.4889 21.293 10.5111 21.293 9.37135 19.2206L3.44517 8.44575C2.34552 6.44639 3.79201 4 6.07382 4L17.9262 4C20.208 4 21.6545 6.4464 20.5548 8.44576L14.6286 19.2206Z'
      fill='currentColor'
    />
  </svg>
);

const ChevronDownStyled = styled(ChevronDown);

export default ChevronDownStyled;
