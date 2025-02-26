import Header, { type HeaderProps } from 'components/Layout/Header';
import legacyHeaderNavigation from 'constants/generatedAtBuild/header.json';
import headerNavigation from 'constants/generatedAtBuild/new_header.json';
import Footer from 'ui/components/Footer';
import HeaderLegacy, { type HeaderProps as LegacyHeaderProps } from 'ui/components/Header';
import footerNavigation from 'constants/generatedAtBuild/footer.json';
import HeaderContainer from 'ui/components/Header/HeaderContainer';

import featureFlippers from 'constants/featureFlippers';
import * as css from './MainLayout.styled';

interface MainLayoutProps {
  children: React.ReactNode;
  className: string;
  simpleHeaderfooter?: boolean;
}

const MainLayout = ({ children, className, simpleHeaderfooter = false }: MainLayoutProps) => {
  return (
    <css.Wrapper className={className}>
      <HeaderContainer htmlAs={featureFlippers.DOTCOM_3658_NEW_HEADER_NAVIGATION ? 'div' : 'header'}>
        {featureFlippers.DOTCOM_3658_NEW_HEADER_NAVIGATION ? (
          <Header simpleHeaderFooter={simpleHeaderfooter} navigation={headerNavigation as HeaderProps['navigation']} />
        ) : (
          <HeaderLegacy
            simpleHeaderFooter={simpleHeaderfooter}
            navigation={legacyHeaderNavigation as LegacyHeaderProps['navigation']}
          />
        )}
      </HeaderContainer>
      <main>{children}</main>
      <Footer simpleHeaderfooter={simpleHeaderfooter} navigation={footerNavigation} backgroundColor='cream' />
    </css.Wrapper>
  );
};

export default MainLayout;
