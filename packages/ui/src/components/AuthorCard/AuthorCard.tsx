import type { MediaProps } from '../Media';
import AuthorPicture from '../AuthorPicture';
import Markdown, { type MarkdownProps } from '../Markdown';
import LinkedinIcon from '../Icons/LinkedIn';
import * as css from './AuthorCard.styled';
import { useRef, useEffect } from 'react';
import { useState } from 'react';
import { useId } from 'react';
import Caption from '../Typography/Caption';

export interface AuthorCardProps {
  id?: string;
  copy: string;
  icon?: MediaProps<'media'>;
  description?: MarkdownProps;
  role?: string;
  linkedin?: string;
}

const AuthorCard = ({
  id,
  icon,
  copy,
  description,
  linkedin,
  role,
}: AuthorCardProps) => {
  return (
    <css.Wrapper id={id}>
      <css.Header>
        <AuthorPicture media={icon} name={copy} pictureSize='big' />
        <css.NameWrapper>
          <css.Name>{copy}</css.Name>
          {linkedin && (
            <css.LinkedinLink
              href={linkedin}
              rel='noopener'
              target='_blank'
              referrerPolicy='no-referrer'
            >
              <LinkedinIcon width={24} height={24} />
            </css.LinkedinLink>
          )}
          {role && <Caption>{role}</Caption>}
        </css.NameWrapper>
      </css.Header>
      {description ? (
        description.children.length > PREVIEW_CHARACTER_LENGTH ? (
          <ExpandableDescription>{description}</ExpandableDescription>
        ) : (
          <css.DescriptionWrapper>
            <css.DescriptionContent>
              <Markdown {...description} />
            </css.DescriptionContent>
          </css.DescriptionWrapper>
        )
      ) : null}
    </css.Wrapper>
  );
};

interface ExpandableDescriptionProps {
  children: MarkdownProps;
}

const PREVIEW_CHARACTER_LENGTH = 280;

const ExpandableDescription = ({
  children: description,
}: ExpandableDescriptionProps) => {
  const id = useId();
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState('');
  const descriptionRef = useRef<HTMLDivElement>(null);

  const expand = () => {
    if (descriptionRef.current) {
      setMaxHeight(`${descriptionRef.current.scrollHeight}px`);
    }
    setIsExpanded(true);
  };

  useEffect(() => {
    if (isExpanded && descriptionRef.current) {
      setMaxHeight(`${descriptionRef.current.scrollHeight}px`);
    }
  }, [isExpanded]);

  return (
    <css.DescriptionWrapper
      ref={descriptionRef}
      style={{ maxHeight }}
      isExpanded={isExpanded}
    >
      <css.DescriptionContent>
        <Markdown
          {...description}
          options={{
            forceInline: true,
          }}
        >
          {description.children.substring(0, PREVIEW_CHARACTER_LENGTH)}
        </Markdown>

        <css.FadeInText id={id}>
          <Markdown
            {...description}
            options={{
              forceInline: true,
            }}
          >
            {description.children.substring(
              PREVIEW_CHARACTER_LENGTH,
              description.children.length
            )}
          </Markdown>
        </css.FadeInText>
      </css.DescriptionContent>

      <css.Link
        htmlAs='button'
        onClick={expand}
        aria-controls={id}
        aria-expanded={isExpanded}
      >
        [...]
      </css.Link>
    </css.DescriptionWrapper>
  );
};

export default AuthorCard;
