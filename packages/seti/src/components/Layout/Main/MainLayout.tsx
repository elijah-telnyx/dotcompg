import dynamic from "next/dynamic";
import HeaderContainer from "../Header/HeaderContainer";
const Header = dynamic(() => import("../Header"), { ssr: false });
const SideNav = dynamic(() => import("../SideNav"), { ssr: false });
import { useRouter } from "next/router";

import * as css from "./MainLayout.styled";

interface MainLayoutProps {
  children: React.ReactNode;
  className: string;
}

const MainLayout = ({ children, className }: MainLayoutProps) => {
  const router = useRouter();
  const currentUrl = router.asPath;
  return (
    <css.PageWrapper className={className}>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <css.MainWrapper>
        <SideNav current={currentUrl} />
        <main>{children}</main>
      </css.MainWrapper>
    </css.PageWrapper>
  );
};

export default MainLayout;
