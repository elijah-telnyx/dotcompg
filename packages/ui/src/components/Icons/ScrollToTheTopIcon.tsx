import { A11ySVG, type A11ySVGProps } from './A11ySVG';

const ScrollToTheTopIcon = ({ ...props }: A11ySVGProps) => {
  return (
    <A11ySVG
      width='20'
      height='21'
      viewBox='0 0 20 21'
      title='Scroll to the top'
      {...props}
    >
      <path
        d='M9 20L9 21L11 21L11 20L9 20ZM11 20L11 8.00002L9 8.00002L9 20L11 20Z'
        fill='currentColor'
      />
      <path
        d='M19 1L1 0.999998'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='square'
      />
      <path
        d='M9.10557 4.78886C9.4741 4.05181 10.5259 4.05181 10.8944 4.78886L14.2764 11.5528C14.6088 12.2177 14.1253 13 13.382 13L6.61803 13C5.87465 13 5.39115 12.2177 5.72361 11.5528L9.10557 4.78886Z'
        fill='currentColor'
      />
    </A11ySVG>
  );
};

export default ScrollToTheTopIcon;
