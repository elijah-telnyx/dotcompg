import type { SVGProps } from 'react';

export default function MmsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      focusable='false'
      aria-hidden='true'
      viewBox='0 0 24 24'
      data-testid='MmsIcon'
      width='1.25rem'
      height='1.25rem'
      aria-label='MMS available'
      fill='currentColor'
      {...props}
    >
      <path d='M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM5 14l3.5-4.5 2.5 3.01L14.5 8l4.5 6H5z'></path>
    </svg>
  );
}
