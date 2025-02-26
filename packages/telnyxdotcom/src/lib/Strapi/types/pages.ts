import type { SecondaryCarouselSectionProps } from 'ui/components/SecondaryCarouselSection';
import type { ControlledArticlesListSectionProps } from 'components/ControlledArticlesListSection';
import type { MarketoFormSectionProps } from 'ui/components/FormSection/MarketoFormSection';

export type SectionComponentProps = {
  'blog.rc-section-articles-carousel'?: SecondaryCarouselSectionProps[];
  'blog.rc-section-articles-list'?: Omit<ControlledArticlesListSectionProps, 'categoryValue' | 'setCategoryValue'>[]; // serializable props
  'blog.rc-section-form'?: MarketoFormSectionProps[];
};
