import { useId } from 'react';
import { A11ySVG, type A11ySVGProps } from './A11ySVG';

const Plus = (props: A11ySVGProps) => {
  const clipPathId = useId();

  return (
    <A11ySVG
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g clipPath={`url(#${clipPathId})`}>
        <path
          d='M9.34837 0.509537L14.6517 0.509536L14.6517 7.25918C14.6517 8.413 15.587 9.34835 16.7408 9.34835H23.4905L23.4905 14.6516L16.7408 14.6516C15.587 14.6516 14.6517 15.587 14.6517 16.7408L14.6517 23.4905L9.34838 23.4905L9.34838 16.7408C9.34838 15.587 8.41302 14.6516 7.2592 14.6516L0.509602 14.6516L0.509602 9.34835L7.2592 9.34835C8.41302 9.34835 9.34838 8.413 9.34838 7.25918L9.34837 0.509537Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id={clipPathId}>
          <rect width='24' height='24' />
        </clipPath>
      </defs>
    </A11ySVG>
  );
};

export default Plus;
