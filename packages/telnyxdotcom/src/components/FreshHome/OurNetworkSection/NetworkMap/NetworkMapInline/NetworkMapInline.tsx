import { useState } from 'react';

import Markdown from 'ui/components/Markdown';
import NetworkMapSprite from 'ui/components/NetworkMapSection/NetworkMapSprite';

import {
  FILTER_FAMILY_OPTIONS,
  FILTER_REGION_OPTIONS,
  type Region,
  type ProductFamily,
} from 'ui/components/NetworkMapSection/utils';
import { NetworkMapFilterItem, type NetworkMapProps } from '../NetworkMap';

import * as networkMapCss from '../NetworkMap.styled';

export type NetworkMapInlineProps = NetworkMapProps;

export const NetworkMapInline = ({ heading, copy, filters, regionSelect = {}, ...props }: NetworkMapInlineProps) => {
  const [family, setFamily] = useState<ProductFamily>(FILTER_FAMILY_OPTIONS['items'][0]['value'] as ProductFamily);
  const [service, setService] = useState<string>(filters.services[family].select.value);
  const [region, setRegion] = useState<Region>(FILTER_REGION_OPTIONS['items'][0]['value'] as Region);

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

    setRegion(value);
  }

  return (
    <>
      <networkMapCss.FilterWrapper inline>
        <Markdown>{copy}</Markdown>
        <networkMapCss.Filter>
          <NetworkMapFilterItem {...FILTER_FAMILY_OPTIONS} value={family} onValueChange={handleFamilyChange} inline />

          <NetworkMapFilterItem
            {...filters.services[family].select}
            triggerLabel='Filter by service'
            value={service}
            onValueChange={handleServiceChange}
            placeholder='Services'
            inline
          />

          <NetworkMapFilterItem
            {...FILTER_REGION_OPTIONS}
            value={region}
            onValueChange={handleRegionChange}
            {...regionSelect}
            inline
          />
        </networkMapCss.Filter>
      </networkMapCss.FilterWrapper>
      <networkMapCss.Wrapper region={region} tabIndex={0} {...props} inline>
        <NetworkMapSprite
          enabledMap={filters.services[family].enabledMap[service]}
          family={family}
          service={service}
          region={region}
        />
        <networkMapCss.NetworkMapBackgroundGradient />
      </networkMapCss.Wrapper>
    </>
  );
};

export default NetworkMapInline;
