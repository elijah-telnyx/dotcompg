import { A11ySVG, type A11ySVGProps } from './A11ySVG';

const ChevronLeft = (props: A11ySVGProps) => {
  return (
    <A11ySVG viewBox='0 0 20 20' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3.00025 10.0002L3.00008 9.99999L12.7499 0.545593L15.9998 3.69706L9.49994 10L16 16.3031L12.7501 19.4546L6.25002 13.1514L3.00024 10.0002L3.00025 10.0002Z'
        fill='currentColor'
      />
    </A11ySVG>
  );
};

export default ChevronLeft;
