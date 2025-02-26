import { styled } from '../../../styles';
import * as Slider from '@radix-ui/react-slider';

export const SliderRoot = styled(Slider.Root, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',
  width: '100%',
  height: 20,
  variants: {
    theme: {
      dark: {
        $$thumbColor: '$colors$cream',
        $$trackColor: '$colors$grayHoverLightBackground',
        $$rangeColor: '$colors$green',
        $$thumbShadow: '0px 0px 20px 0px #000000',
      },
      light: {
        $$thumbColor: '$colors$black',
        $$trackColor: '$colors$tan',
        $$rangeColor: '$colors$green',
        $$thumbShadow: '0px 0px 10px 0px #00000033',
      },
    },
  },
});

export const SliderTrack = styled(Slider.Track, {
  backgroundColor: '$$trackColor',
  position: 'relative',
  flexGrow: 1,
  height: 8,
});

export const SliderRange = styled(Slider.Range, {
  position: 'absolute',
  backgroundColor: '$$rangeColor',
  height: '100%',
});

export const SliderThumb = styled(Slider.Thumb, {
  cursor: 'pointer',
  display: 'block',
  width: 20,
  height: 20,
  backgroundColor: '$$thumbColor',
  boxShadow: '$$thumbShadow',
  borderRadius: '$round',
  '&:focus-visible': {
    outline: 'none',
  },
});
