import { A11ySVG, type A11ySVGProps } from './A11ySVG';

const Notification = (props: A11ySVGProps) => {
  return (
    <A11ySVG
      id='notification-icon'
      data-name='notification-icon'
      viewBox='0 0 24 24'
      width='18'
      height='18'
      {...props}
    >
      <path
        d='M18,13.18V10a6,6,0,0,0-5-5.91V3a1,1,0,0,0-2,0V4.09A6,6,0,0,0,6,10v3.18A3,3,0,0,0,4,16v2a1,1,0,0,0,1,1H8.14a4,4,0,0,0,7.72,0H19a1,1,0,0,0,1-1V16A3,3,0,0,0,18,13.18ZM8,10a4,4,0,0,1,8,0v3H8Zm4,10a2,2,0,0,1-1.72-1h3.44A2,2,0,0,1,12,20Zm6-3H6V16a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z'
        fill='currentColor'
      ></path>
    </A11ySVG>
  );
};

export default Notification;
