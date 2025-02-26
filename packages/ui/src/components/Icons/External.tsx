import { useId, type SVGProps } from 'react';

type Props = { title?: string } & SVGProps<SVGSVGElement>;

const External = ({ title, ...props }: Props) => {
  const clipPathId = useId();

  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      {title && <title>{title}</title>}
      <g clipPath={`url(#${clipPathId})`}>
        <path
          d='M3.29289 15.2929L2.58579 16L4 17.4142L4.70711 16.7071L3.29289 15.2929ZM4.70711 16.7071L12.8671 8.54709L11.4529 7.13288L3.29289 15.2929L4.70711 16.7071Z'
          fill='currentColor'
        />
        <path
          d='M15.7026 3.03247C16.4844 2.77188 17.2281 3.51562 16.9675 4.29738L14.7116 11.065C14.4765 11.7703 13.5815 11.9816 13.0558 11.4559L8.54405 6.94415C8.0184 6.4185 8.2297 5.52343 8.93493 5.28835L15.7026 3.03247Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id={clipPathId}>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default External;
