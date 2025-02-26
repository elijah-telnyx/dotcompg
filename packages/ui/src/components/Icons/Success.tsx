import { A11ySVG, type A11ySVGProps } from './A11ySVG';

const Success = (props: A11ySVGProps) => (
  <A11ySVG width='20' height='20' viewBox='0 0 20 20' {...props}>
    <circle cx='10' cy='9' r='9' fill='#00E3AA' />
    <path
      d='M5 8.74805L8.51843 12.2665L15.2665 5.51843'
      stroke='black'
      strokeWidth='3.5'
    />
  </A11ySVG>
);

export default Success;
