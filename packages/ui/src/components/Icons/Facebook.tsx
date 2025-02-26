import type { SVGProps } from 'react';

type Props = { title?: string } & SVGProps<SVGSVGElement>;
const Facebook = ({ title, ...props }: Props) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    {title && <title>{title}</title>}

    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M4 0C1.79086 0 0 1.79086 0 4V20C0 22.2091 1.79086 24 4 24H20C22.2091 24 24 22.2091 24 20V4C24 1.79086 22.2091 0 20 0H4ZM12.8911 11.9851H15.0789L15.3693 9.17081H12.8911V7.5124C12.8911 6.89112 13.3019 6.74492 13.5946 6.74492H15.3756V4.01061L12.9211 4C10.1953 4 9.57647 6.0417 9.57647 7.34488V9.16749H8V11.9851H9.57647V20H12.8911V11.9851Z'
      fill='currentColor'
    />
  </svg>
);
export default Facebook;
