import { generateURLWithSearchParams } from '../../utils/route/generateURLWithSearchParams';
import { theme } from '../../styles';

const removeDuplicateEntries = (arr: unknown[]) => Array.from(new Set(arr));
const removePx = (str: string) => str.replace('px', '');

export const lottieExtensions = ['.lottie', '.json'];

export const generateSrcSet = ({
  src,
  params = {},
}: {
  src: string;
  params?: { w?: number; h?: number; fm?: string; mobileSrc?: string };
}): string => {
  const { mobileSrc, ...queryParams } = params;
  const viewports = Object.values(theme.viewports);

  // If the viewport is xs, we want to increase size of the image, so it can have a better quality
  const filterExtraSmallViewport = (viewport: (typeof viewports)[number]) =>
    viewport.token !== 'xs';

  const srcSet = viewports
    .filter(filterExtraSmallViewport)
    .map(({ token, value }) => {
      const size = Number(removePx(theme.gridMaxWidth[token].value));
      const viewportBp = Number(removePx(value));

      const getWidth = () => {
        if (queryParams?.w && queryParams.w < viewportBp) {
          return queryParams.w;
        }

        return size;
      };

      return (
        generateURLWithSearchParams({
          url: src,
          params: {
            ...queryParams,
            w: getWidth(),
          },
        }) + ` ${size}w`
      );
    });
  if (queryParams?.w) {
    srcSet.push(
      generateURLWithSearchParams({ url: src, params: queryParams }) +
        ` ${queryParams.w}w`
    );
  }

  const desktopSrcSet = removeDuplicateEntries(srcSet).join(', ');
  if (!mobileSrc) {
    return desktopSrcSet;
  }

  const mobileSrcSet = [
    theme.gridMaxWidth.small.value,
    theme.gridMaxWidth.medium.value,
  ].map((vp) => `${mobileSrc} ${removePx(vp)}w`);
  const [_dXs, _dSmall, ...usedDesktopSrcSet] = desktopSrcSet.split(',');

  return [...mobileSrcSet, ...usedDesktopSrcSet].join(',');
};

export const isMediaVideo = (src: string) =>
  ['.mp4', '.webm'].some((ext) => src.endsWith(ext));
