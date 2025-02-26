import Footer from 'ui/components/Footer';
import HeaderLegacy, { type HeaderProps as LegacyHeaderProps } from 'ui/components/Header';
import Header, { type HeaderProps } from 'components/Layout/Header';

import ScrollSnapContainer, { type ScrollSnapContainerProps } from 'ui/components/ScrollSnapContainer';
import HeaderContainer from 'ui/components/Header/HeaderContainer';
import legacyHeaderNavigation from 'constants/generatedAtBuild/header.json';
import headerNavigation from 'constants/generatedAtBuild/new_header.json';
import footerNavigation from 'constants/generatedAtBuild/footer.json';
import featureFlippers from 'constants/featureFlippers';

export interface ScrollSnapLayoutProps {
  children: React.ReactNode;
  className: string;
  simpleHeaderfooter?: boolean;
  scrollSnap?: ScrollSnapContainerProps;
}

const ScrollSnapLayout = ({ children, className, simpleHeaderfooter = false, scrollSnap }: ScrollSnapLayoutProps) => {
  return (
    <ScrollSnapContainer className={className} htmlAs='main' {...(scrollSnap || {})} data-scroll-snap='true'>
      <HeaderContainer htmlAs={featureFlippers.DOTCOM_3658_NEW_HEADER_NAVIGATION ? 'div' : 'header'} scrollSnap>
        {featureFlippers.DOTCOM_3658_NEW_HEADER_NAVIGATION ? (
          <Header simpleHeaderFooter={simpleHeaderfooter} navigation={headerNavigation as HeaderProps['navigation']} />
        ) : (
          <HeaderLegacy
            simpleHeaderFooter={simpleHeaderfooter}
            navigation={legacyHeaderNavigation as LegacyHeaderProps['navigation']}
          />
        )}
      </HeaderContainer>
      {children}
      <Footer
        simpleHeaderfooter={simpleHeaderfooter}
        navigation={footerNavigation}
        backgroundColor='cream'
        scrollSnap
      />
    </ScrollSnapContainer>
  );
};

export default ScrollSnapLayout;
