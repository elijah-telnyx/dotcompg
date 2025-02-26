import * as css from './VideoWithNavigation.styled';

import { Fragment, useEffect, useId, useRef, useState, type AnimationEventHandler } from 'react';

import type { Data } from '../constants';
import { isMobileIOSUserAgent } from 'ui/utils/isMobileUserAgent';

export interface VideoWithNavigationProps extends Data {
  isActive: boolean;
  preload: boolean;
}

const VideoWithNavigation = ({
  asset,
  timestampsData,
  exploreHref,
  isActive = false,
  preload,
}: VideoWithNavigationProps) => {
  const [currentTimestampBlock, setCurrentTimestampBlock] = useState(0);
  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  const [canLoadVideo, setCanLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const handleTimestampClick = ({ blockIndex, timestampIndex }: { blockIndex: number; timestampIndex: number }) => {
    setCurrentTimestamp(timestampIndex);
    setCurrentTimestampBlock(blockIndex);
  };

  const canPlayVideoRef = useRef(false);

  useEffect(() => {
    const isIOSMobile = isMobileIOSUserAgent(navigator.userAgent);
    const video = videoRef.current;

    canPlayVideoRef.current = !isIOSMobile && Boolean(video);

    setCanLoadVideo(canPlayVideoRef.current);
  }, []);

  useEffect(() => {
    if (!canPlayVideoRef.current) return;
    const video = videoRef.current as HTMLVideoElement;
    const timestamp = timestampsData[currentTimestampBlock].timestamps[currentTimestamp];
    video.currentTime = timestamp.start;
    video.play();
  }, [currentTimestampBlock, currentTimestamp]);

  useEffect(() => {
    if (!canPlayVideoRef.current) return;

    const video = videoRef.current as HTMLVideoElement;

    if (isActive) {
      video.currentTime = 0;
      setCurrentTimestampBlock(0);
      setCurrentTimestamp(0);
      video.play();
    } else {
      video.pause();
    }
  }, [isActive]);

  const onEndOfTimestamp = (timestampIndex: number) => {
    // go to next timestamp
    let nextTimestampIndex = timestampIndex + 1;
    const timestampBlock = timestampsData[currentTimestampBlock];

    // go back to initial timestamp if is the last one
    if (nextTimestampIndex >= timestampBlock?.timestamps.length) {
      nextTimestampIndex = 0;

      // if multiple timestamps blocks
      if (timestampsData.length > 1) {
        // go to next timestamp block
        let nextTimestampBlock = currentTimestampBlock + 1;
        // go back to initial block if is the last one
        if (nextTimestampBlock >= timestampsData.length) {
          nextTimestampBlock = 0;
        }
        setCurrentTimestampBlock(nextTimestampBlock);
      }
    }

    setCurrentTimestamp(nextTimestampIndex);
  };

  return (
    <css.Wrapper isActive={isActive}>
      {Array.isArray(asset) ? (
        <css.MultipleVideoWrapper>
          {asset.map(({ video, poster, mobile, alt }, blockIndex) => {
            return (
              <Fragment key={video}>
                {mobile && (
                  <css.Video
                    as='img'
                    src={mobile}
                    alt={alt}
                    mobile
                    loading={preload ? 'eager' : 'lazy'}
                    key={isActive + '-mobile'}
                  />
                )}
                <css.Video
                  desktop
                  poster={poster}
                  autoPlay
                  muted
                  playsInline
                  isActive={blockIndex === currentTimestampBlock}
                  ref={blockIndex === currentTimestampBlock ? videoRef : null}
                  preload={preload ? 'metadata' : 'none'}
                >
                  {canLoadVideo && <source src={video} type='video/webm' />}
                </css.Video>
              </Fragment>
            );
          })}
        </css.MultipleVideoWrapper>
      ) : (
        <css.VideoWrapper>
          {asset.mobile?.endsWith('webm') ? (
            <css.Video
              autoPlay
              muted
              playsInline
              ref={videoRef}
              isActive
              poster={asset.poster}
              preload={preload ? 'metadata' : 'none'}
              mobile
            >
              <source src={asset.mobile} type='video/webm' />
            </css.Video>
          ) : (
            <css.Video
              as='img'
              src={asset.mobile}
              alt={asset.alt}
              mobile
              loading={preload ? 'eager' : 'lazy'}
              key={isActive + '-mobile'}
            />
          )}

          <css.Video
            autoPlay
            muted
            playsInline
            ref={videoRef}
            isActive
            poster={asset.poster}
            preload={preload ? 'metadata' : 'none'}
            desktop
          >
            {canLoadVideo && <source src={asset.video} type='video/webm' />}
          </css.Video>
        </css.VideoWrapper>
      )}

      <css.TimeStampContainerWrapper
        key={isActive + 'container' + exploreHref}
        css={{
          ...(timestampsData.length > 1
            ? {
                gridTemplateColumns: `1fr auto 1fr auto`,
              }
            : {
                gridTemplateColumns: `1fr auto`,
              }),
        }}
      >
        {timestampsData.map((timestampData, blockIndex) => {
          return (
            <Fragment key={blockIndex}>
              {/* Add divider when it has multiple timestamps blocks and it is the first item of other blocks but the first one */}
              {blockIndex > 0 && <css.Divider shouldAdaptToCopy={Boolean(timestampData.copy)} />}
              <css.TimeStampContainer>
                {timestampData.timestamps.map((timestamp, timestampIndex) => {
                  return (
                    <TimeStamp
                      key={timestamp.label}
                      {...timestamp}
                      onClick={() => handleTimestampClick({ blockIndex, timestampIndex })}
                      shouldAnimate={
                        isActive && currentTimestampBlock === blockIndex && currentTimestamp === timestampIndex
                      }
                      onFinish={() => onEndOfTimestamp(timestampIndex)}
                    />
                  );
                })}

                {timestampData.copy && <css.TimestampCopy>{timestampData.copy}</css.TimestampCopy>}
              </css.TimeStampContainer>
            </Fragment>
          );
        })}

        <css.CTA text='Explore' type='button' href={exploreHref} />
      </css.TimeStampContainerWrapper>
    </css.Wrapper>
  );
};

type ButtonAttributes = JSX.IntrinsicElements['button'];
interface TimeStampProps extends ButtonAttributes {
  label: string;
  onFinish: AnimationEventHandler<HTMLSpanElement>;
  shouldAnimate: boolean;
  start: number;
  end: number;
}

const TimeStamp = ({ onClick, label, onFinish, start, end, shouldAnimate }: TimeStampProps) => {
  const id = useId();

  return (
    <css.TimeStamp onClick={onClick} aria-labelledby={id}>
      <css.Tooltip id={id}>
        <css.TooltipContent>{label}</css.TooltipContent>
      </css.Tooltip>
      <css.ProgressBar>
        <css.Progress
          onAnimationEnd={onFinish}
          animate={shouldAnimate}
          css={{
            animationDuration: end - start + 's',
          }}
        ></css.Progress>
      </css.ProgressBar>
    </css.TimeStamp>
  );
};

export default VideoWithNavigation;
