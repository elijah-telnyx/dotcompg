import { A11ySVG } from '../../../Icons/A11ySVG';
import { TOOLTIP_ID_PREFIX } from '../utils';
import { POP_SVG_DEFAULT_PROPS, type PoPSVGProps } from './utils';

// import * as css from './NetworkMapPoP.styled';

export const NetworkMapPoPSVG = ({
  id,
  'aria-label': ariaLabel,
  children,
  ...props
}: PoPSVGProps) => {
  return (
    <A11ySVG
      {...POP_SVG_DEFAULT_PROPS}
      {...props}
      title={`${ariaLabel} Network Map`}
      aria-describedby={`${TOOLTIP_ID_PREFIX}${id}`}
    >
      {children}
    </A11ySVG>
  );
};

export default NetworkMapPoPSVG;
