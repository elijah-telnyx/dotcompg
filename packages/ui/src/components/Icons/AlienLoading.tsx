import { useEffect } from 'react';
import { styled } from '../../styles';
import { A11ySVG, type A11ySVGProps } from './A11ySVG';
import type { TweenVars } from 'gsap';
import { useGsap } from '../../utils/hooks/useGsap';

export type AlienLoadingProps = A11ySVGProps & {
  move?: boolean;
};

const DEFAULT_ANIMATION_VARS = {
  repeat: -1,
  repeatDelay: 0.25,
  duration: 2.5,
  yoyo: true,
};

const ANIMATION_CONFIG: TweenVars = {
  face: {
    ...DEFAULT_ANIMATION_VARS,
    xPercent: 25,
  },
  eye: {
    ...DEFAULT_ANIMATION_VARS,
    xPercent: -50,
  },
  mouth: {
    ...DEFAULT_ANIMATION_VARS,
    xPercent: 50,
  },
};

const Group = styled('g', {
  mixBlendMode: 'luminosity',

  variants: {
    colorBurn: {
      true: {
        mixBlendMode: 'color-burn',
      },
    },
  },
});

const AlienLoading = ({ move = true, ...props }: AlienLoadingProps) => {
  const gsap = useGsap();

  useEffect(() => {
    if (gsap && move) {
      gsap.to('.alien-loading-face', ANIMATION_CONFIG.face);
      gsap.to('.alien-loading-eye', ANIMATION_CONFIG.eye);
      gsap.to('.alien-loading-mouth', ANIMATION_CONFIG.mouth);
    }
  }, [gsap, move]);

  return (
    <A11ySVG
      width='69'
      height='60'
      viewBox='0 0 138 119'
      title='AlienLoading'
      {...props}
    >
      <defs>
        <mask id='theMask'>
          <path
            d='M91.0396 102.251C78.6001 123.894 47.3999 123.894 34.9604 102.251L4.3567 49.0045C-8.04923 27.4199 7.51711 0.482907 32.3963 0.48291L93.6037 0.482915C118.483 0.482917 134.049 27.4199 121.643 49.0045L91.0396 102.251Z'
            fill='#00E3AA'
          />
        </mask>
      </defs>

      <path
        d='M91.0396 102.251C78.6001 123.894 47.3999 123.894 34.9604 102.251L4.3567 49.0045C-8.04923 27.4199 7.51711 0.482907 32.3963 0.48291L93.6037 0.482915C118.483 0.482917 134.049 27.4199 121.643 49.0045L91.0396 102.251Z'
        fill='#00E3AA'
      />

      <Group colorBurn mask='url(#theMask)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M36.9051 105.588C49.9056 108.283 64.3119 103.057 71.8598 89.9108L102.681 36.2289C109.569 24.2319 107.895 10.5948 100.808 0.772253C98.5361 0.268064 96.1543 6.72827e-06 93.6805 6.51201e-06L32.4229 0C7.52328 0 -8.05584 27.1574 4.36028 48.9186L34.9891 102.6C35.586 103.647 36.226 104.643 36.9051 105.588Z'
          fill='#D3FFA6'
          className='alien-loading-face'
        />
      </Group>

      <Group>
        <path
          d='M80 40.102C80 39.2078 80.7305 38.4829 81.6315 38.4829H136.367C137.51 38.4829 138.298 39.6186 137.892 40.6783L127.283 68.3122C126.319 70.8234 123.893 72.4829 121.185 72.4829H81.6315C80.7305 72.4829 80 71.758 80 70.8639V40.102Z'
          fill='black'
          className='alien-loading-eye'
        />
      </Group>
      <Group>
        <path
          d='M74 40.102C74 39.2078 73.2647 38.4829 72.3578 38.4829H15.6438C14.4871 38.4829 13.6929 39.6304 14.1146 40.6922L25.1058 68.3678C26.0915 70.8498 28.519 72.4829 31.2226 72.4829H72.3578C73.2647 72.4829 74 71.758 74 70.8639V40.102Z'
          fill='black'
          className='alien-loading-eye'
        />
      </Group>
      <path
        d='M44 104C44 97.9249 48.9249 93 55 93C61.0751 93 66 97.9249 66 104C66 110.075 61.0751 115 55 115C48.9249 115 44 110.075 44 104Z'
        fill='#E6E3D3'
        className='alien-loading-mouth'
      />
    </A11ySVG>
  );
};

export default AlienLoading;
