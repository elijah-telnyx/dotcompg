/**
 * documentIds for Strapi entries
 */
export const ids = {
  'section-cta-banner': 'zjaenluhn8qc1slvhryug8gm',
};

type MediaFolder = 'data' | 'videos' | 'API Uploads';
type Link = string;

// media urls for Strapi entries
export const mediaUrls: Record<MediaFolder, Record<string, Link>> = {
  data: {
    phoneNumbersMedia: 'https://pleasant-sunrise-e14682326c.media.strapiapp.com/phone_numbers_media_1df046b18b.json',
  },
  videos: {},
  'API Uploads': {},
};
