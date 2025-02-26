import * as Progress from '@radix-ui/react-progress';
import { config, styled, theme } from '../../../../../styles';
import { addOpacityToHex } from '../../../../../utils/styles';
import Paragraph from '../../../../Typography/Paragraph';

export const THUMBNAIL_WIDTH = 160;
export const THUMBNAIL_HEIGHT = 90;
export const PROGRESS_BAR_GAP = config.theme.space.xl;
export const CURRENT_TIME_CONTAINER_WIDTH = 54;

export const VideoProgressWrapper = styled('div', {
  position: 'absolute',
  zIndex: 2,
  bottom: '10%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  paddingInline: '8%',

  color: '$cream',
  gap: PROGRESS_BAR_GAP,
});

export const ProgressBar = styled(Progress.Root, {
  overflow: 'hidden',
  cursor: 'pointer',
  background: addOpacityToHex(0.3)(theme.colors.cream.value),
  width: '100%',
  height: '12px',
  zIndex: 2,
  flex: 1,
  /* Fix overflow clipping in Safari */
  transform: 'translateZ(0)',
});

export const ProgressIndicator = styled(Progress.Indicator, {
  backgroundColor: '$cream',
  width: '100%',
  height: '100%',
});

export const TimeLeft = styled(Paragraph, {
  color: '$cream',
  width: '50px',
});

export const TimestampThumbnail = styled('div', {
  display: 'none',
  background: '$black',
  borderRadius: '$small',
  position: 'absolute',
  bottom: 'calc(100% + 8px)',
  [`${VideoProgressWrapper}:hover &`]: {
    display: 'block',
  },
});

export const ThumbnailImage = styled('img', {
  display: 'block',
  aspectRatio: '16/9',
  borderRadius: '$small',
  border: '2px solid $black',
  minWidth: THUMBNAIL_WIDTH,
  maxWidth: THUMBNAIL_WIDTH,
  width: THUMBNAIL_WIDTH,
  height: THUMBNAIL_HEIGHT,
});

export const ThumbnailTimestamp = styled('p', {
  textAlign: 'center',
  padding: '$xs',
  fontSize: '$xs',
});

export const CurrentTime = styled('p', {
  position: 'absolute',
  typography: '$p.caption.mobile',
  fontStyle: 'normal',
  top: 'calc(-100% - 18px)',
  background: '$cream',
  borderRadius: '$xs',
  padding: '$xs',
  color: '$black',
  width: CURRENT_TIME_CONTAINER_WIDTH,
  textAlign: 'center',

  '&:after': {
    content: '""',
    display: 'block',
    background: '$cream',
    width: 10,
    height: 10,
    position: 'absolute',
    left: (CURRENT_TIME_CONTAINER_WIDTH - 10) / 2,
    bottom: -4,
    borderRadius: '2px',
    transform: 'rotate(45deg)',
    zIndex: -1,
  },
});
