import { useId } from 'react';
import { A11ySVG, type A11ySVGProps } from './A11ySVG';

const ArrowDown = (props: A11ySVGProps) => {
  const clipPathId = useId();

  return (
    <A11ySVG width='20' height='20' viewBox='0 0 20 20' {...props}>
      <g clipPath={`url(#${clipPathId})`}>
        <path
          d='M11 0L11 -1L9 -1L9 0L11 0ZM9 0L9 12L11 12L11 0L9 0Z'
          fill='currentColor'
        ></path>
        <path
          d='M10.8944 18.2111C10.5259 18.9482 9.4741 18.9482 9.10557 18.2111L5.72361 11.4472C5.39116 10.7823 5.87465 10 6.61804 10L13.382 10C14.1253 10 14.6088 10.7823 14.2764 11.4472L10.8944 18.2111Z'
          fill='currentColor'
        ></path>
      </g>
      <defs>
        <clipPath id={clipPathId}>
          <rect width='20' height='20' fill='white'></rect>
        </clipPath>
      </defs>
    </A11ySVG>
  );
};

export default ArrowDown;
