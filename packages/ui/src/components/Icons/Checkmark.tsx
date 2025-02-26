import { useId, type SVGProps } from 'react';

type Props = { title?: string } & SVGProps<SVGSVGElement>;

const Checkmark = ({ title, ...props }: Props) => {
  const clipPathId = useId();

  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      {title && <title>{title}</title>}
      <g clipPath={`url(#${clipPathId})`}>
        <path
          d='M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528'
          stroke='currentColor'
          strokeWidth='8'
        />
      </g>
      <defs>
        <clipPath id={clipPathId}>
          <rect width='32' height='32' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Checkmark;
