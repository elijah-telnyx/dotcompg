import type { MediaProps } from 'ui/components/Media';

export function removeEndSlash(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

export function removeLastPathSegment(url: string): string {
  const parts = url.split('/');
  return parts.slice(0, -1).join('/');
}

export function removeLocale(url: string, locale?: string): string {
  if (locale) {
    return removeLastPathSegment(url);
  }

  return removeEndSlash(url);
}

export function getCanonicalUrl(url: string, relevantSearchParams?: string[] | undefined): string {
  const webUrl = new URL(url);

  if (webUrl.hash) {
    webUrl.hash = '';
  }

  if (webUrl.search) {
    // https://webmasters.stackexchange.com/questions/114622/should-query-strings-be-included-or-removed-from-the-canonical-tag
    if (relevantSearchParams) {
      Array.from(webUrl.searchParams.entries()).forEach(([key]) => {
        if (!relevantSearchParams.includes(key)) {
          webUrl.searchParams.delete(key);
        }
      });
    } else {
      webUrl.search = '';
    }
  }

  return webUrl.toString();
}

type fit =
  // Resize the image to the specified dimensions, padding the image if needed.
  | 'pad'
  // Resize the image to the specified dimensions, cropping the image if needed.
  | 'fill'
  // Resize the image to the specified dimensions, changing the original aspect ratio if needed.
  | 'scale'
  // Crop a part of the original image to fit into the specified dimensions.
  | 'crop'
  // Create a thumbnail from the image.
  | 'thumb';

export function formatImage(
  image?: MediaProps<'img'>,
  options: { width?: number; height?: number; fit?: fit; focus?: 'center' | 'top' | 'right' | 'left' | 'bottom' } = {}
) {
  if (!image) return;

  const fit = options.fit && `fit=${options.fit}`;
  const width = options.width && `w=${options.width}`;
  const height = options.height && `h=${options.height}`;
  const focus = options.focus && `f=${options.focus}`;
  const query = [fit, width, height, focus].reduce((query, value) => {
    if (value) {
      const prefix = query === '' ? '?' : '&';
      query += prefix + value;
    }
    return query;
  }, '');

  const imgWithQuery = image?.src + query;
  const src = image?.src?.startsWith('https') ? imgWithQuery : 'https:' + imgWithQuery;

  return {
    ...image,
    src,
    width: options?.width || image.width,
    height: options?.height || image.height,
  };
}
