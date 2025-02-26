import { A11ySVG, type A11ySVGProps } from './A11ySVG';

const ReplayIcon = (props: A11ySVGProps) => {
  return (
    <A11ySVG
      width='70'
      height='70'
      viewBox='0 0 70 70'
      fill='none'
      xmlns='http://www.w3.org/2000/A11ySVG'
      {...props}
    >
      <path
        d='M22.2271 12.0399C19.501 13.5676 19.501 17.4912 22.2271 19.0189L34.0446 25.6411C36.7109 27.1352 40 25.208 40 22.1516L40 8.90725C40 5.85081 36.7109 3.92363 34.0446 5.41777L22.2271 12.0399Z'
        fill='currentColor'
      />
      <path
        d='M11 38C11 51.2548 21.7452 62 35 62C48.2548 62 59 51.2548 59 38C59 24.7452 48.2548 14 35 14'
        stroke='currentColor'
        strokeWidth='8'
      />
    </A11ySVG>
  );
};

export default ReplayIcon;
