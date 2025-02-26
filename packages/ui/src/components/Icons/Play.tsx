import { A11ySVG, type A11ySVGProps } from './A11ySVG';

const PlayIcon = (props: A11ySVGProps) => {
  return (
    <A11ySVG
      width='70'
      height='70'
      viewBox='0 0 70 70'
      fill='none'
      xmlns='http://www.w3.org/2000/A11ySVG'
      {...props}
    >
      <path
        d='M58 28.0718C63.3333 31.151 63.3333 38.849 58 41.9282L29.5 58.3827C24.1667 61.4619 17.5 57.6129 17.5 51.4545L17.5 18.5455C17.5 12.3871 24.1667 8.53811 29.5 11.6173L58 28.0718Z'
        fill='currentColor'
      />
    </A11ySVG>
  );
};

export default PlayIcon;
