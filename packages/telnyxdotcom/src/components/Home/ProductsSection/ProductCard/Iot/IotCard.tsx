import { ProductCard, type ProductCardProps } from '../ProductCard';
import {
  IoTMediaWrapper,
  IotArrowImage,
  IotPurchaseOneClickImage,
  IotPurchaseOneImage,
  IotPurchaseZeroImage,
  IotQrCodeImage,
} from '../ProductCard.styled';
import PurchaseZeroSvg from './purchase_block_zero.svg';
import PurchaseOneSvg from './purchase_block_one.svg';
import PurchaseOneClickSvg from './purchase_block_one_click.svg';
import ArrowSvg from './arrow.svg';
import QrCode from './qr_code.png';

type IotCardProps = ProductCardProps;

export const IotCard = (props: IotCardProps) => {
  return (
    <ProductCard {...props}>
      <IoTMediaWrapper>
        <IotPurchaseOneImage src={PurchaseOneSvg} alt='Purchase block one graphic' className='one' />
        <IotPurchaseOneClickImage
          src={PurchaseOneClickSvg}
          alt='Purchase block with one-click functionality'
          className='one'
        />
        <IotPurchaseZeroImage
          src={PurchaseZeroSvg}
          alt='A graphic showing a purchase block with various icons and text.'
          className='zero'
        />
        <IotArrowImage src={ArrowSvg} alt='Arrow icon.' />
        <IotQrCodeImage src={QrCode} alt='A QR code image.' quality={100} width={260} height={288} />
      </IoTMediaWrapper>
    </ProductCard>
  );
};
