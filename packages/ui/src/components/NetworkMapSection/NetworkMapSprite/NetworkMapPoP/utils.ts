import type { A11ySVGProps } from '../../../Icons/A11ySVG';

export interface PoPSVGProps extends A11ySVGProps {
  id: string;
}

export const POP_SVG_DEFAULT_PROPS: Omit<PoPSVGProps, 'id'> = {
  width: '1364',
  height: '899',
  viewBox: '0 0 1364 899',
  fill: 'none',
  style: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1, // avoid pins to be covered by the map
  },
};
