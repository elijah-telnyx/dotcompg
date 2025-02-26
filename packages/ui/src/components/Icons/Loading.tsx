import type { SVGProps } from 'react';
import { keyframes, styled } from '../../styles';
import { A11ySVG, type A11ySVGProps } from './A11ySVG';

type LoadingProps = A11ySVGProps & {
  strokeWidth?: SVGProps<SVGPathElement>['strokeWidth'];
};

const Loading = ({ strokeWidth, ...props }: LoadingProps) => (
  <A11ySVG
    width='20'
    height='20'
    viewBox='0 0 22 22'
    title='Loading'
    {...props}
  >
    <path
      stroke='currentColor'
      strokeWidth={strokeWidth}
      d='M2.158 9.141A9.335 9.335 0 0 0 2 10.856C2 15.906 6.03 20 11 20s9-4.094 9-9.144c0-4.26-2.868-7.84-6.75-8.856'
    />
  </A11ySVG>
);

const spinning = keyframes({
  '0%': {
    rotate: '0deg',
  },
  '100%': {
    rotate: '360deg',
  },
});

export default styled(Loading, {
  variants: {
    spin: {
      true: {
        animation: `${spinning} 1s cubic-bezier(.65, .5, .5, .05) infinite`,
      },
    },
  },
});
