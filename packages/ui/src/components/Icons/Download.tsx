import { useId, type SVGProps } from 'react';

type Props = { title?: string } & SVGProps<SVGSVGElement>;

const Download = ({ title, ...props }: Props) => {
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
        <path d='M11 0V-1H9V0H11ZM9 0V12H11V0H9Z' fill='currentColor' />
        <path
          d='M1 11V19H19V11'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='square'
        />
        <path
          d='M10.8944 15.2111C10.5259 15.9482 9.4741 15.9482 9.10557 15.2111L5.72361 8.44721C5.39116 7.78231 5.87465 7 6.61804 7L13.382 7C14.1253 7 14.6088 7.78231 14.2764 8.44721L10.8944 15.2111Z'
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

export default Download;
