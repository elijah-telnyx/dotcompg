import { A11ySVG, type A11ySVGProps } from './A11ySVG';

const Refresh = (props: A11ySVGProps) => (
  <A11ySVG viewBox='0 0 24 24' aria-hidden='true' {...props}>
    <path
      d='M19.91,15.51H15.38a1,1,0,0,0,0,2h2.4A8,8,0,0,1,4,12a1,1,0,0,0-2,0,10,10,0,0,0,16.88,7.23V21a1,1,0,0,0,2,0V16.5A1,1,0,0,0,19.91,15.51ZM12,2A10,10,0,0,0,5.12,4.77V3a1,1,0,0,0-2,0V7.5a1,1,0,0,0,1,1h4.5a1,1,0,0,0,0-2H6.22A8,8,0,0,1,20,12a1,1,0,0,0,2,0A10,10,0,0,0,12,2Z'
      fill='currentColor'
    ></path>
  </A11ySVG>
);

export default Refresh;
