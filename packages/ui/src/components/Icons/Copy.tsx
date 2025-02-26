import { A11ySVG, type A11ySVGProps } from './A11ySVG';

const Copy = (props: A11ySVGProps) => (
  <A11ySVG width='22' height='24' viewBox='0 0 22 24' fill='none' {...props}>
    <path
      d='M1.5 7C1.5 6.44772 1.94772 6 2.5 6H14.5C15.0523 6 15.5 6.44772 15.5 7V22C15.5 22.5523 15.0523 23 14.5 23H2.5C1.94772 23 1.5 22.5523 1.5 22V7Z'
      stroke='currentColor'
      strokeWidth='2'
    />
    <path
      d='M6.5 3.5V2C6.5 1.44772 6.94772 1 7.5 1H19.5C20.0523 1 20.5 1.44772 20.5 2V17C20.5 17.5523 20.0523 18 19.5 18H18'
      stroke='currentColor'
      strokeWidth='2'
    />
  </A11ySVG>
);

export default Copy;
