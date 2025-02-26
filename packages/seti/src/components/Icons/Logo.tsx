import { type SVGProps } from "react";

type Props = {
  title?: string;
} & SVGProps<SVGSVGElement>;

const Logo = ({ title, ...props }: Props) => {
  return (
    <svg
      width="86"
      height="27"
      viewBox="0 0 86 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M68.1444 23.0934C68.1444 24.0954 67.7401 25.0564 67.0203 25.7655C66.3006 26.4746 65.3241 26.8737 64.3054 26.8753H53.992C53.9824 26.8753 53.9732 26.8715 53.9665 26.8649C53.9597 26.8582 53.9559 26.8492 53.9559 26.8398V23.4662C53.9559 23.4568 53.9597 23.4478 53.9665 23.4411C53.9732 23.4345 53.9824 23.4307 53.992 23.4307H62.759C62.9615 23.4307 63.162 23.3913 63.349 23.3147C63.5359 23.2381 63.7056 23.1259 63.8483 22.9845C63.9909 22.8431 64.1037 22.6753 64.1801 22.4908C64.2565 22.3064 64.295 22.1088 64.2934 21.9096V19.6724C64.2934 19.6646 64.2902 19.6571 64.2846 19.6515C64.2789 19.646 64.2713 19.6428 64.2633 19.6428C64.2553 19.6428 64.2477 19.646 64.242 19.6515C64.2364 19.6571 64.2332 19.6646 64.2332 19.6724C63.7161 20.4952 62.9878 21.1696 62.1217 21.6277C61.2556 22.0859 60.2821 22.3117 59.2991 22.2825C55.8272 22.2825 53.9198 19.8027 53.9198 16.0148V5.75207H53.9499H57.7106H57.7407V15.5768C57.7407 17.8318 58.7095 19.0628 60.8756 19.0628C63.3607 19.0628 64.1309 17.4648 64.2814 16.1036V15.8846V5.75207C64.2868 5.74896 64.2931 5.74731 64.2994 5.74731C64.3057 5.74731 64.312 5.74896 64.3175 5.75207H68.0962C68.1017 5.74896 68.1079 5.74731 68.1143 5.74731C68.1206 5.74731 68.1268 5.74896 68.1323 5.75207L68.1444 23.0934Z"
        fill="#FEFDF5"
      />
      <path
        d="M19.5379 14.8074H30.6275V12.9905C30.6275 8.12544 27.974 5.46802 23.2324 5.46802C18.0035 5.46802 15.5064 8.32666 15.5064 12.8898V14.8074C15.5064 19.4239 18.0035 22.2825 23.2324 22.2825C27.7995 22.2825 30.1943 20.0513 30.5012 16.7132V16.0918H26.596L26.5359 16.8671C26.5228 17.0421 26.4884 17.215 26.4336 17.382C26.1207 18.3112 25.1399 19.0451 23.2685 19.0451C20.5187 19.0451 19.4958 17.4945 19.4958 15.1862V14.8607C19.4955 14.8484 19.4995 14.8364 19.5072 14.8267C19.5149 14.817 19.5257 14.8102 19.5379 14.8074ZM23.1482 8.70545C25.6634 8.70545 26.6743 9.98977 26.6682 12.0198C26.6669 12.0319 26.6614 12.0433 26.6527 12.0519C26.6439 12.0605 26.6324 12.0659 26.6201 12.0672H19.574C19.5671 12.0672 19.5604 12.0658 19.5541 12.0631C19.5478 12.0604 19.5422 12.0563 19.5377 12.0513C19.5331 12.0462 19.5297 12.0403 19.5277 12.0338C19.5256 12.0274 19.525 12.0206 19.5259 12.0139C19.6944 10.0371 20.7413 8.70545 23.1482 8.70545Z"
        fill="#FEFDF5"
      />
      <path
        d="M36.1091 0.875244H32.2581V22.0221H36.1091V0.875244Z"
        fill="#FEFDF5"
      />
      <path
        d="M41.7472 5.72243H37.9263V22.022H41.7472V12.292C41.7472 10.836 42.3068 8.68169 45.189 8.68169C47.3552 8.68169 48.324 9.90683 48.324 12.1677V22.022H52.1509V11.7357C52.1509 7.95371 50.2374 5.46793 46.7716 5.46793C45.7809 5.44271 44.8008 5.67312 43.9288 6.13623C43.0568 6.59935 42.3233 7.27902 41.8014 8.1076C41.8014 8.11544 41.7982 8.12297 41.7926 8.12852C41.7869 8.13407 41.7793 8.13719 41.7713 8.13719C41.7633 8.13719 41.7557 8.13407 41.75 8.12852C41.7444 8.12297 41.7412 8.11544 41.7412 8.1076L41.7472 5.72243Z"
        fill="#FEFDF5"
      />
      <path
        d="M75.1844 13.5645C75.1945 13.5805 75.1999 13.5989 75.1999 13.6178C75.1999 13.6366 75.1945 13.6551 75.1844 13.6711L69.5643 22.0221H73.7763L77.3866 16.5889C77.3908 16.5815 77.3969 16.5753 77.4043 16.571C77.4117 16.5667 77.4202 16.5645 77.4288 16.5645C77.4374 16.5645 77.4458 16.5667 77.4532 16.571C77.4606 16.5753 77.4667 16.5815 77.4709 16.5889L81.0511 22.0221H85.4918L79.8958 13.6829C79.8868 13.6676 79.8821 13.6502 79.8821 13.6326C79.8821 13.6149 79.8868 13.5976 79.8958 13.5823L85.2812 5.72247H80.9127L77.7176 10.6644C77.7131 10.6705 77.7073 10.6755 77.7005 10.679C77.6937 10.6824 77.6861 10.6842 77.6785 10.6842C77.6708 10.6842 77.6633 10.6824 77.6565 10.679C77.6497 10.6755 77.6438 10.6705 77.6394 10.6644L74.4623 5.71655H69.8231L75.1844 13.5645Z"
        fill="#FEFDF5"
      />
      <path
        d="M14.2246 18.6545H9.20024C8.79846 18.6546 8.41268 18.4996 8.12578 18.223C7.83887 17.9463 7.67375 17.57 7.66587 17.1749V10.5994C7.66587 10.1991 7.82752 9.81523 8.11527 9.5322C8.40303 9.24916 8.7933 9.09016 9.20024 9.09016H14.2246V5.7166H9.20024C8.7933 5.7166 8.40303 5.55759 8.11527 5.27456C7.82752 4.99152 7.66587 4.60764 7.66587 4.20737V0.875244H3.83293V4.20737C3.83294 4.40607 3.79305 4.6028 3.71556 4.7863C3.63808 4.96979 3.52452 5.13643 3.3814 5.27665C3.23828 5.41688 3.06842 5.52792 2.88157 5.60342C2.69471 5.67891 2.49454 5.71738 2.29254 5.7166H0V9.09016H2.30457C2.71152 9.09016 3.10179 9.24916 3.38954 9.5322C3.67729 9.81523 3.83895 10.1991 3.83895 10.5994V18.2402C3.85163 19.2486 4.26821 20.2113 4.99823 20.9194C5.72826 21.6275 6.7128 22.0238 7.73807 22.0221H14.2246V18.6545Z"
        fill="#FEFDF5"
      />
    </svg>
  );
};

export default Logo;
