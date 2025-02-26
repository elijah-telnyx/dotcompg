import { useState } from 'react';
import Heading from 'ui/components/Typography/Heading';
import Markdown from 'ui/components/Markdown';
import Select, { type SelectProps } from 'ui/components/Select';
import NetworkMapSprite, { type NetworkMapSpriteProps } from 'ui/components/NetworkMapSection/NetworkMapSprite';
import { type CTAButtonProps } from 'ui/components/CtaButton';
import {
  FILTER_FAMILY_OPTIONS,
  FILTER_REGION_OPTIONS,
  type Region,
  type ProductFamily,
} from 'ui/components/NetworkMapSection/utils';

import * as css from './NetworkMap.styled';

export type NetworkMapFilterItemProps = SelectProps & { inline?: boolean; value: string };

export interface NetworkMapProps {
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

export const NetworkMapFilterItem = ({ inline, ...props }: NetworkMapFilterItemProps) => {
  return (
    <css.FilterItem inline={inline}>
      <Heading level={2} category>
        {props.placeholder}
      </Heading>

      <Select {...props}></Select>
    </css.FilterItem>
  );
};

export const NetworkMap = ({ heading, copy, filters, regionSelect = {}, ...props }: NetworkMapProps) => {
  const [family, setFamily] = useState<ProductFamily>(FILTER_FAMILY_OPTIONS['items'][0]['value'] as ProductFamily);
  const [service, setService] = useState<string>(filters.services[family].select.value);
  const [region, setRegion] = useState<Region>(FILTER_REGION_OPTIONS['items'][0]['value'] as Region);
  const [values, setValues] = useState<{ family: ProductFamily; service: string; region: Region }>({
    family,
    service,
    region,
  });

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

  function onClickUpdateMap() {
    setValues({
      family,
      service,
      region,
    });
  }

  // form dirty logic
  const hasMapUpdates = values.family !== family || values.service !== service || values.region !== region;

  return (
    <css.Wrapper region={values.region} tabIndex={0} {...props}>
      <css.FilterWrapper>
        <Heading level={3}>{heading}</Heading>
        <Markdown>{copy}</Markdown>
        <css.Filter>
          <NetworkMapFilterItem {...FILTER_FAMILY_OPTIONS} value={family} onValueChange={handleFamilyChange} />

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

        <css.ButtonWrapper>
          <css.Button kind='primary' type='button' onClick={onClickUpdateMap} disabled={!hasMapUpdates}>
            Update map
          </css.Button>
        </css.ButtonWrapper>
      </css.FilterWrapper>
      <NetworkMapSprite
        enabledMap={filters.services[values.family].enabledMap[values.service]}
        family={values.family}
        service={values.service}
        region={values.region}
      />
      <css.NetworkMapBackgroundGradient />
    </css.Wrapper>
  );
};

export default NetworkMap;
