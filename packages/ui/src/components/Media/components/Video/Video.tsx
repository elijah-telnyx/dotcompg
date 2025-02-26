import dynamic from 'next/dynamic';
import {
  forwardRef,
  useEffect,
  useRef,
  type DetailedHTMLProps,
  type ForwardedRef,
  type RefObject,
  type TrackHTMLAttributes,
  type VideoHTMLAttributes,
} from 'react';
import * as utils from './utils';
const VideoControls = dynamic(() => import('./VideoControls/VideoControls'), {
  ssr: false,
});
interface Captions
  extends DetailedHTMLProps<
    TrackHTMLAttributes<HTMLTrackElement>,
    HTMLTrackElement
  > {
  kind: 'captions';
}
interface Subtitles
  extends DetailedHTMLProps<
    TrackHTMLAttributes<HTMLTrackElement>,
    HTMLTrackElement
  > {
  kind: 'subtitles';
}

export interface VideoProps
  extends DetailedHTMLProps<
    VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  > {
  playsOnHover?: boolean;
  type?: string;
  captions?: Captions[];
  subtitles?: Subtitles[];
  preloadCopy?: string;
}

type RefType = HTMLVideoElement;

function BaseVideo(
  {
    playsInline = true,
    muted = true,
    src,
    captions,
    subtitles,
    poster,
    playsOnHover,
    autoPlay,
    children,
    type,
    controls,
    preloadCopy,
    ...videoProps
  }: VideoProps,
  ref: ForwardedRef<HTMLVideoElement>
) {
  const isMuted = autoPlay || muted;
  const thisRef = useRef<RefType>(null);
  const videoRef = ref ?? thisRef;
  const hoverTimerRef = useRef<NodeJS.Timeout>();

  const handleHover = () => {
    const playDelayTimer = setTimeout(() => {
      if (!utils.isMutableRefObject(videoRef)) return;
      const video = videoRef.current;
      utils.loadAndPlaysVideo(video);
    }, 300);

    hoverTimerRef.current = playDelayTimer;
  };

  const handleMouseOut = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    if (!utils.isMutableRefObject(videoRef)) return;
    const video = videoRef.current;
    utils.resetVideo(video);
  };

  useEffect(() => {
    if (!utils.isMutableRefObject(videoRef)) return;
    const video = videoRef.current;
    if (autoPlay && !playsOnHover) {
      utils.loadAndPlaysVideo(video);
    }
  }, [autoPlay, videoRef, playsOnHover]);

  return (
    <>
      {/*eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        poster={poster}
        {...videoProps}
        muted={isMuted}
        playsInline={playsInline}
        {...(playsOnHover
          ? { onMouseEnter: handleHover, onMouseLeave: handleMouseOut }
          : {})}
      >
        {captions?.map((caption) => (
          <track {...caption} kind='captions' key={caption.src} />
        ))}
        {subtitles?.map((subtitle) => (
          <track {...subtitle} kind='subtitles' key={subtitle.src} />
        ))}
        <source data-src={src} type={type} />
        {children}
      </video>
      {controls && (
        <VideoControls
          videoRef={videoRef as RefObject<HTMLVideoElement>}
          preloadCopy={preloadCopy}
        />
      )}
    </>
  );
}

export const Video = forwardRef<HTMLVideoElement, VideoProps>(BaseVideo);
