import { useId } from 'react';
import { A11ySVG, type A11ySVGProps } from './A11ySVG';

const ArrowUp = (props: A11ySVGProps) => {
  const clipPathId = useId();

  return (
    <A11ySVG width='20' height='20' viewBox='0 0 20 20' {...props}>
      <g clipPath={`url(#${clipPathId})`}>
        <path
          d='M9 19L9 20L11 20L11 19L9 19ZM11 19L11 7.00002L9 7.00002L9 19L11 19Z'
          fill='currentColor'
        />
        <path
          d='M9.10557 0.788857C9.4741 0.0518079 10.5259 0.0518057 10.8944 0.788854L14.2764 7.55278C14.6088 8.21769 14.1253 9 13.382 9H6.61803C5.87465 9 5.39116 8.21769 5.72361 7.55279L9.10557 0.788857Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id={clipPathId}>
          <rect
            width='20'
            height='20'
            fill='white'
            transform='translate(0 20) rotate(-90)'
          />
        </clipPath>
      </defs>
    </A11ySVG>
  );
};

export default ArrowUp;
