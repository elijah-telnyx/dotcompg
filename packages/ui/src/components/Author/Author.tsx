import * as css from './Author.styled';
import type { MediaProps } from '../Media';
import AuthorPicture from '../AuthorPicture';
import Link from '../Link';
import LinkedinIcon from '../Icons/LinkedIn';

export interface AuthorProps {
  name: string;
  linkHref?: string;
  media?: MediaProps<'media'>;
  isDark?: boolean;
  isEditor?: boolean;
  linkedin?: string;
}

const Author = ({
  media,
  name,
  isDark,
  isEditor,
  linkedin,
  linkHref,
}: AuthorProps) => {
  return (
    <css.Wrapper>
      {media?.src && <AuthorPicture media={media} name={name} />}
      {name && (
        <css.NameWrapper dark={isDark}>
          {isEditor ? 'Editor:' : 'By'}{' '}
          {linkHref ? (
            <Link href={linkHref}>{name}</Link>
          ) : (
            <css.Name>{name}</css.Name>
          )}
        </css.NameWrapper>
      )}
      {linkedin && !linkHref && (
        <Link href={linkedin} noIcon aria-label={`${name}'s LinkedIn profile`}>
          <LinkedinIcon />
        </Link>
      )}
    </css.Wrapper>
  );
};

export default Author;
