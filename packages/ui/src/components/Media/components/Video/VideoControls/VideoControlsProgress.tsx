import { useEffect, useRef, useState } from 'react';
import * as css from './VideoControlsProgress.styled';
import debounce from 'lodash.debounce';

const secondsToMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
    .toString()
    .padStart(2, '0')}`;
};

export function VideoControlsProgress({
  videoRef,
}: {
  readonly videoRef: React.RefObject<HTMLVideoElement>;
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [mousePositionProgress, setMousePositionProgress] = useState<
    number | null
  >(null);

  useEffect(
    function updateDurationAndProgress() {
      const video = videoRef.current;
      if (video === null) return;

      const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (video === null) return;

        setDuration(Number(video.duration));
        setCurrentTime(Number(video.currentTime));
      };

      video.addEventListener('timeupdate', handleTimeUpdate);
      return () => video.removeEventListener('timeupdate', handleTimeUpdate);
    },
    [videoRef]
  );

  const handleMouseOnProgressbar = (newTime: number) => {
    setMousePositionProgress(newTime);
  };
  const handleProgressbarClick = (newTime: number) => {
    setCurrentTime(newTime);
  };

  const canShowProgress = duration > 0 && videoRef.current !== null;
  if (!canShowProgress) return null;

  return (
    <css.VideoProgressWrapper>
      <ProgressBar
        videoRef={videoRef}
        duration={duration}
        currentTime={currentTime}
        onHover={handleMouseOnProgressbar}
        onClick={handleProgressbarClick}
      />
      {mousePositionProgress !== null && (
        <Thumbnail videoRef={videoRef} timestamp={mousePositionProgress} />
      )}
      <css.TimeLeft>
        {secondsToMinutes(Number(duration) - Number(currentTime))}
      </css.TimeLeft>
    </css.VideoProgressWrapper>
  );
}

interface ProgressBarProps {
  readonly videoRef: React.RefObject<HTMLVideoElement>;
  readonly duration: number;
  readonly currentTime: number;
  readonly onHover: (progress: number) => void;
  readonly onClick: (progress: number) => void;
}

function ProgressBar({
  videoRef,
  currentTime,
  duration,
  onHover,
  onClick,
}: ProgressBarProps) {
  const progressBarRef = useRef<HTMLDivElement>(null);

  const handleProgressBarClick = async (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const video = videoRef.current;
    if (video === null) return;

    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const newTime = (clickPosition / rect.width) * duration;

    video.currentTime = newTime;
    onClick(newTime);
  };

  const handleOnHover = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const progressBar = progressBarRef.current;
    if (progressBar === null) return 0;

    const rect = progressBar.getBoundingClientRect();
    const position = event.clientX - rect.left;

    const newTime = (position / rect.width) * duration;
    onHover(newTime);
  };

  return (
    <>
      <css.ProgressBar
        value={currentTime}
        max={duration}
        onClick={handleProgressBarClick}
        onMouseMove={handleOnHover}
        ref={progressBarRef}
        onMouseEnter={handleOnHover}
      >
        <css.ProgressIndicator
          style={{
            transform: `translateX(-${100 - (currentTime / duration) * 100}%)`,
          }}
        />
      </css.ProgressBar>
      <css.CurrentTime
        style={{
          transform: `translateX(${
            Number(progressBarRef.current?.clientWidth) *
              (currentTime / duration) -
            css.CURRENT_TIME_CONTAINER_WIDTH / 2
          }px)`,
        }}
      >
        {secondsToMinutes(Number(currentTime))}
      </css.CurrentTime>
    </>
  );
}

interface ThumbnailProps {
  readonly videoRef: React.RefObject<HTMLVideoElement>;
  readonly timestamp: number | null;
}

function Thumbnail({ videoRef, timestamp }: ThumbnailProps) {
  const [snapshots, setSnapshots] = useState<string | null>(null);
  const secondVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!secondVideoRef.current) return;

    const video = secondVideoRef.current;

    video.currentTime = timestamp ?? 0;
  }, [timestamp]);

  useEffect(() => {
    if (!secondVideoRef.current) return;
    const video = secondVideoRef.current;

    const shoot = (video: HTMLVideoElement) => {
      const canvas = capture(video);
      setSnapshots(canvas.toDataURL());
    };

    const capture = (video: HTMLVideoElement) => {
      const w = 160;
      const h = 90;
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, w, h);
      return canvas;
    };

    const handleSeeked = () => {
      shoot(video);
    };

    const debouncedHandleSeeked = debounce(handleSeeked, 200);

    video.addEventListener('seeked', debouncedHandleSeeked);
    return () => {
      video.removeEventListener('seeked', debouncedHandleSeeked);
    };
  }, []);

  useEffect(() => {
    if (!secondVideoRef.current || !videoRef.current) return;
    if (videoRef.current.children[0] && !secondVideoRef.current.children[0]) {
      secondVideoRef.current.appendChild(videoRef.current.children[0]);
    }
  }, []);

  const getLeftOffSet = () => {
    if (timestamp === null || videoRef.current === null) return '0px';

    const percentage = Math.round(
      (timestamp / videoRef.current.duration) * 100
    );

    if (percentage < 0) return '0px';

    return `calc(${percentage}% - ${css.THUMBNAIL_WIDTH / 2}px - ${
      css.PROGRESS_BAR_GAP
    } / 2)`;
  };

  return (
    <css.TimestampThumbnail
      style={{
        left: getLeftOffSet(),
      }}
    >
      <css.ThumbnailImage
        src={snapshots ?? ''}
        alt='thumbnail'
        as={snapshots ? 'img' : 'div'}
      />

      <css.ThumbnailTimestamp>
        {secondsToMinutes(Number(timestamp))}
      </css.ThumbnailTimestamp>
      <video
        hidden
        muted
        autoPlay
        playsInline
        preload='auto'
        ref={secondVideoRef}
        crossOrigin='anonymous'
      />
    </css.TimestampThumbnail>
  );
}
