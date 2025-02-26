import { A11ySVG, type A11ySVGProps } from './A11ySVG';

const PauseIcon = (props: A11ySVGProps) => {
  return (
    <A11ySVG width='70' height='70' viewBox='0 0 70 70' fill='none' {...props}>
      <rect x='13' y='13' width='20' height='45' rx='4' fill='currentColor' />
      <rect x='38' y='13' width='20' height='45' rx='4' fill='currentColor' />
    </A11ySVG>
  );
};

export default PauseIcon;
