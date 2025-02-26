import dynamic from 'next/dynamic';
import { ParallaxProvider } from 'react-scroll-parallax';

import {
  isDarkBackgroundColor,
  type BackgroundColor,
} from '../../styles/constants/backgroundColorOptions';
import Author, { type AuthorProps } from '../Author';
import type { AuthorCardProps } from '../AuthorCard';
import CtaButton, { type CTAButtonProps } from '../CtaButton';
import Grid, { type GridItemProps } from '../Grid';
import type { MediaProps } from '../Media';
import type { SectionProps } from '../Section';
import Tagline from '../Tagline';
import Caption from '../Typography/Caption';
import Heading from '../Typography/Heading';
import * as css from './ComposableArticleHero.styled';
import { createContext, useContext, useEffect, useState } from 'react';
import Media from '../Media';

const LoadingContext = createContext<{
  isLoaded: boolean;
  setIsLoaded: (isLoaded: boolean) => void;
}>({
  isLoaded: false,
  setIsLoaded: () => {
    return;
  },
});

const ParallaxBanner = dynamic(
  () => import('react-scroll-parallax').then((mod) => mod.ParallaxBanner),
  {
    ssr: false,
    loading: function Loading() {
      const { setIsLoaded } = useContext(LoadingContext);
      useEffect(() => {
        setIsLoaded(true);
      }, []);
      return null;
    },
  }
);

const articleColumns: GridItemProps = {
  xs: 4,
  small: 8,
  medium: 12,
};

/**
 * `spacingBottom` is dynamically calculated based on `media` and the immediate next section
 */
export interface ComposableArticleHeroProps
  extends Omit<SectionProps, 'spacingBottom'> {
  media?: MediaProps<'media'>;
  breadcrumbLink: CTAButtonProps;
  tagline?: string;
  heading: string;
  copy: string;
  author: Pick<AuthorCardProps, 'id' | 'copy' | 'icon'> &
    Pick<AuthorProps, 'linkedin'>;
  authorLinkHref: AuthorProps['linkHref'];
  isEditor?: boolean;
  backgroundColor?: BackgroundColor;
  updatedAt: string;
  topic?: {
    name: string;
    color?: BackgroundColor;
  };
  useParallax?: boolean;
}

const ComposableArticleHero = ({
  breadcrumbLink,
  tagline,
  heading,
  copy,
  author,
  authorLinkHref,
  media,
  backgroundColor,
  updatedAt,
  topic,
  isEditor,
  useParallax = false,
  ...props
}: ComposableArticleHeroProps) => {
  const isDark = isDarkBackgroundColor(backgroundColor);
  const updatedAtDate = updatedAt
    ? // using en-Gb because the design specifies the date is formatted like dd/mmm/yyyy while the US is mmm/dd/yyyy
      new Date(updatedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : undefined;

  const [isParallaxLoaded, setIsParallaxLoaded] = useState(false);

  return (
    <ParallaxProvider>
      <LoadingContext.Provider
        value={{ isLoaded: isParallaxLoaded, setIsLoaded: setIsParallaxLoaded }}
      >
        <css.SectionWrapper
          backgroundColor={backgroundColor || 'tan'}
          {...props}
          spacingBottom='continuous'
          hasMedia={!!media}
          useParallax={useParallax}
          // it must be a div to preserve the h1 being a child of the article element
          htmlAs='div'
        >
          <css.ContainerExtended>
            <css.BreadcrumbItem {...articleColumns}>
              <CtaButton {...breadcrumbLink} />
            </css.BreadcrumbItem>

            <css.TagItem {...articleColumns}>
              {topic && (
                <Tagline
                  color={topic.color}
                  isDark={isDark}
                  variants={{ mobileTypography: true }}
                >
                  {topic.name}
                </Tagline>
              )}
              {updatedAtDate && (
                <Caption dark={isDark}>Last updated {updatedAtDate}</Caption>
              )}
            </css.TagItem>

            <Grid.Item {...articleColumns}>
              <Heading
                level={1}
                dark={isDark}
                css={{
                  textWrap: 'balance',
                }}
              >
                {heading}
              </Heading>
            </Grid.Item>
            <Grid.Item {...articleColumns}>
              <css.AuthorWrapper isDark={isDark}>
                <Author
                  linkHref={authorLinkHref}
                  linkedin={author.linkedin}
                  name={author.copy}
                  media={author.icon}
                  isEditor={isEditor}
                />
              </css.AuthorWrapper>
            </Grid.Item>
            {media && (
              <css.MediaItem xs={4} small={8} medium={12}>
                <css.HeroMediaWrapper useParallax={useParallax}>
                  <css.PreloadMediaParallax>
                    <Media {...media} preload />
                  </css.PreloadMediaParallax>

                  {useParallax && (
                    <ParallaxBanner
                      className='parallax-banner'
                      layers={[
                        {
                          image: media.src,
                          speed: 10,
                          shouldAlwaysCompleteAnimation: true,
                        },
                      ]}
                    />
                  )}
                </css.HeroMediaWrapper>
              </css.MediaItem>
            )}
          </css.ContainerExtended>
        </css.SectionWrapper>
      </LoadingContext.Provider>
    </ParallaxProvider>
  );
};

export default ComposableArticleHero;
