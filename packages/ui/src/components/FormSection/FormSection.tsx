import type { SectionProps } from '../Section';
import type { MediaProps } from '../Media';
import { isDarkBackgroundColor } from '../../styles/constants/backgroundColorOptions';

import Markdown from '../Markdown';
import Grid from '../Grid';
import * as css from './FormSection.styled';
import Card from '../Card';
import type { BaseProps } from '../Typography/utils';

export interface FormSectionProps extends SectionProps {
  heading?: string;
  headingTag?: 'h1' | 'h2' | 'h3';
  copy?: string;
  loading?: boolean;
  media?: MediaProps<'img'>;
  footerCopy?: string;
  card?: boolean;
  fullHeight?: boolean;
}

const FormCard = (props: React.ComponentProps<typeof Card>) => {
  return <Card {...props} form />;
};

const FormSection = ({
  heading,
  headingTag,
  copy,
  loading,
  media,
  footerCopy,
  children,
  card = true,
  fullHeight = true,
  ...props
}: FormSectionProps) => {
  const FormComponent = card ? FormCard : css.FormInnerWrapper;

  const dark: BaseProps['dark'] = {
    '@initial': false,
    '@small': isDarkBackgroundColor(props.backgroundColor),
  };

  return (
    <css.SectionWrapper
      {...props}
      fullHeight={fullHeight}
      card={card}
      css={{ backgroundImage: media ? `url(${media.src})` : '' }}
      hasOverflow
    >
      <css.ContentWrapper card={card} hasHeading={Boolean(heading || copy)}>
        {heading && (
          <css.Heading dark={dark} level={2} htmlAs={headingTag}>
            {heading}
          </css.Heading>
        )}
        {copy && (
          <css.MarkdownWrapper>
            <Markdown dark={dark}>{copy}</Markdown>
          </css.MarkdownWrapper>
        )}
      </css.ContentWrapper>
      <css.GridContainerWrapper>
        <Grid.Item xs={4} small={8} medium={12}>
          <css.Wrapper card={card}>
            <FormComponent disabled={loading}>{children}</FormComponent>
          </css.Wrapper>
          {footerCopy && (
            <css.MarkdownWrapper>
              <Markdown dark={dark}>{footerCopy}</Markdown>
            </css.MarkdownWrapper>
          )}
        </Grid.Item>
      </css.GridContainerWrapper>
    </css.SectionWrapper>
  );
};

export default FormSection;
