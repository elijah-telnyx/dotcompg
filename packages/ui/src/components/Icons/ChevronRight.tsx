import { A11ySVG, type A11ySVGProps } from './A11ySVG';

const ChevronRight = (props: A11ySVGProps) => {
  return (
    <A11ySVG viewBox='0 0 20 20' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16.9998 10.0002L16.9999 9.99999L7.2501 0.545593L4.00016 3.69706L10.5001 10L4 16.3031L7.24994 19.4546L13.75 13.1514L16.9998 10.0002L16.9998 10.0002Z'
        fill='currentColor'
      />
    </A11ySVG>
  );
};

export default ChevronRight;
