import Header from "../Header";
import Footer from "../Footer";
import HeaderContainer from "../Header/HeaderContainer";

import * as css from "./MainLayout.styled";

interface MainLayoutProps {
  children: React.ReactNode;
  className: string;
}

const MainLayout = ({ children, className }: MainLayoutProps) => {
  return (
    <css.Wrapper className={className}>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <main>{children}</main>
      <Footer backgroundColor="cream" />
    </css.Wrapper>
  );
};

export default MainLayout;
