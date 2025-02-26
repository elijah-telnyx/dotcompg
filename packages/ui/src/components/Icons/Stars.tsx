import type { CSSProperties } from 'react';
import { keyframes } from '../../styles';
import { A11ySVG, type A11ySVGProps } from './A11ySVG';

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

const animationProps: CSSProperties = {
  opacity: 0,
  animationName: fadeIn.name,
  animationDuration: '2.5s',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'ease-in-out',
};

const StarBigDark = ({ animate }: StarPathProps) => (
  <path
    id='BigDark'
    d='M15.3203 16.3404C27.0281 18.2307 30.0712 19.2229 31.6607 32.6809C33.2541 19.2229 34.5432 17.93 48.0012 16.3404C34.5432 14.7471 33.2503 13.4579 31.6607 0C30.0674 13.4579 28.7783 14.7509 15.3203 16.3404Z'
    fill='#00E3AA'
    style={
      animate ? { ...animationProps, animationDelay: '1.5s' } : { opacity: 0 }
    }
  />
);

const StarMediumDark = ({ animate }: StarPathProps) => (
  <path
    id='MediumDark'
    d='M0 29.6171C8.78087 31.0348 11.0631 31.779 12.2553 41.8725C13.4503 31.779 14.4172 30.8093 24.5106 29.6171C14.4172 28.4221 13.4475 27.4553 12.2553 17.3618C11.0603 27.4553 10.0935 28.425 0 29.6171Z'
    fill='#00E3AA'
    style={
      animate ? { ...animationProps, animationDelay: '1s' } : { opacity: 0 }
    }
  />
);

const StarSmallDark = ({ animate }: StarPathProps) => (
  <path
    id='SmallDark'
    d='M31.6579 31.6597C30.7128 37.5136 30.2167 39.0351 23.4877 39.8299C30.2167 40.6266 30.8631 41.2711 31.6579 48.0001C32.4546 41.2711 33.0992 40.6246 39.8281 39.8299C33.0992 39.0332 32.4527 38.3886 31.6579 31.6597Z'
    fill='#FEFDF5'
    style={
      animate ? { ...animationProps, animationDelay: '.5s' } : { opacity: 0 }
    }
  />
);

const StarBig = ({ animate }: StarPathProps) => (
  <path
    id='Big'
    d='M32.3102 12.2549C31.3978 12.4072 30.5857 12.5744 29.8625 12.7713C28.2878 13.2001 27.0916 13.7805 26.1807 14.6915C25.2699 15.6025 24.6897 16.7989 24.2608 18.3738C24.0514 19.1426 23.8756 20.0117 23.7155 20.995C23.1251 18.008 22.2632 16.0697 20.795 14.7569C19.8102 13.8762 18.5865 13.3072 17.0796 12.8688C16.3809 12.6656 15.6136 12.4884 14.772 12.3214C15.851 12.1516 16.7962 11.9649 17.6247 11.7393C19.1994 11.3105 20.3956 10.7302 21.3064 9.81916C22.2173 8.90815 22.7974 7.71174 23.2264 6.13681C23.4234 5.41348 23.5907 4.60128 23.7432 3.68874C23.8954 4.60114 24.0627 5.41319 24.2596 6.13639C24.6884 7.71117 25.2687 8.90734 26.1798 9.81817C27.0908 10.729 28.2872 11.3092 29.8621 11.7381C30.5854 11.9351 31.3976 12.1025 32.3102 12.2549Z'
    fill='#00E3AA'
    stroke='black'
    style={
      animate ? { ...animationProps, animationDelay: '1.5s' } : { opacity: 0 }
    }
  />
);

const StarMedium = ({ animate }: StarPathProps) => (
  <path
    id='Medium'
    d='M14.9109 22.2121C14.4933 22.2934 14.1063 22.3813 13.7478 22.4789C12.5552 22.8036 11.6352 23.2468 10.931 23.9512C10.2267 24.6556 9.78362 25.5758 9.45879 26.7685C9.34735 27.1777 9.24858 27.624 9.15779 28.1106C8.71672 26.2073 8.0836 24.9078 7.06335 23.9955C6.30566 23.3179 5.3685 22.8842 4.22841 22.5526C3.88616 22.453 3.52236 22.3618 3.13607 22.2757C3.68418 22.1771 4.18237 22.0694 4.63513 21.9461C5.82773 21.6213 6.74779 21.1781 7.45202 20.4737C8.15623 19.7694 8.59935 18.8491 8.92418 17.6565C9.02183 17.2979 9.10977 16.9108 9.19112 16.4931C9.27239 16.9107 9.36027 17.2977 9.45788 17.6561C9.78263 18.8487 10.2258 19.7688 10.9302 20.473C11.6346 21.1772 12.5548 21.6203 13.7475 21.9452C14.1061 22.0428 14.4931 22.1308 14.9109 22.2121Z'
    fill='#00E3AA'
    stroke='black'
    style={
      animate ? { ...animationProps, animationDelay: '1s' } : { opacity: 0 }
    }
  />
);

const StarSmall = ({ animate }: StarPathProps) => (
  <path
    id='Small'
    d='M23.7437 32.9287C23.7381 32.9074 23.7324 32.8862 23.7266 32.8651C23.506 32.0547 23.1999 31.4107 22.7021 30.9131C22.2044 30.4155 21.5603 30.1094 20.7499 29.8887C20.6767 29.8688 20.6018 29.8495 20.5252 29.8307C21.4624 29.5423 22.1585 29.1458 22.679 28.5636C23.1534 28.0331 23.4518 27.3824 23.6767 26.6091C23.6795 26.5998 23.6822 26.5904 23.6849 26.581C23.709 26.6828 23.7341 26.7816 23.7602 26.8775C23.9809 27.688 24.287 28.3319 24.7848 28.8295C25.2825 29.3271 25.9265 29.6332 26.737 29.8539C26.7581 29.8597 26.7794 29.8654 26.8008 29.871C26.7795 29.8767 26.7583 29.8824 26.7372 29.8881C25.9268 30.1088 25.2829 30.4149 24.7852 30.9126C24.2876 31.4104 23.9816 32.0544 23.7608 32.8649C23.7551 32.886 23.7494 32.9073 23.7437 32.9287Z'
    fill='#FEFDF5'
    stroke='black'
    style={
      animate ? { ...animationProps, animationDelay: '.5s' } : { opacity: 0 }
    }
  />
);

type StarPathProps = {
  isDark?: boolean;
  animate?: boolean;
};

export type StarIconProps = A11ySVGProps & StarPathProps;

const Stars = ({ animate, isDark, ...props }: StarIconProps) => {
  if (isDark) {
    return (
      <A11ySVG
        width='48'
        height='48'
        viewBox='0 0 48 48'
        title='Stars on a dark background'
        {...props}
      >
        <g id='Star icon'>
          <StarBigDark animate={animate} />
          <StarMediumDark animate={animate} />
          <StarSmallDark animate={animate} />
        </g>
      </A11ySVG>
    );
  }

  return (
    <A11ySVG
      width='36'
      height='36'
      viewBox='0 0 36 36'
      title='Stars'
      {...props}
    >
      <StarBig animate={animate} />
      <StarMedium animate={animate} />
      <StarSmall animate={animate} />
    </A11ySVG>
  );
};

export default Stars;
