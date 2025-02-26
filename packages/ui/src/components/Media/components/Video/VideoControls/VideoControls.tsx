import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { useEffect, useRef, useState } from 'react';
import { styled, theme } from '../../../../../styles';
import { addOpacityToHex } from '../../../../../utils/styles';
import Loading from '../../../../Icons/Loading';
import PauseIcon from '../../../../Icons/Pause';
import PlayIcon from '../../../../Icons/Play';
import ReplayIcon from '../../../../Icons/Replay';
import Heading from '../../../../Typography/Heading';
import { VideoControlsProgress } from './VideoControlsProgress';

enum VideoState {
  IDLE = 'idle',
  PLAYING = 'playing',
  PAUSED = 'paused',
  ENDED = 'ended',
  LOADING = 'loading',
}

const FloatingVideoController = styled('button', {
  position: 'absolute',
  zIndex: 2,
  inset: 0,
  isolation: 'isolate',

  display: 'grid',
  placeItems: 'center',
  backgroundColor: addOpacityToHex(0.3)(theme.colors.black.value),
  variants: {
    isTouched: {
      true: {
        opacity: 0,
        transition: 'opacity 0.2s ease-in-out',
        '&[data-visible="false"]': {
          transition: 'opacity 0.5s ease-in-out',
        },
        [`&[data-visible="false"][data-state="${VideoState.PLAYING}"]`]: {
          cursor: 'none',
        },
        '&[data-visible="true"]:hover, &:has(*:hover)': {
          opacity: 1,
        },
      },
      false: {
        transition: 'opacity 0.5s ease-in-out',
        opacity: 1,
      },
    },
  },
});

const HeadingWrapper = styled('div');

const VideoControllerText = styled(Heading, {
  textWrap: 'balance',
  textAlign: 'center',
  position: 'absolute',
  bottom: '-calc($large + 100%)',
  left: 0,
  right: 0,
  '@lessThanSmall': {
    fontSize: '$small',
  },
});

const VideoControllerButton = styled('button', {
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  marginInline: 'auto',
  borderRadius: '100%',
  display: 'grid',
  placeItems: 'center',
  transition: 'all 0.2s ease-in-out',
  zIndex: 2,

  color: '$cream',
  backgroundColor: addOpacityToHex(0.4)(theme.colors.black.value),
  '&:hover': {
    backgroundColor: '$cream',
    color: '$black',
  },

  width: 64,
  height: 64,
  '& svg': {
    width: 44,
    height: 44,
  },

  '@medium': {
    width: 104,
    height: 104,
    '& svg': {
      width: 72,
      height: 72,
    },
  },
});

function VideoControllerButtonIcon({ videoState }: { videoState: VideoState }) {
  switch (videoState) {
    case VideoState.PLAYING:
      return (
        <>
          <PauseIcon />
          <VisuallyHidden.Root>Pause</VisuallyHidden.Root>
        </>
      );
    case VideoState.PAUSED:
      return (
        <>
          <PlayIcon />
          <VisuallyHidden.Root>Play</VisuallyHidden.Root>
        </>
      );
    case VideoState.ENDED:
      return (
        <>
          <ReplayIcon />
          <VisuallyHidden.Root>Replay</VisuallyHidden.Root>
        </>
      );
    default:
      return null;
  }
}

export default function VideoController({
  children,
  preloadCopy,
  videoRef,
  ...props
}: {
  preloadCopy?: string;
  videoRef: React.RefObject<HTMLVideoElement>;
} & React.HtmlHTMLAttributes<HTMLButtonElement>) {
  const [videoState, setVideoState] = useState<VideoState>(VideoState.IDLE);
  const [visibility, setVisibility] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleFirstClick = async () => {
    const video = videoRef.current;
    if (video === null) return;

    setVideoState(VideoState.LOADING);

    video.addEventListener('loadeddata', () => {
      setVideoState(VideoState.PLAYING);
      video.addEventListener('ended', () => {
        setVideoState(VideoState.ENDED);
      });
    });
    await import('../utils').then(async (utils) => {
      await utils.loadAndPlaysVideo(video);
    });
  };

  const restartVideo = () => {
    const video = videoRef.current;
    if (video === null) return;
    video.currentTime = 0;
    video.play();
    setVideoState(VideoState.PLAYING);
  };

  const handleClick = async (_event: React.MouseEvent<HTMLButtonElement>) => {
    const video = videoRef.current;
    if (video === null) return;
    if (videoState === VideoState.IDLE) {
      await handleFirstClick();
      return;
    }

    if (videoState === VideoState.PLAYING) {
      video.pause();
      setVideoState(VideoState.PAUSED);
    } else {
      if (video.currentTime === video.duration) {
        return restartVideo();
      }
      video.play();
      setVideoState(VideoState.PLAYING);
    }
  };

  useEffect(() => {
    if (visibility) {
      timerRef.current = setTimeout(() => {
        setVisibility(false);
      }, 1500);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [visibility]);

  if (videoState === VideoState.LOADING) {
    return (
      <FloatingVideoController isTouched={false} as='div'>
        <HeadingWrapper>
          <VideoControllerButton as='div'>
            <Loading spin />
          </VideoControllerButton>
        </HeadingWrapper>
      </FloatingVideoController>
    );
  }

  if (videoState !== VideoState.IDLE) {
    return (
      <FloatingVideoController
        {...props}
        onClick={handleClick}
        isTouched={videoState !== VideoState.ENDED}
        data-visible={visibility}
        data-state={videoState}
        onMouseMove={() => {
          setVisibility(true);
        }}
      >
        <HeadingWrapper>
          <VideoControllerButton as='div'>
            <VideoControllerButtonIcon videoState={videoState} />
          </VideoControllerButton>
        </HeadingWrapper>
        <VideoControlsProgress videoRef={videoRef} />
      </FloatingVideoController>
    );
  }

  return (
    <FloatingVideoController {...props} onClick={handleClick} isTouched={false}>
      <HeadingWrapper>
        <VideoControllerButton as='div'>
          <VideoControllerButtonIcon videoState={VideoState.PAUSED} />
        </VideoControllerButton>
        {preloadCopy && (
          <VideoControllerText
            css={{ marginTop: '$large' }}
            level={2}
            dark
            htmlAs='p'
          >
            {preloadCopy}
          </VideoControllerText>
        )}
      </HeadingWrapper>
    </FloatingVideoController>
  );
}
