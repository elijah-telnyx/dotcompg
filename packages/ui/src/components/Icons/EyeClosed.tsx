import type { SVGProps } from 'react';

type Props = { title?: string } & SVGProps<SVGSVGElement>;
const ExteEyeClosed = ({ title, ...props }: Props) => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    {title && <title>{title}</title>}
    <path
      d='M3.44458 15.7002L16.7781 2.90002'
      stroke='#969696'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M7.83984 14.3143C8.53874 14.5313 9.267 14.639 9.9988 14.6336C12.9144 14.6826 15.8712 12.6332 17.696 10.625C17.8916 10.4078 17.9999 10.1258 17.9999 9.83352C17.9999 9.5412 17.8916 9.25924 17.696 9.04204C17.0349 8.31685 16.3026 7.66002 15.51 7.08148'
      stroke='#969696'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M11.7149 5.2339C11.1538 5.09427 10.5771 5.02688 9.99894 5.03336C7.13241 4.98572 4.16775 6.99037 2.30391 9.04053C2.10827 9.25772 2 9.53968 2 9.832C2 10.1243 2.10827 10.4063 2.30391 10.6235C2.87062 11.2439 3.48916 11.8148 4.15282 12.3302'
      stroke='#969696'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M7.33228 9.83339C7.33218 9.48317 7.40109 9.13636 7.53508 8.81278C7.66906 8.48919 7.86548 8.19518 8.11313 7.94754C8.36077 7.69989 8.65478 7.50347 8.97836 7.36949C9.30194 7.23551 9.64875 7.16659 9.99898 7.16669'
      stroke='#969696'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M12.6657 9.83276C12.6658 10.183 12.5969 10.5299 12.4629 10.8535C12.329 11.1771 12.1326 11.4712 11.8849 11.7189C11.6373 11.9666 11.3433 12.1631 11.0197 12.2971C10.6961 12.4312 10.3493 12.5002 9.99902 12.5002'
      stroke='#969696'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default ExteEyeClosed;
