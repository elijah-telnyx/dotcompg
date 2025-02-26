import { ProductCard, type ProductCardProps } from '../ProductCard';
import {
  DialogWrapper,
  NetworkArrow,
  NetworkDialogImage,
  NetworkMediaWrapper,
  NetworkWifiWrapper,
} from '../ProductCard.styled';
import ArrowSvg from './arrow.svg';
import WifiTopSvg from './wifi_top.svg';
import WifiMiddleSvg from './wifi_middle.svg';
import WifiBottomSvg from './wifi_bottom.svg';
import NextImage from 'next/image';

type NetworkCardProps = ProductCardProps;

export const NetworkCard = (props: NetworkCardProps) => {
  return (
    <ProductCard {...props}>
      <NetworkMediaWrapper>
        <div>
          <DialogWrapper>
            <NetworkDialogImage />
            <NetworkArrow src={ArrowSvg} alt='Arrow icon.' />
          </DialogWrapper>
        </div>
        <NetworkWifiWrapper>
          {[WifiTopSvg, WifiMiddleSvg, WifiBottomSvg].map((wifi, index) => (
            <NextImage src={wifi} alt='WiFi signal strength indicator icon' key={index} />
          ))}
        </NetworkWifiWrapper>
      </NetworkMediaWrapper>
    </ProductCard>
  );
};
