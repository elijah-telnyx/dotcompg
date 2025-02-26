import Header from "../Header";
import Footer from "../Footer";
import HeaderContainer from "../Header/HeaderContainer";
import ScrollSnapContainer, {
  type ScrollSnapContainerProps,
} from "ui/components/ScrollSnapContainer";

export interface ScrollSnapLayoutProps {
  children: React.ReactNode;
  className: string;
  scrollSnap?: ScrollSnapContainerProps;
}

const ScrollSnapLayout = ({
  children,
  className,
  scrollSnap,
}: ScrollSnapLayoutProps) => {
  return (
    <ScrollSnapContainer
      className={className}
      htmlAs="main"
      {...(scrollSnap || {})}
    >
      <HeaderContainer scrollSnap>
        <Header />
      </HeaderContainer>
      {children}
      <Footer backgroundColor="cream" scrollSnap />
    </ScrollSnapContainer>
  );
};

export default ScrollSnapLayout;
