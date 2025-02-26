import { A11ySVG, type A11ySVGProps } from './A11ySVG';

const Alert = (props: A11ySVGProps) => {
  return (
    <A11ySVG width='20' height='20' viewBox='0 0 20 20' {...props}>
      <circle cx='10' cy='9' r='9' fill='currentColor' />
      <path d='M8 3H12L11.5 11H8.5L8 3Z' fill='#FEFDF5' />
      <ellipse cx='10' cy='13.5' rx='2' ry='1.5' fill='#FEFDF5' />
    </A11ySVG>
  );
};

export default Alert;
