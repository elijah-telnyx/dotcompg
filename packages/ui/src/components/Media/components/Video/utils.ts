import type { MutableRefObject, Ref } from 'react';

enum LOAD_STATE {
  NOT_LOADED,
  ALREADY_LOADED,
  LOADED,
}

export const loadVideo = (video: HTMLVideoElement): LOAD_STATE => {
  const source = video.querySelector('source');
  if (!source) return LOAD_STATE.NOT_LOADED;

  // already have src set
  const currentSrc = source.getAttribute('src');
  if (currentSrc) {
    return LOAD_STATE.ALREADY_LOADED;
  }

  // set src and loads the video
  const dataSrc = source.getAttribute('data-src');
  if (!dataSrc) return LOAD_STATE.NOT_LOADED;

  source.setAttribute('src', dataSrc);
  return LOAD_STATE.LOADED;
};

export const resetVideo = (video: HTMLVideoElement) => {
  video.load();
};

export const loadAndPlaysVideo = (video: HTMLVideoElement) => {
  const loadState = loadVideo(video);

  switch (loadState) {
    case LOAD_STATE.NOT_LOADED:
      return;

    case LOAD_STATE.ALREADY_LOADED:
      playVideo(video);
      return;

    case LOAD_STATE.LOADED:
      video.load();
      playVideo(video);
  }
};

const playVideo = (video: HTMLVideoElement) => {
  if (video.paused) {
    // prevent error when video is unmounted
    video
      .play()
      .catch((error) => console.log('Error playing the video', error));
  }
};

export const isMutableRefObject = (
  ref: Ref<HTMLVideoElement>
): ref is MutableRefObject<HTMLVideoElement> => {
  if (!ref) return false;
  return 'current' in ref;
};
