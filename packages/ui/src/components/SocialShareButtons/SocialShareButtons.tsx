import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share';
import * as css from './SocialShareButtons.styles';
import LinkedinIcon from '../Icons/LinkedIn';
import FacebookIcon from '../Icons/Facebook';
import TwitterIcon from '../Icons/Twitter';

const ICONS_SIZE_PX = 24;

export type SocialShareButtonsProps = {
  url: string;
  title: string;
  description: string;
  onClickShareButton?: (network: string) => void | undefined;
};

const SocialShareButtons = ({
  url,
  title,
  description,
  onClickShareButton,
}: SocialShareButtonsProps) => {
  const beforeOnClick = (network: string) => () => {
    if (onClickShareButton) onClickShareButton(network);
  };

  return (
    <css.Wrapper>
      <css.Label>Share on Social</css.Label>
      <LinkedinShareButton
        beforeOnClick={beforeOnClick('linkedin')}
        url={url}
        title={title}
        source='telnyx'
      >
        <LinkedinIcon width={ICONS_SIZE_PX} height={ICONS_SIZE_PX} />
      </LinkedinShareButton>

      <TwitterShareButton
        beforeOnClick={beforeOnClick('twitter')}
        url={url}
        title={title}
        via='telnyx'
      >
        <TwitterIcon width={ICONS_SIZE_PX} height={ICONS_SIZE_PX} />
      </TwitterShareButton>

      <FacebookShareButton
        beforeOnClick={beforeOnClick('facebook')}
        url={url}
        quote={description}
      >
        <FacebookIcon width={ICONS_SIZE_PX} height={ICONS_SIZE_PX} />
      </FacebookShareButton>
    </css.Wrapper>
  );
};

export default SocialShareButtons;
