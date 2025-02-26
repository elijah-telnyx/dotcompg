import Section, { type SectionProps } from '../Section';
import type { MarkdownProps } from '../Markdown';
import type { GridItemProps } from '../Grid';
import AuthorCard, { type AuthorCardProps } from '../AuthorCard';
import Heading from '../Typography/Heading';
import Markdown from '../Markdown';
import SocialShareButtons from '../SocialShareButtons';
import SidebarLinks, { type SidebarLinksProps } from '../SidebarLinks';
import MarketoForm, { type MarketoFormProps } from '../MarketoForm';
import { MARKDOWN_IMAGE_MAX_WIDTH } from '../Markdown';
import { slugify } from '../../utils/slugify';
import { isDarkBackgroundColor } from '../../styles/constants/backgroundColorOptions';
import * as css from './ComposableArticle.styled';
import type { MediaProps } from '../Media/Media';
import TextCallout from '../TextCallout';
import TabsGroup, { type TabsGroupProps } from './components/TabsGroup';
import ResourcesMediaImage from './components/ResourcesMediaImage';
import ResourcesVideo, {
  type ResourcesVideoProps,
} from './components/ResourcesVideo';

const articleColumns: GridItemProps = {
  xs: 4,
  small: 8,
  medium: 8,
};

interface MarkdownSection extends MarkdownProps {
  __component: 'blog.markdown-section';
}

interface MediaImageSection {
  __component: 'blog.rc-media-image';
  media: MediaProps<'media'>;
  id: string;
}

interface TextCalloutSection {
  __component: 'blog.text-callout';
  id: string;
  copy: string;
}

interface TabsGroupSection extends TabsGroupProps {
  __component: 'blog.tabs-group';
}

interface VideoSection extends ResourcesVideoProps {
  __component: 'blog.video';
  id: string;
}

type Section =
  | MarkdownSection
  | MediaImageSection
  | TextCalloutSection
  | TabsGroupSection
  | VideoSection;

export interface ComposableArticleProps extends SectionProps {
  sections?: Section[];
  form: MarketoFormProps;
  author: AuthorCardProps;
  socialShareTitle: string;
  socialShareDescription: string;
  socialShareUrl: string;
  onSocialShare?: (network: string) => void;
  jumplinks: SidebarLinksProps;
  extendedLayout?: boolean;
}

const markdownOptions: (
  body: MarkdownProps,
  forceBlock?: boolean
) => MarkdownProps['options'] = (body, forceBlock = false) => ({
  forceBlock,
  slugify: slugify,
  overrides: {
    // resources/[slug] uses the title field for h1
    // this is to prevent having two h1 over a page
    h1: {
      component: ({ children, id }) => (
        <Heading level={2} dark={body?.dark} blog id={id}>
          {children}
        </Heading>
      ),
    },
    img: {
      component: (props) => {
        return (
          <css.Media
            {...props}
            autoPlay
            loop
            css={{ maxWidth: '100%' }}
            width={MARKDOWN_IMAGE_MAX_WIDTH}
          />
        );
      },
    },
  },
});

export interface ComposableArticleSidebarProps {
  jumpLinks?: SidebarLinksProps;
  form: MarketoFormProps;
}

const ComposableArticleSidebar = ({
  jumpLinks,
  form,
}: ComposableArticleSidebarProps) => (
  <css.SidebarItem xs={4} small={4} medium={4} large={4}>
    <css.SidebarWrapper>
      {jumpLinks && (
        <css.SidebarLinksWrapper>
          <SidebarLinks {...jumpLinks} />
        </css.SidebarLinksWrapper>
      )}
      {form.heading && (
        <css.FormHeading level={3} htmlAs='h2'>
          {form.heading}
        </css.FormHeading>
      )}
      <MarketoForm {...form} align='left' heading='' />
    </css.SidebarWrapper>
  </css.SidebarItem>
);

const ComposableArticle = ({
  sections,
  form,
  author,
  onSocialShare,
  socialShareTitle,
  socialShareDescription,
  socialShareUrl,
  jumplinks,
  extendedLayout = false,
  ...props
}: ComposableArticleProps) => {
  // feature flipper for extended layout DOTCOM_3795_SOLUTIONS_HEADER
  const Container = extendedLayout ? css.ContainerExtended : css.Container;

  return (
    <Section {...props}>
      <Container>
        <css.ContentItem {...articleColumns} extendedLayout={extendedLayout}>
          {sections?.map((section) => {
            // passing the `section` background color because markdown element may have its own which overlap styles
            const dark = isDarkBackgroundColor(props.backgroundColor);

            switch (section.__component) {
              case 'blog.markdown-section':
                return (
                  <Markdown
                    {...section}
                    key={section.id}
                    options={markdownOptions(
                      section,
                      // a piece of content with a backgroundColor needs block-level (container) styles
                      Boolean(section.backgroundColor)
                    )}
                    dark={dark}
                    blog
                  />
                );
              case 'blog.rc-media-image':
                return (
                  <ResourcesMediaImage {...section.media} key={section.id} />
                );
              case 'blog.video':
                return <ResourcesVideo {...section} key={section.id} />;
              case 'blog.text-callout':
                return (
                  <TextCallout
                    {...section}
                    key={section.id}
                    spacingTop='none'
                    spacingBottom='none'
                  />
                );
              case 'blog.tabs-group':
                return <TabsGroup {...section} key={section.id} />;
              default:
                return null;
            }
          })}

          <css.SocialShareWrapper>
            <SocialShareButtons
              url={socialShareUrl}
              title={socialShareTitle}
              description={socialShareDescription}
              onClickShareButton={onSocialShare}
            />
          </css.SocialShareWrapper>

          {author.description && (
            <css.AuthorCardWrapper>
              <AuthorCard {...author} />
            </css.AuthorCardWrapper>
          )}
        </css.ContentItem>

        <ComposableArticleSidebar form={form} jumpLinks={jumplinks} />
      </Container>
    </Section>
  );
};

export default ComposableArticle;
