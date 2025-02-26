import { useState } from 'react';
import { useRouter } from 'next/router';
import { type SectionProps } from '../Section';
import Heading from '../Typography/Heading';
import Markdown from '../Markdown';
import Select, { type SelectProps } from '../Select';
import RadioGroup from '../RadioGroup';
import NetworkMapSprite, {
  type NetworkMapSpriteProps,
} from './NetworkMapSprite';
import CtaButton, { type CTAButtonProps } from '../CtaButton';
import {
  FILTER_CTA_LINK_ICON,
  FILTER_FAMILY_OPTIONS,
  FILTER_REGION_OPTIONS,
  getFamilyOptionFromQuery,
  getServiceOptionFromQuery,
  HERO_NETWORK_MAP_SECTION_ID,
  type ProductFamily,
  type Region,
} from './utils';
import useMedia from '../../utils/hooks/useMedia';
import { config } from '../../styles';

import * as css from './NetworkMapSection.styled';

export type NetworkMapFilterItemProps = SelectProps & { value: string };

export interface NetworkMapSectionProps extends SectionProps {
  heading: string;
  copy: string;
  filters: {
    services: {
      [key in ProductFamily]: {
        select: NetworkMapFilterItemProps;
        enabledMap: {
          [key: string]: NetworkMapSpriteProps['enabledMap'];
        };
      };
    };
    cta: {
      [key in ProductFamily]?: CTAButtonProps;
    };
  };
  regionSelect?: Pick<NetworkMapFilterItemProps, 'portal'>;
  transparent?: boolean;
}

export const NetworkMapFilterItem = ({
  ...props
}: NetworkMapFilterItemProps) => {
  const isXlViewport = useMedia(config.media.xl);

  return (
    <css.FilterItem>
      <Heading level={2} category>
        {props.placeholder}
      </Heading>

      {isXlViewport ? (
        <RadioGroup {...props} labelSize='big' />
      ) : (
        <Select {...props}></Select>
      )}
    </css.FilterItem>
  );
};

export const NetworkMapSection = ({
  id,
  heading,
  copy,
  filters,
  regionSelect = {},
  transparent = true,
  ...sectionProps
}: NetworkMapSectionProps) => {
  const router = useRouter();
  const [family, setFamily] = useState<ProductFamily>(
    getFamilyOptionFromQuery(router.query?.product)
  );
  const [service, setService] = useState<string>(
    getServiceOptionFromQuery(
      router.query?.service,
      filters.services[family].select
    )
  );
  const [region, setRegion] = useState<Region>(
    FILTER_REGION_OPTIONS['items'][0]['value'] as Region
  );

  function handleFamilyChange(familyValue: ProductFamily | undefined) {
    if (!familyValue) return;

    setFamily(familyValue);
    setService(filters.services[familyValue].select.value);
  }

  function handleServiceChange(value: string | undefined) {
    if (!value) return;

    setService(value);
  }

  function handleRegionChange(value: Region | undefined) {
    if (!value) return;

    scrollIntoView();
    setRegion(value);
  }

  /**
   * Needed due to opacity/scale logic between this section and hero
   */
  function scrollIntoView() {
    const section = document.getElementById(HERO_NETWORK_MAP_SECTION_ID);

    section?.scrollIntoView({
      inline: 'start',
      block: 'end',
      behavior: 'smooth',
    });
  }

  const filterLink = filters.cta[family];

  return (
    <css.SectionWrapper
      spacingTop='none'
      spacingBottom='none'
      region={region}
      {...sectionProps}
      transparent={transparent}
      tabIndex={0}
      id={HERO_NETWORK_MAP_SECTION_ID}
    >
      <css.FilterWrapper>
        <css.Heading2 id={id}>{heading}</css.Heading2>
        <Markdown>{copy}</Markdown>
        <css.Filter>
          <NetworkMapFilterItem
            {...FILTER_FAMILY_OPTIONS}
            value={family}
            onValueChange={handleFamilyChange}
          />

          <NetworkMapFilterItem
            {...filters.services[family].select}
            triggerLabel='Filter by service'
            value={service}
            onValueChange={handleServiceChange}
            placeholder='Services'
          />

          <NetworkMapFilterItem
            {...FILTER_REGION_OPTIONS}
            value={region}
            onValueChange={handleRegionChange}
            {...regionSelect}
          />
        </css.Filter>
        {filterLink && (
          <css.CTAWrapper>
            <CtaButton {...filterLink} linkIcon={FILTER_CTA_LINK_ICON} />
          </css.CTAWrapper>
        )}
      </css.FilterWrapper>
      <NetworkMapSprite
        enabledMap={filters.services[family].enabledMap[service]}
        family={family}
        service={service}
        region={region}
      />
      <css.NetworkMapBackgroundGradient />
    </css.SectionWrapper>
  );
};

export default NetworkMapSection;
