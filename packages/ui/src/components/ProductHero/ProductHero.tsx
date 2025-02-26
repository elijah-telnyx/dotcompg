import { isDarkBackgroundColor } from '../../styles/constants/backgroundColorOptions';
import CtaButton, { type CTAButtonProps } from '../CtaButton';
import Grid from '../Grid';
import Link from '../Link/Link';
import Markdown from '../Markdown';
import type { MediaProps } from '../Media';
import type { SectionProps } from '../Section';
import Tagline from '../Tagline';
import CTA from '../Typography/CTA';
import * as css from './ProductHero.styled';

interface Channel {
  href: string;
  id: string;
  value: string;
}

export interface ProductHeroProps extends SectionProps {
  heading: string;
  copy?: string;
  ctaButtons?: CTAButtonProps[];
  media?: MediaProps<'media'>;
  tagline?: string;
  lead?: boolean;
  ctaCopy?: string;
  ctaLabel?: string;
  channels?: Channel[];
  showLangDropdown?: boolean;
  useSrcSetGenerator?: boolean;
}

const ProductHero = ({
  heading,
  copy,
  lead = true,
  ctaButtons,
  ctaCopy,
  media,
  tagline,
  channels,
  showLangDropdown,
  ctaLabel = 'Channels',
  children,
  useSrcSetGenerator = false,
  ...props
}: ProductHeroProps) => {
  const dark = isDarkBackgroundColor(props.backgroundColor);

  return (
    <css.SectionWrapper {...props} hasOverflow>
      {showLangDropdown && children}
      <Grid.Container
        css={{
          rowGap: '$small',
          alignItems: 'center',
          justifyItems: 'center',
          '@medium': {
            rowGap: '$large',
          },
        }}
      >
        <Grid.Item xs={4} small={4} medium={6} large={7}>
          {tagline && (
            <css.TaglineWrapper>
              <Tagline isDark={dark}>{tagline}</Tagline>
            </css.TaglineWrapper>
          )}
          <css.HeadingOne level={1} dark={dark}>
            {heading}
          </css.HeadingOne>
          <css.WrapperCopy>
            {copy && (
              <Markdown dark={dark} lead={lead}>
                {copy}
              </Markdown>
            )}
          </css.WrapperCopy>
          <css.CtaWrapper>
            {ctaButtons &&
              ctaButtons.map((cta) => (
                <CtaButton
                  {...cta}
                  key={cta.href}
                  backgroundColor={props.backgroundColor}
                />
              ))}
          </css.CtaWrapper>
          {ctaCopy && (
            <css.CtaCopyWrapper>
              <Markdown dark={dark}>{ctaCopy}</Markdown>
            </css.CtaCopyWrapper>
          )}
          {channels && (
            <css.ChannelsWrapper>
              <CTA>{ctaLabel}:</CTA>
              {channels.map(({ href, value, id }) => (
                <Link href={href} key={id}>
                  {value}
                </Link>
              ))}
            </css.ChannelsWrapper>
          )}
        </Grid.Item>

        <css.ImageItem xs={4} small={4} medium={6} large={5}>
          {media && (
            <css.Image
              useExplicitDimensions
              loading='eager'
              useSrcSetGenerator={useSrcSetGenerator}
              {...media}
            />
          )}
        </css.ImageItem>
      </Grid.Container>
    </css.SectionWrapper>
  );
};

export default ProductHero;
