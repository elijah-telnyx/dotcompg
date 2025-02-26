import { useState } from 'react';
import Tooltip from '../../Tooltip';
import * as css from './Slider.styled';

export interface SliderProps
  extends Omit<React.ComponentProps<typeof css.SliderRoot>, 'asChild'> {
  /**
   * Will be used as aria-label for the slider.
   * Used if no <label> is used for the slider
   * @link https://www.w3.org/TR/wai-aria-practices-1.1/#aria-label
   */
  label?: string;
  /**
   * Will be used as aria-describedby for the slider.
   * Used together with <label>, it will be the id of the <label>
   * @link https://www.w3.org/TR/wai-aria-practices-1.1/#aria-describedby
   */
  describedBy?: string;
}

const Slider = ({
  label,
  describedBy,
  theme = 'dark',
  ...props
}: SliderProps) => {
  const [isValueVisible, setIsValueVisible] = useState(false);

  const showValue = () => {
    setIsValueVisible(true);
  };

  const hiddenValue = () => {
    setIsValueVisible(false);
  };

  return (
    <css.SliderRoot {...props} theme={theme}>
      <css.SliderTrack>
        <css.SliderRange />
      </css.SliderTrack>
      <Tooltip
        content={props?.value?.toString() || '0'}
        visible={isValueVisible}
      >
        <css.SliderThumb
          aria-label={label}
          aria-describedby={describedBy}
          onFocus={showValue}
          onBlur={hiddenValue}
        />
      </Tooltip>
    </css.SliderRoot>
  );
};

export default Slider;
