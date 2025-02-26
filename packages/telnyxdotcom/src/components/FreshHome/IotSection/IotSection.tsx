import { useEffect, useRef, useState } from 'react';
import type { SectionProps } from 'ui/components/Section';
import { type CTAButtonProps } from 'ui/components/CtaButton';
import SectionHeader from 'ui/components/Section/SectionHeader';
import { isMobileIOSUserAgent } from 'ui/utils/isMobileUserAgent';

import { isDarkBackgroundColor } from 'ui/styles/constants/backgroundColorOptions';
import * as css from './IotSection.styled';

export interface IotSectionProps extends SectionProps {
  tagline: string;
  heading: string;
  copy: string;

  cta: CTAButtonProps;
  asset: {
    video: string;
    poster: string;
    mobile: string;
    alt: string;
  };
}

export const IotSection = ({ tagline, heading, copy, cta, asset, ...props }: IotSectionProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canPlayVideoRef = useRef(false);
  const [canLoadVideo, setCanLoadVideo] = useState(false);

  useEffect(() => {
    const isIOSMobile = isMobileIOSUserAgent(navigator.userAgent);
    const video = videoRef.current;

    canPlayVideoRef.current = !isIOSMobile && Boolean(video);

    setCanLoadVideo(canPlayVideoRef.current);
  }, []);

  useEffect(() => {
    if (!canPlayVideoRef.current) return;
    const video = videoRef.current as HTMLVideoElement;

    video.currentTime = 0;
    video.play();
  }, []);

  const isDark = isDarkBackgroundColor(props.backgroundColor);

  return (
    <css.Section {...props}>
      <css.Wrapper>
        <css.VideoWrapper>
          {asset.mobile?.endsWith('webm') ? (
            <css.Video
              autoPlay
              muted
              playsInline
              loop
              ref={videoRef}
              isActive
              poster={asset.poster}
              preload='none'
              mobile
            >
              <source src={asset.mobile} type='video/webm' />
            </css.Video>
          ) : (
            <css.Video as='img' src={asset.mobile} alt={asset.alt} mobile loading='lazy' />
          )}

          <css.Video
            autoPlay
            muted
            playsInline
            loop
            ref={videoRef}
            isActive
            poster={asset.poster}
            preload='none'
            desktop
          >
            {canLoadVideo && <source src={asset.video} type='video/webm' />}
          </css.Video>
        </css.VideoWrapper>

        <css.HeaderWrapper>
          <SectionHeader tagline={tagline} heading={heading} copy={copy} cta={cta} isDark={isDark} variant='center' />
        </css.HeaderWrapper>
      </css.Wrapper>
    </css.Section>
  );
};

export default IotSection;
