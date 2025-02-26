import * as css from './Codes.styled';

import CopyButton from '../CopyButton';

export interface CodeProps {
  heading: string;
  code: string;
}

export interface CodesProps {
  tagline: string;
  items: CodeProps[];
  defaultActive?: string;
  alt?: boolean;
  embed?: boolean;
}
const Codes = ({
  tagline,
  items,
  defaultActive = items[0].heading,
  alt,
  embed,
}: CodesProps) => {
  return (
    <css.Codes defaultValue={defaultActive} alt={alt} embed={embed}>
      <css.CodesList
        aria-label={tagline}
        loop={false}
        dark={{
          '@small': true,
        }}
      >
        {items.map(({ heading }) => (
          <css.CodeTab key={heading} value={heading}>
            <css.CodeLanguage
              dark={{
                '@small': true,
              }}
            >
              {heading}
            </css.CodeLanguage>
          </css.CodeTab>
        ))}
      </css.CodesList>

      {items.map(({ heading, code }) => (
        <css.CodesContent key={heading} value={heading} embed={embed}>
          <css.CopyButtonWrapper>
            <CopyButton copy={code} isDark />
          </css.CopyButtonWrapper>
          <css.CodeMarkdown dark>{code}</css.CodeMarkdown>
        </css.CodesContent>
      ))}
    </css.Codes>
  );
};

export default Codes;
