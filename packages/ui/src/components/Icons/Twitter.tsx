import type { SVGProps } from 'react';
import { A11ySVG } from './A11ySVG';

type Props = { title?: string } & SVGProps<SVGSVGElement>;
const Twitter = (props: Props) => (
  <A11ySVG
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    {...props}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M4 0C1.79086 0 0 1.79086 0 4V20C0 22.2091 1.79086 24 4 24H20C22.2091 24 24 22.2091 24 20V4C24 1.79086 22.2091 0 20 0H4ZM19.4785 4L13.5222 10.7749H13.5218L20 20H15.2356L10.8732 13.7878L5.41155 20H4L10.2466 12.8955L4 4H8.76437L12.8952 9.88256L18.0671 4H19.4785ZM10.956 12.0881L11.5889 12.9738V12.9742L15.8997 19.0075H18.0677L12.7851 11.6137L12.1522 10.728L8.0882 5.03974H5.92015L10.956 12.0881Z'
      fill='currentColor'
    />
  </A11ySVG>
);
export default Twitter;
