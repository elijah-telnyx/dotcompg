import { PATH_ID_PREFIX, type SpriteElementProps } from '../utils';

import * as css from './NetworkMapPoP.styled';

export const NetworkMapPoPPath = ({
  id,
  'aria-label': ariaLabel,
  ...props
}: SpriteElementProps) => {
  return (
    <css.PoPPath
      {...props}
      id={`${PATH_ID_PREFIX}${id}`}
      className='network-map-sprite-pop-path'
    >
      <title>{`${ariaLabel} PoP Path`}</title>
    </css.PoPPath>
  );
};

export default NetworkMapPoPPath;
