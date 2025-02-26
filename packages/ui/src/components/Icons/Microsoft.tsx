import { A11ySVG, type A11ySVGProps } from './A11ySVG';

const Microsoft = (props: A11ySVGProps) => {
  return (
    <A11ySVG width='18' height='18' viewBox='0 0 20 20' fill='none' {...props}>
      <path d='M9.47368 0H0V9.47368H9.47368V0Z' fill='#F25022' />
      <path d='M9.47368 10.5264H0V20.0001H9.47368V10.5264Z' fill='#00A4EF' />
      <path d='M20.0001 0H10.5264V9.47368H20.0001V0Z' fill='#7FBA00' />
      <path
        d='M20.0001 10.5264H10.5264V20.0001H20.0001V10.5264Z'
        fill='#FFB900'
      />
    </A11ySVG>
  );
};

export default Microsoft;
