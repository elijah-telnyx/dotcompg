import type {
  ImgHTMLAttributes,
  SourceHTMLAttributes,
  VideoHTMLAttributes,
} from 'react';
import type { ThemedCSS } from '../../styles/config/stitches.config';
import type { BaseProps } from '../Typography/utils';
import Caption from '../Typography/Caption';
import { forwardRef, type ForwardedRef } from 'react';
import { config, theme } from '../../styles';
import * as css from './Media.styled';
import Head from 'next/head';
import { generateSrcSet, isMediaVideo, lottieExtensions } from './utils';
import useMedia from '../../utils/hooks/useMedia';
import { generateURLWithSearchParams } from '../../utils/route/generateURLWithSearchParams';
import { MediaDotLottie, type MediaDotLottieProps } from './MediaDotLottie';

const DEFAULT_IMAGE_MAX_WIDTH = Number(
  theme.gridMaxWidth.xl.value.replace('px', '')
);

// care about xs viewport cause it's the target for mobile devices
const DEFAULT_IMAGE_SIZES = `@media (max-width: ${theme.viewports.xs.value}) ${theme.gridMaxWidth.small.value}, 50vw`;

type MediaResponsiveFlag =
  | boolean
  | 'true'
  | {
      '@xs'?: boolean | 'true' | undefined;
      '@small'?: boolean | 'true' | undefined;
      '@medium'?: boolean | 'true' | undefined;
      '@large'?: boolean | 'true' | undefined;
      '@xl'?: boolean | 'true' | undefined;
      '@initial'?: boolean | 'true' | undefined;
    };

export interface MediaSVGProps extends BaseProps {
  src: MediaProps<'img'>['src'];
  alt: MediaProps<'img'>['alt'];
  svg?: string;
}
export interface MediaVideoProps
  extends Omit<
    VideoHTMLAttributes<HTMLVideoElement>,
    'mute' | 'preload' | 'alt'
  > {
  src: MediaProps<'img'>['src'];
  /**
   * https://www.w3.org/WAI/PF/HTML/wiki/Media_Alt_Technologies
   */
  alt: MediaProps<'img'>['alt'];
  /**
   * video format. default to "video/mp4"
   */
  type?: SourceHTMLAttributes<HTMLSourceElement>['type'];
  /**
   * if not provided, fallback to first video frame
   */
  placeholderMedia?: MediaProps<'img'>;
  preload?: MediaProps<'img'>['preload'];
  loading?: MediaProps<'img'>['loading'];
  fill?: MediaProps<'img'>['fill'];
  cover?: MediaProps<'img'>['cover'];
  contain?: MediaProps<'img'>['contain'];
  noVideoOnMobile?: boolean;
  playsOnHover?: boolean;
}

type MediaType = 'svg' | 'img' | 'mp4' | 'media' | 'lottie';

export interface MediaImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  /**
   * This will be used for screen readers
   */
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  useExplicitDimensions?: boolean;
  size?: number;
  /**
   * https://nextjs.org/docs/api-reference/next/image#fill
   */
  fill?: boolean;
  /**
   * This sets position absolute to right to overflow the parent container.
   */
  fillRight?: boolean;
  /**
   * This sets `object-fit: "cover"` will cause the image to fill the entire container and be cropped to preserve aspect ratio.
   * https://nextjs.org/docs/api-reference/next/image#fill
   */
  cover?: MediaResponsiveFlag;
  /**
   * The default image fit behavior will stretch the image to fit the container.
   * This sets `object-fit: "contain"` for an image which is letterboxed to fit the container and preserve aspect ratio.
   * https://nextjs.org/docs/api-reference/next/image#fill
   */
  contain?: MediaResponsiveFlag;
  /**
   * - https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload#including_media
   * - https://web.dev/preload-responsive-images/
   */
  preload?: boolean;
  /**
   * image format.
   */
  fm?: 'webp' | 'png' | 'jpg' | 'avif';
  /**
   * image quality.
   */
  q?: 10 | 25 | 50 | 75 | 100;
  /**
   * If the browser don't support video or the video fails to load, this will be shown
   * Used as poster if no poster is provided
   */
  placeholderMedia?: MediaProps<'img'>;
  css?: ThemedCSS;
  useSrcSetGenerator?: boolean;
  sizes?: string;
  mobileSrc?: string;
}

// https://github.com/microsoft/TypeScript/issues/16936
export interface MediaGenericProps
  extends Pick<
      MediaImageProps,
      | 'src'
      | 'alt'
      | 'width'
      | 'height'
      | 'size'
      | 'fill'
      | 'fillRight'
      | 'cover'
      | 'contain'
      | 'preload'
      | 'loading'
      | 'fm'
      | 'q'
      | 'placeholderMedia'
      | 'useExplicitDimensions'
      | 'mobileSrc'
      | 'css'
      | 'srcSet'
      | 'useSrcSetGenerator'
    >,
    Pick<
      MediaVideoProps,
      | 'type'
      | 'autoPlay'
      | 'playsOnHover'
      | 'controls'
      | 'disablePictureInPicture'
      | 'disableRemotePlayback'
      | 'loop'
      | 'muted'
      | 'playsInline'
    >,
    Pick<MediaSVGProps, 'svg' | 'dark'> {
  poster?: { src: string };
  noVideoOnMobile?: boolean;
  renderSvg?: boolean;
  externalMediaLink?: string;
}

export type MediaProps<T extends MediaType> = T extends 'img'
  ? MediaImageProps
  : T extends 'mp4'
  ? MediaVideoProps
  : T extends 'svg'
  ? MediaSVGProps
  : T extends 'lottie'
  ? MediaDotLottieProps
  : MediaGenericProps;

/**
 * MediaSVG Inline component
 * @returns rendered SVG inlined and wrapped in a `<div>` container
 */
export const MediaSVG = ({ alt, dark, svg }: MediaSVGProps) => (
  <css.SVG label={alt}>
    <css.Text
      dark={dark}
      dangerouslySetInnerHTML={{ __html: String(svg || '') }}
    />
  </css.SVG>
);

export const MediaImage = ({
  src,
  alt,
  width,
  height,
  preload,
  loading,
  fm,
  q,
  useSrcSetGenerator = true,
  sizes = DEFAULT_IMAGE_SIZES,
  mobileSrc,
  caption,
  ...props
}: MediaImageProps) => {
  const params = {
    fm,
    w: width || DEFAULT_IMAGE_MAX_WIDTH,
    h: height,
    q,
    mobileSrc,
  };

  const defaultSrc = useSrcSetGenerator
    ? generateURLWithSearchParams({
        url: src,
        params,
      })
    : src;
  const srcSet = useSrcSetGenerator
    ? generateSrcSet({
        src,
        params,
      })
    : props.srcSet;

  return (
    <>
      {preload && (
        <Head>
          <link
            rel='preload'
            as='image'
            href={defaultSrc}
            imageSrcSet={srcSet}
            imageSizes={sizes}
          />
        </Head>
      )}
      <css.SrcSetImage
        {...props}
        srcSet={srcSet}
        src={defaultSrc}
        alt={alt}
        loading={loading || preload ? 'eager' : 'lazy'}
        sizes={sizes}
      />
      {caption && (
        <Caption
          css={{ color: '$grayHoverLightBackground', marginTop: '$small' }}
        >
          {caption}
        </Caption>
      )}
    </>
  );
};

export const ProductHeroImage = ({
  src,
  alt,
  width,
  height,
  preload,
  loading,
  fm,
  q,
  useSrcSetGenerator = true,
  sizes = DEFAULT_IMAGE_SIZES,
  mobileSrc,
  ...props
}: MediaImageProps) => {
  const params = {
    fm,
    w: width || DEFAULT_IMAGE_MAX_WIDTH,
    h: height,
    q,
    mobileSrc,
  };

  const defaultSrc = useSrcSetGenerator
    ? generateURLWithSearchParams({
        url: src,
        params,
      })
    : src;
  const srcSet = useSrcSetGenerator
    ? generateSrcSet({
        src,
        params,
      })
    : props.srcSet;

  return (
    <>
      {preload && (
        <Head>
          <link
            rel='preload'
            as='image'
            href={defaultSrc}
            imageSrcSet={srcSet}
            imageSizes={sizes}
          />
        </Head>
      )}
      <css.ProductHeroImage
        {...props}
        srcSet={srcSet}
        src={defaultSrc}
        width={width}
        height={height}
        alt={alt}
        loading={loading || preload ? 'eager' : 'lazy'}
        sizes={sizes}
      />
    </>
  );
};

const MediaVideoMuted = (
  {
    src,
    alt,
    placeholderMedia,
    preload,
    loading,
    poster,
    noVideoOnMobile,
    ...props
  }: MediaVideoProps,
  ref: ForwardedRef<HTMLVideoElement>
) => {
  const isMediumViewport = useMedia(config.media.medium);
  if (noVideoOnMobile && !isMediumViewport && placeholderMedia?.src) {
    return (
      <>
        {preload && (
          <Head>
            <link rel='preload' as='image' href={placeholderMedia.src} />
          </Head>
        )}
        <css.Image
          {...placeholderMedia}
          loading={loading || preload ? 'eager' : 'lazy'}
        />
      </>
    );
  }

  const posterImage = poster || placeholderMedia?.src;

  return (
    <css.VideoWrapper
      css={
        props.playsOnHover
          ? { backgroundImage: `url(${posterImage})` }
          : undefined
      }
      playsOnHover={props.playsOnHover}
    >
      <css.Video
        ref={ref}
        aria-describedby={`posteralt-${alt}`}
        {...props}
        {...(props.autoPlay && { playsInline: true })}
        src={src}
        preload={preload ? 'metadata' : 'none'}
        muted
        poster={posterImage}
      >
        <Caption id={`posteralt-${alt}`}>{alt}</Caption>
      </css.Video>
    </css.VideoWrapper>
  );
};

export const MediaVideo = forwardRef<HTMLVideoElement, MediaVideoProps>(
  MediaVideoMuted
);

const Media = ({
  placeholderMedia,
  poster,
  renderSvg,
  svg,
  ...props
}: MediaProps<'media'>) => {
  if (lottieExtensions.some((extension) => props.src?.endsWith(extension))) {
    return <MediaDotLottie {...props} />;
  }

  if ((props.src?.endsWith('.svg') || svg) && renderSvg) {
    return <MediaSVG {...props} svg={svg} />;
  }

  if (isMediaVideo(props.src)) {
    return (
      <MediaVideo
        type='video/mp4'
        {...props}
        poster={poster?.src}
        placeholderMedia={placeholderMedia}
      />
    );
  }

  if (props.useExplicitDimensions) return <ProductHeroImage {...props} />;

  return <MediaImage {...props} />;
};

export default Media;
