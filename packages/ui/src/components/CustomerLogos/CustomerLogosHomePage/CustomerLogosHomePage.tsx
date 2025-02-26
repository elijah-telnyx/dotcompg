import React, { type PropsWithChildren } from 'react';
import { MediaImage } from '../../Media';
import Section, { type SectionProps } from '../../Section';
import * as css from './CustomerLogosHomePage.styled';

export interface CustomerLogosHomePageProps extends SectionProps {
  logos: { src: string; alt: string }[];
}

const CustomerLogosHomePage = ({
  logos,
  ...sectionProps
}: CustomerLogosHomePageProps) => {
  return (
    <Section {...sectionProps}>
      <InfiniteSideScroll>
        {logos.map((logo, i) => (
          <css.LogoWrapper key={i}>
            <MediaImage {...logo} />
          </css.LogoWrapper>
        ))}
      </InfiniteSideScroll>
    </Section>
  );
};

interface InfiniteSideScrollProps {
  duration?: string;
}

const InfiniteSideScroll = ({
  children,
  duration = '30s',
  ...props
}: PropsWithChildren<InfiniteSideScrollProps>) => {
  return (
    <css.BannerWidthLimit>
      <css.BannerWrapper
        {...props}
        css={{
          animationDuration: duration,
        }}
      >
        {children}
        {React.Children.toArray(children).map((child, i) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              key: i,
              'data-clone': true,
              'aria-hidden': true,
            } as React.Attributes);
          }
          return child;
        })}
      </css.BannerWrapper>
    </css.BannerWidthLimit>
  );
};

export default CustomerLogosHomePage;
