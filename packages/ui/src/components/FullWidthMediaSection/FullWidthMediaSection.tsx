import { useRef } from 'react';
import { styled } from '../../styles';

import { Video, type VideoProps } from '../Media/components/Video';

export interface FullWidthMediaSectionProps {
  heading?: string;
  media: VideoProps;
}

const MediaWrapper = styled('div', {
  position: 'relative',
  zIndex: 1,
  width: '100%',
  '& video': {
    maxWidth: '100vw',
    maxHeight: '95vh',
    width: '100%',
    height: 'auto',
    aspectRatio: '16/9',
  },
});

const Section = styled('section', {
  position: 'relative',
});

export default function FullWidthMediaSection({
  heading,
  media,
}: FullWidthMediaSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <Section>
      <MediaWrapper>
        <Video
          {...media}
          ref={videoRef}
          controls
          preloadCopy={heading}
          playsInline
        />
      </MediaWrapper>
    </Section>
  );
}
