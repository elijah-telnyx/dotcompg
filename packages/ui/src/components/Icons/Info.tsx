import { A11ySVG, type A11ySVGProps } from './A11ySVG';

const Info = (props: A11ySVGProps) => (
  <A11ySVG width='20' height='20' viewBox='0 0 20 20' {...props}>
    <circle cx='10' cy='9' r='9' fill='black' />
    <rect x='8' y='7' width='4' height='8' fill='currentColor' />
    <ellipse cx='10' cy='4.5' rx='2' ry='1.5' fill='currentColor' />
  </A11ySVG>
);

export default Info;
