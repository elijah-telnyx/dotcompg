import { A11ySVG, type A11ySVGProps } from './A11ySVG';

const ArrowRight = (props: A11ySVGProps) => {
  return (
    <A11ySVG width='20' height='20' viewBox='0 0 20 20' {...props}>
      <g>
        <path
          d='M1 9L-4.37114e-08 9L4.37114e-08 11L1 11L1 9ZM1 11L13 11L13 9L1 9L1 11Z'
          fill='currentColor'
        />
        <path
          d='M19.2111 9.10557C19.9482 9.4741 19.9482 10.5259 19.2111 10.8944L12.4472 14.2764C11.7823 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 11.7823 5.39116 12.4472 5.72361L19.2111 9.10557Z'
          fill='currentColor'
        />
      </g>
    </A11ySVG>
  );
};

export default ArrowRight;
