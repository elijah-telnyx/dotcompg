import { A11ySVG, type A11ySVGProps } from "ui/components/Icons/A11ySVG";

const Satellite = ({ ...props }: A11ySVGProps) => {
  return (
    <A11ySVG
      width="84"
      height="61"
      viewBox="0 0 167 122"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M56.7854 114L83 68.1245L96.054 90.9691L109.215 114L56.7854 114ZM112.634 119.985C112.633 119.983 112.632 119.981 112.631 119.98L112.634 119.985Z"
        stroke="url(#paint0_linear_756_582)"
        strokeWidth="16"
      />
      <g id="loader-satellite-dish">
        <ellipse
          opacity="0.8"
          cx="83"
          cy="13.612"
          rx="83"
          ry="13.612"
          transform="matrix(1 1.64996e-07 2.05526e-07 -1 0.0102539 44.0098)"
          fill="url(#paint1_linear_756_582)"
        />
        <path
          opacity="0.5"
          d="M86.3541 6.14794C84.8222 3.44228 80.9243 3.44229 79.3925 6.14794L47.6051 62.2919C46.0954 64.9584 48.0217 68.2626 51.0859 68.2626L114.661 68.2626C117.725 68.2626 119.651 64.9584 118.141 62.2919L86.3541 6.14794Z"
          fill="#FEFDF5"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M165.105 31.9011L166.01 31.9011L166.01 31.9011C166.01 56.9597 128.859 77.2737 83.0309 77.2737C37.2027 77.2737 0.0516439 56.9597 0.0516456 31.9011L0.998118 31.9011C7.05818 38.44 41.4869 43.4506 83.0516 43.4506C124.616 43.4506 159.045 38.44 165.105 31.9011Z"
          fill="url(#paint2_linear_756_582)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_756_582"
          x1="83"
          y1="52"
          x2="83"
          y2="122"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9E9D93" />
          <stop offset="1" stopColor="#383834" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_756_582"
          x1="0"
          y1="13.612"
          x2="83"
          y2="13.612"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#807E75" />
          <stop offset="1" stopColor="#E6E3D3" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_756_582"
          x1="83.0309"
          y1="77.2738"
          x2="83.031"
          y2="0.552646"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#969696" />
          <stop offset="1" />
        </linearGradient>
      </defs>
    </A11ySVG>
  );
};

export default Satellite;
