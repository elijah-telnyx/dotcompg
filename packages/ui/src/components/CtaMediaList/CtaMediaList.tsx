import * as css from './CtaMediaList.styled';

import type { CTAButtonProps } from '../CtaButton';
import CtaButton from '../CtaButton';
import Media from '../Media';
import type { MediaProps } from '../Media';
import type { SectionProps } from '../Section';
import TwoColumnsParallax from '../TwoColumnsParallax';

interface Item {
  id: string;
  heading: string;
  copy: string;
  cta: CTAButtonProps;
  media: MediaProps<'media'>;
}
export interface CtaMediaListProps extends SectionProps {
  items: Item[];
}

const CtaMediaList = ({ items, ...props }: CtaMediaListProps) => {
  return (
    <css.Section {...props}>
      <TwoColumnsParallax
        hasCurlElement
        items={items.map(({ heading, copy, id, cta, media }) => {
          return {
            id,
            left: (
              <css.ContentBlock {...props}>
                <css.Heading level={2}>{heading}</css.Heading>
                <css.Paragraph>{copy}</css.Paragraph>
                <CtaButton {...cta} type='button' />
              </css.ContentBlock>
            ),
            right: <Media {...media} fill autoPlay />,
          };
        })}
      />
    </css.Section>
  );
};

export default CtaMediaList;
