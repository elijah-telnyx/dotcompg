import { A11ySVG, type A11ySVGProps } from './A11ySVG';

const Time = (props: A11ySVGProps) => {
  return (
    <A11ySVG
      id='time-icon'
      data-name='time-icon'
      viewBox='0 0 24 24'
      width='18'
      height='18'
      {...props}
    >
      <path
        d='M12,6a.99974.99974,0,0,0-1,1v4H9a1,1,0,0,0,0,2h3a.99974.99974,0,0,0,1-1V7A.99974.99974,0,0,0,12,6Zm0-4A10,10,0,1,0,22,12,10.01146,10.01146,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Z'
        fill='currentColor'
      ></path>
    </A11ySVG>
  );
};

export default Time;
