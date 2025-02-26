import type { ReactNode } from 'react';
import type { CTAButtonProps } from '../CtaButton';
import CtaButton from '../CtaButton';
import Grid from '../Grid';
import { fullWidthColumns, type GridItemProps } from '../Grid/Grid';
import type { SectionProps } from '../Section';
import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';
import * as css from './BaseCtaBanner.styled';

export interface BaseCtaBannerProps extends SectionProps {
  heading: string;
  headingElement?: keyof JSX.IntrinsicElements;
  ctaButtons: CTAButtonProps[];
  tag?: string;
  copy?: string;
  centered?: boolean;
  dark?: boolean;
  aside?: ReactNode;
  copyBlockWrapperProps?: GridItemProps;
  ctaButtonsWrapperProps?: GridItemProps;
}

const getCopyBlockWrapperProps = ({
  centered,
  withAsideContent,
}: {
  withAsideContent?: boolean;
  centered?: boolean;
}) => {
  if (withAsideContent) {
    return {
      xs: 4,
      small: 4,
      medium: 7,
      large: 7,
      xl: 7,
      css: {
        marginBottom: '$large',
        '@small': {
          marginBottom: 0,
        },
      },
    };
  }
  if (centered) {
    return fullWidthColumns;
  }
  return { xs: 4, small: 4, medium: 7, large: 7, xl: 7 };
};

const CopyBlock = ({
  heading,
  htmlAs,
  copy,
  dark,
}: Pick<BaseCtaBannerProps, 'heading' | 'copy' | 'dark' | 'htmlAs'>) => (
  <>
    <Heading level={2} htmlAs={htmlAs} dark={dark}>
      {heading}
    </Heading>

    {copy && (
      <Paragraph
        dark={dark}
        lead
        css={{
          marginTop: '$xs',
          '@medium': {
            marginTop: '$medium',
          },
        }}
      >
        {copy}
      </Paragraph>
    )}
  </>
);

const getCtaButtonsWrapperProps = ({
  withAsideContent,
  centered,
}: {
  withAsideContent?: boolean;
  centered?: boolean;
}) => {
  if (withAsideContent) {
    return { xs: 4, small: 4, medium: 4, large: 4, xl: 4 };
  }
  if (centered) {
    return fullWidthColumns;
  }
  return {
    xs: 4,
    medium: 5,
    css: {
      justifySelf: 'end',
      marginBottom: '$large',
      '@small': {
        marginBottom: 0,
      },
    },
  };
};

const BaseCtaBanner = ({
  tag,
  heading,
  headingElement,
  copy,
  ctaButtons,
  centered,
  dark,
  aside,
  copyBlockWrapperProps,
  ctaButtonsWrapperProps,
  ...props
}: BaseCtaBannerProps) => {
  return (
    <css.Wrapper htmlAs='div' centered={centered} {...props}>
      <Grid.Container>
        {tag && (
          <Grid.FullWidthItem>
            <Heading
              level={2}
              category
              dark={dark}
              htmlAs='strong'
              css={{
                marginBottom: '$large',
                '@medium': {
                  marginBottom: '$xxl',
                },
              }}
            >
              {tag}
            </Heading>
          </Grid.FullWidthItem>
        )}
        <Grid.Item
          {...getCopyBlockWrapperProps({
            centered,
            withAsideContent: Boolean(aside),
          })}
          {...copyBlockWrapperProps}
        >
          <CopyBlock
            heading={heading}
            htmlAs={headingElement ? headingElement : 'strong'}
            copy={copy}
            dark={dark}
          />
        </Grid.Item>
        {aside}
        {ctaButtons?.length && (
          <Grid.Item
            {...getCtaButtonsWrapperProps({
              centered,
              withAsideContent: Boolean(aside),
            })}
            {...ctaButtonsWrapperProps}
          >
            <css.ButtonsContainer>
              {ctaButtons.map((cta) => (
                <CtaButton
                  {...cta}
                  key={cta.href}
                  backgroundColor={props.backgroundColor}
                />
              ))}
            </css.ButtonsContainer>
          </Grid.Item>
        )}
      </Grid.Container>
    </css.Wrapper>
  );
};

export default BaseCtaBanner;
