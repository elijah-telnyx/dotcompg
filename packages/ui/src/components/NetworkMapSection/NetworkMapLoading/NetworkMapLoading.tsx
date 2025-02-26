import { MediaImage, type MediaProps } from '../../Media';
import { type SectionProps } from '../../Section';
import Spinner from '../../Spinner';
import { HERO_NETWORK_MAP_SECTION_ID } from '../utils';

import * as css from './NetworkMapLoading.styled';

const NETWORK_MAP_LOADING_IMAGE = {
  src: 'https://images.ctfassets.net/2vm221913gep/2BCx0aOhj0syuoCWjbyxNR/cc1c15f11c78feeb1798952b6cc6ad46/Telnyx_Website_World_Map_loading-fs8.png',
  alt: 'Network map loading image',
};
export interface NetworkMapLoadingProps extends SectionProps {
  media?: MediaProps<'img'>;
}

export const NetworkMapLoading = ({
  media = NETWORK_MAP_LOADING_IMAGE,
  ...sectionProps
}: NetworkMapLoadingProps) => {
  return (
    <css.SectionWrapper
      spacingTop='none'
      spacingBottom='none'
      tabIndex={0}
      transparent
      id={HERO_NETWORK_MAP_SECTION_ID}
      {...sectionProps}
    >
      <css.FilterWrapper>
        <css.Loading>
          <Spinner background='dark' size='big' />
        </css.Loading>
      </css.FilterWrapper>
      <css.NetworkMapBackground>
        <MediaImage
          {...media}
          width={1011}
          height={667}
          useSrcSetGenerator={false}
        />
      </css.NetworkMapBackground>
    </css.SectionWrapper>
  );
};

export default NetworkMapLoading;
