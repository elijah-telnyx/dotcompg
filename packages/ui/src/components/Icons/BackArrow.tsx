import { useId } from 'react';
import { A11ySVG, type A11ySVGProps } from './A11ySVG';

const BackArrow = (props: A11ySVGProps) => {
  const clipPathId = useId();

  return (
    <A11ySVG viewBox='0 0 20 20' {...props}>
      <g clipPath={`url(#${clipPathId})`}>
        <path
          d='M21 9L22 9L22 11L21 11L21 9ZM21 11L9.00002 11L9.00002 9L21 9L21 11Z'
          fill='currentColor'
        />
        <path
          d='M2.78886 9.10557C2.05181 9.4741 2.05181 10.5259 2.78885 10.8944L9.55279 14.2764C10.2177 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 10.2177 5.39116 9.55279 5.72361L2.78886 9.10557Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id={clipPathId}>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </A11ySVG>
  );
};

export default BackArrow;
