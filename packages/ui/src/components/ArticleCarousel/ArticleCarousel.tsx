import GliderComponent from 'react-glider';
import { styled } from '../../styles';
import Media from '../Media';
import Caption from '../Typography/Caption';
import type { MediaImageProps } from '../Media/Media';

interface ArticleCarouselItem {
  description: string;
  media: MediaImageProps;
}

const Wrapper = styled('div', {
  // remove scrollbar
  '& .glider': {
    scrollbarColor: 'unset',
    scrollbarGutter: 'unset',
    scrollbarWidth: 'none',

    '&::-webkit-scrollbar': {
      display: 'none',
    },

    '&::-webkit-scrollbar-corner': {
      display: 'none',
    },

    '&::-webkit-scrollbar-thumb': {
      display: 'none',
    },

    '&::-webkit-scrollbar-track': {
      display: 'none',
    },
  },

  '& .glider-dots': {
    marginTop: '$large',
  },
  '& .glider-dot': {
    backgroundColor: '$tan',
    '&.active': {
      backgroundColor: '$black',
    },
  },
  '@lessThanSmall': {
    '& .glider-dots': {
      justifyContent: 'start',
    },
  },
  '@medium': {
    '& .glider-dots': {
      marginTop: '$xl',
    },
  },
});
const Item = styled('div', {
  borderRadius: '$large',
});

const ItemDescription = styled(Caption, {
  marginTop: '$small',
  color: '$grayHoverLightBackground',
});

const ItemMedia = styled(Media, {
  aspectRatio: '16/9',
  borderRadius: '$large',
});

export interface ArticleCarouselProps {
  items: ArticleCarouselItem[];
}

const ArticleCarousel = ({ items }: ArticleCarouselProps) => {
  return (
    <GliderComponent
      draggable
      slidesToScroll={1}
      slidesToShow={1}
      hasDots
      scrollLock
      containerElement={Wrapper}
    >
      {items.map(({ description, media }) => (
        <Item key={description}>
          <ItemMedia {...media} />
          <ItemDescription>{description}</ItemDescription>
        </Item>
      ))}
    </GliderComponent>
  );
};

export default ArticleCarousel;
