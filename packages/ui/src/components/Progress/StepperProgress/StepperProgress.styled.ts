import { styled } from '../../../styles';
import Progress from '../Progress';

export const ProgressBar = styled(Progress.Bar, {
  backgroundColor: '$grayHoverLightBackground',
  borderRadius: '$large',
  height: 8,
  width: '100%',
});

export const ProgressIndicator = styled(Progress.Indicator, {
  backgroundColor: '$citron',
});
