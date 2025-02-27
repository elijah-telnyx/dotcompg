import type {
  ImgHTMLAttributes,
  SourceHTMLAttributes,
  VideoHTMLAttributes,
} from 'react';
import type { BaseProps } from '../Typography/utils';
import Caption from '../Typography/Caption';
import { forwardRef, type ForwardedRef } from 'react';
import { theme } from '../../styles';
import Head from 'next/head';
import { generateSrcSet, isMediaVideo, lottieExtensions } from './utils';
import useMedia from '../../utils/hooks/useMedia';
import { generateURLWithSearchParams } from '../../utils/route/generateURLWithSearchParams';
import { MediaDotLottie, type MediaDotLottieProps } from './MediaDotLottie';
import clsx from 'clsx';

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
  alt: MediaProps<'img'>['alt'];
  type?: SourceHTMLAttributes<HTMLSourceElement>['type'];
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
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  useExplicitDimensions?: boolean;
  size?: number;
  fill?: boolean;
  fillRight?: boolean;
  cover?: MediaResponsiveFlag;
  contain?: MediaResponsiveFlag;
  preload?: boolean;
  fm?: 'webp' | 'png' | 'jpg' | 'avif';
  q?: 10 | 25 | 50 | 75 | 100;
  placeholderMedia?: MediaProps<'img'>;
  className?: string;
  useSrcSetGenerator?: boolean;
  sizes?: string;
  mobileSrc?: string;
}

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
      | 'className'
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

export const MediaSVG = ({ alt, dark, svg, className }: MediaSVGProps) => (
  <div className={clsx('media-wrapper', className)} aria-label={alt}>
    <div
      className={clsx('media-content', {
        'text-gray-hover-dark': dark,
      })}
      dangerouslySetInnerHTML={{ __html: String(svg || '') }}
    />
  </div>
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
  className,
  fill,
  fillRight,
  cover,
  contain,
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
            rel="preload"
            as="image"
            href={defaultSrc}
            imageSrcSet={srcSet}
            imageSizes={sizes}
          />
        </Head>
      )}
      <img
        {...props}
        className={clsx(
          'w-full',
          {
            'absolute inset-y-0 right-0 h-full': fillRight,
            'absolute inset-0 h-full w-full text-transparent': fill,
            'object-cover': cover,
            'object-contain': contain,
          },
          className
        )}
        srcSet={srcSet}
        src={defaultSrc}
        alt={alt}
        loading={loading || preload ? 'eager' : 'lazy'}
        sizes={sizes}
      />
      {caption && (
        <Caption className="text-gray-hover-light mt-small">
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
  className,
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
            rel="preload"
            as="image"
            href={defaultSrc}
            imageSrcSet={srcSet}
            imageSizes={sizes}
          />
        </Head>
      )}
      <img
        {...props}
        className={clsx('w-full h-auto', className)}
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
    playsOnHover,
    className,
    fill,
    cover,
    contain,
    ...props
  }: MediaVideoProps,
  ref: ForwardedRef<HTMLVideoElement>
) => {
  const isMediumViewport = useMedia('(min-width: 768px)');
  if (noVideoOnMobile && !isMediumViewport && placeholderMedia?.src) {
    return (
      <>
        {preload && (
          <Head>
            <link rel="preload" as="image" href={placeholderMedia.src} />
          </Head>
        )}
        <img
          {...placeholderMedia}
          className={clsx('w-full', className)}
          loading={loading || preload ? 'eager' : 'lazy'}
        />
      </>
    );
  }

  const posterImage = poster || placeholderMedia?.src;

  return (
    <div
      className={clsx(
        'relative',
        {
          'w-full h-full bg-cover': playsOnHover,
        },
        className
      )}
      style={playsOnHover ? { backgroundImage: `url(${posterImage})` } : undefined}
    >
      <video
        ref={ref}
        aria-describedby={`posteralt-${alt}`}
        {...props}
        {...(props.autoPlay && { playsInline: true })}
        className={clsx({
          'absolute inset-0 h-full w-full': fill,
          'object-cover': cover,
          'object-contain': contain,
          'transition-opacity duration-300 delay-300 opacity-0 hover:opacity-100':
            playsOnHover,
        })}
        src={src}
        preload={preload ? 'metadata' : 'none'}
        muted
        poster={posterImage}
      >
        <Caption id={`posteralt-${alt}`}>{alt}</Caption>
      </video>
    </div>
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
        type="video/mp4"
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