import { isDarkBackgroundColor } from 'ui/styles/constants/backgroundColorOptions';
import Grid from 'ui/components/Grid';
import Tagline from 'ui/components/Tagline';
import * as css from './AvailableNumbersHero.styled';
import Markdown from 'ui/components/Markdown';

import type { SectionProps } from 'ui/components/Section';

import dynamic from 'next/dynamic';
import { CTA_COPY } from './utils';
import Media, { type MediaProps } from 'ui/components/Media/Media';
import { type CountryCode } from 'libphonenumber-js';
import Input from 'ui/components/Input/Input';

const SearchNumbersForm = dynamic(() => import('./SearchNumbersForm').then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <>
      <css.PhoneFieldWrapper>
        <Input
          id='search-number'
          name='search-number'
          label='Phone number'
          helpText='Enter full or partial phone numbers. Leave it empty to view some of our available numbers.'
          placeholder='+1 (123) 456-7899'
          type='tel'
          isDark
        />
      </css.PhoneFieldWrapper>
      <css.WrapperButton kind='primary' background='dark'>
        {CTA_COPY}
      </css.WrapperButton>
      <css.WrapperCaptcha />
    </>
  ),
});

export interface AvailableNumbersHeroProps extends SectionProps {
  heading: string;
  copy: string;
  country_code: CountryCode;
  tagLine?: string;
  boxDefault?: string;
  // this hero is used for both state and country pages
  // and country pages don't have a state_code
  state_code?: string;
  media?: MediaProps<'media'>;
}

const AvailableNumbersHero = ({
  tagLine,
  heading,
  copy,
  boxDefault,
  state_code,
  country_code,
  children,
  media,
  ...props
}: AvailableNumbersHeroProps) => {
  const dark = isDarkBackgroundColor(props.backgroundColor);

  return (
    <css.SectionWrapper {...props} hasOverflow>
      <Grid.Container
        css={{
          gap: '$xl',
          alignItems: 'center',
          justifyContent: 'space-between',
          '@lessThanSmall': {
            gap: '$xs',
          },
          '@small': {
            gap: '$small',
          },
        }}
      >
        <Grid.Item xs={6} small={6} medium={7}>
          {tagLine && (
            <css.TaglineWrapper>
              <Tagline isDark={dark}>{tagLine}</Tagline>
            </css.TaglineWrapper>
          )}
          <css.HeadingOne level={1} dark={dark}>
            {heading}
          </css.HeadingOne>
          <css.WrapperCopy>
            {copy && (
              <Markdown dark={dark} lead={true}>
                {copy}
              </Markdown>
            )}
          </css.WrapperCopy>
        </Grid.Item>
        <Grid.Item
          xs={6}
          small={8}
          medium={5}
          css={{
            '@lessThanMedium': {
              justifySelf: 'center',
              gridRow: -1,
              marginBottom: '$xl',
            },
          }}
        >
          {media && (
            <css.MediaWrapper>
              <Media {...media} />
            </css.MediaWrapper>
          )}
        </Grid.Item>

        <Grid.Item xs={6} small={8} medium={12} large={12}>
          <SearchNumbersForm country_code={country_code} state_code={state_code} />
        </Grid.Item>
      </Grid.Container>
    </css.SectionWrapper>
  );
};

export default AvailableNumbersHero;
