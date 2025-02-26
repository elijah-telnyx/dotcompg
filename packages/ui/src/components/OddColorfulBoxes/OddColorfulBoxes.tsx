import Section, { type SectionProps } from '../Section';
import type { ColorfulCardsItemProps } from '../ColorfulCards';
import type { CTAButtonProps } from '../CtaButton';
import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';
import * as css from './OddColorfulBoxes.styled';
import CtaButton from '../CtaButton';
import { isDarkCardTheme } from '../../styles/constants/cardThemeOptions';

export interface OddColorfulCardItemProps
  extends Omit<ColorfulCardsItemProps, 'title' | 'leadingText'> {
  title: string;
  leadingText: string;
  link?: CTAButtonProps;
  highlightLink?: CTAButtonProps;
  copies?: string[];
  highlightCopies?: string[];
  dark?: boolean;
}

export const OddColorfulCardItemCopy = ({
  text,
  dark,
}: {
  text: string;
  dark?: boolean;
}) => {
  return (
    <css.ContainerCopy>
      <css.CheckIconWrapper dark={dark}>
        <css.CheckmarkIcon />
      </css.CheckIconWrapper>
      <css.ParagraphCopy dark={dark} lead>
        {text}
      </css.ParagraphCopy>
    </css.ContainerCopy>
  );
};

export const LeftBox = ({
  title,
  copies,
  leadingText,
  link,
  cardTheme,
}: {
  title: string;
  copies?: string[];
  leadingText: string;
  link?: CTAButtonProps;
} & Pick<ColorfulCardsItemProps, 'cardTheme'>) => {
  const dark = isDarkCardTheme(cardTheme);
  return (
    <css.LeftBox cardTheme={cardTheme}>
      <css.HeadingUpperCase dark={dark} level={2} htmlAs='strong' category>
        {title}
      </css.HeadingUpperCase>
      {copies && copies.length > 0 ? (
        <Heading dark={dark} level={2} htmlAs='strong'>
          {leadingText}
        </Heading>
      ) : (
        <Paragraph dark={dark} lead>
          {leadingText}
        </Paragraph>
      )}

      <div>
        {copies?.map((item) => (
          <OddColorfulCardItemCopy dark={dark} key={item} text={item} />
        ))}
      </div>

      {link && (
        <css.CtaButtonWrapper>
          <CtaButton {...link} />
        </css.CtaButtonWrapper>
      )}
    </css.LeftBox>
  );
};

export const RightBox = ({
  highlightTitle,
  highlightText,
  highlightLink,
  highlightCopies,
}: {
  highlightTitle: string;
  highlightText: string;
  highlightLink?: CTAButtonProps;
  highlightCopies?: string[];
}) => {
  return (
    <css.RightBox>
      <css.HeadingUpperCase level={2} htmlAs='strong' category>
        {highlightTitle}
      </css.HeadingUpperCase>
      {highlightCopies && highlightCopies.length > 0 ? (
        <Heading level={2} htmlAs='strong'>
          {highlightText}
        </Heading>
      ) : (
        <Paragraph lead>{highlightText}</Paragraph>
      )}
      <div>
        {highlightCopies?.map((item, index) => (
          <OddColorfulCardItemCopy key={index} text={item} />
        ))}
      </div>
      {highlightLink && (
        <css.CtaButtonWrapper>
          <CtaButton {...highlightLink} backgroundColor='black' />
        </css.CtaButtonWrapper>
      )}
    </css.RightBox>
  );
};

export const OddColorfulCardItem = ({
  title,
  leadingText,
  link,
  highlightTitle,
  highlightText,
  highlightLink,
  copies,
  highlightCopies,
  cardTheme,
}: OddColorfulCardItemProps) => {
  return (
    <css.BoxWrapper>
      <LeftBox
        title={title}
        leadingText={leadingText}
        link={link}
        copies={copies}
        cardTheme={cardTheme}
      />
      <RightBox
        highlightTitle={highlightTitle}
        highlightText={highlightText}
        highlightLink={highlightLink}
        highlightCopies={highlightCopies}
      />
    </css.BoxWrapper>
  );
};

export interface OddColorfulBoxesProps
  extends Pick<ColorfulCardsItemProps, 'cardTheme'>,
    SectionProps {
  /**
   * min of 1 - max of 4
   */
  items: OddColorfulCardItemProps[];
}

const OddColorfulBoxes = ({
  items,
  cardTheme,
  ...props
}: OddColorfulBoxesProps) => {
  return (
    <Section {...props}>
      {items?.map((item) => (
        <OddColorfulCardItem cardTheme={cardTheme} {...item} key={item.id} />
      ))}
    </Section>
  );
};

export default OddColorfulBoxes;
