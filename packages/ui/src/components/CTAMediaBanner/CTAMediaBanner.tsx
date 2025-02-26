import type { SectionProps } from '../Section';
import Input, { type InputProps } from '../Input';
import Media, { type MediaProps } from '../Media';
import CtaButton, { type CTAButtonProps } from '../CtaButton';
import * as css from './CTAMediaBanner.styled';

export interface CTAMediaBannerProps extends SectionProps {
  id: string;
  heading: string;
  input: InputProps;
  ctaButton: CTAButtonProps;
  media?: MediaProps<'media'>;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

/**
 * @NOTE Please check if this component is being used before doing any updates
 * like the planned css migration.
 * @ref https://telnyx.slack.com/archives/C0179536KU7/p1728939601431869?thread_ts=1728939082.343869&cid=C0179536KU7
 */
const CTAMediaBanner = ({
  id,
  heading,
  input,
  ctaButton: { href, ...cta },
  media,
  onSubmit,
  ...props
}: CTAMediaBannerProps) => {
  return (
    <css.SectionWrapper {...props}>
      <css.CtaContainer>
        <css.Heading level={1} id={id} htmlAs='h2'>
          {heading}
        </css.Heading>
        <css.CtaForm action={href} method='get' onSubmit={onSubmit}>
          <Input {...input} />
          <CtaButton {...cta} htmlAs='button' />
        </css.CtaForm>
      </css.CtaContainer>
      {media && (
        <css.MediaContainer>
          <Media {...media} height={undefined} width={undefined} fill contain />
        </css.MediaContainer>
      )}
    </css.SectionWrapper>
  );
};

export default CTAMediaBanner;
