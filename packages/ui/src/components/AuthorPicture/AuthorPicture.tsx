import * as css from './AuthorPicture.styled';
import type { MediaProps } from '../Media';

export interface AuthorPictureProps {
  name: string;
  media?: MediaProps<'media'>;
  pictureSize?: 'medium' | 'big';
}

export const getInitials = (name: string) => {
  const [first, last = ''] = name.split(' ').filter(Boolean);
  return `${first[0]}${last[0]}`;
};

const AuthorPicture = ({
  media,
  name,
  pictureSize = 'medium',
}: AuthorPictureProps) => {
  if (media?.src) {
    return (
      <css.Picture
        {...media}
        pictureSize={pictureSize}
        data-author-initials={name ? getInitials(name) : ''}
      />
    );
  }

  return (
    <css.Initials
      pictureSize={pictureSize}
      data-author-initials={name ? getInitials(name) : ''}
    />
  );
};

export default AuthorPicture;
