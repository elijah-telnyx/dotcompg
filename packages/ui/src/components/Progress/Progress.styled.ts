import { styled } from '../../styles';
import * as Progress from '@radix-ui/react-progress';

export const ProgressBar = styled(Progress.Root, {
  position: 'relative',
  overflow: 'hidden',

  // Fix overflow clipping in Safari
  // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
  transform: 'translateZ(0)',
});

export const ProgressIndicator = styled(Progress.Indicator, {
  width: '100%',
  height: '100%',
  transition: 'transform 660ms cubic-bezier(0.65, 0, 0.35, 1)',
  transform: `translateX($$filled-percent)`,
});
