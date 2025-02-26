import { A11ySVG, type A11ySVGProps } from './A11ySVG';

const ThreeDotsVerticalIcon = (props: A11ySVGProps) => (
  <A11ySVG width='20' height='20' viewBox='0 0 20 20' fill='none' {...props}>
    <circle cx='10' cy='4' r='1.5' fill='currentColor' stroke='currentColor' />
    <circle cx='10' cy='10' r='1.5' fill='currentColor' stroke='currentColor' />
    <circle cx='10' cy='16' r='1.5' fill='currentColor' stroke='currentColor' />
  </A11ySVG>
);

export default ThreeDotsVerticalIcon;
