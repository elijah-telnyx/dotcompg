export const rcPost = 'rcPost';

// If a section need external data, add the section type here
export const asyncSectionTypes = {} as const;

// Define the inline type for media with sys.id
export type MediaWithSysId = {
  media?: {
    sys: {
      id: string;
    };
  };
};

export type MediaPropsForCarousel = {
  src: string;
  alt: string;
  height: number;
  width: number;
};
