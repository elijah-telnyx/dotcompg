import { slugify } from 'ui/utils/slugify';
import api from 'lib/Api/Api';
import { mediaUrls } from 'lib/Strapi/documents';

export const getPhoneNumberHeroMedia = async ({
  state_code,
  country_code: _country_code,
  name,
}: {
  state_code?: string;
  country_code?: string;
  name: string;
}) => {
  const basePath = 'https://us-central-1.telnyxstorage.com/media-assets';
  const isState = Boolean(state_code);
  const strapiMediaUrl = mediaUrls.data.phoneNumbersMedia;

  const phoneNumbersMedia = await api.get<{
    state: Record<string, { video?: string; media?: string }>;
    country: Record<string, { video?: string; media?: string }>;
  }>(strapiMediaUrl);

  let path = '';
  let region;
  if (isState) {
    path = '_compressed_state';
    region = phoneNumbersMedia.state[slugify(name)];
  } else {
    path = '_compressed_country';
    region = phoneNumbersMedia.country[slugify(name)];
  }

  if (!region) {
    return undefined;
  }

  if (region.video) {
    return {
      src: `${basePath}/${path}/video/${region.video}`,
      type: 'video/webm',
      poster: region.media ? `${basePath}/${path}/image/${region.media}` : undefined,
      alt: `Hero video for ${name} virtual phone numbers`,
      useSrcSetGenerator: false,
      autoPlay: true,
      preload: true,
      muted: true,
      loop: true,
    };
  }

  return {
    src: `${basePath}/${path}/image/${region.media}`,
    alt: `Hero image for ${name} virtual phone numbers`,
    useSrcSetGenerator: false,
    preload: true,
  };
};
