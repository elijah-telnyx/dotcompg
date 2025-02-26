import { useState } from 'react';
import { useRouter } from 'next/router';
import Heading from 'ui/components/Typography/Heading';
import Select, { type SelectProps } from 'ui/components/Select';

import NetworkMapSprite, { type NetworkMapSpriteProps } from 'ui/components/NetworkMapSection/NetworkMapSprite';
import { type CTAButtonProps } from 'ui/components/CtaButton';
import {
  FILTER_FAMILY_OPTIONS,
  FILTER_REGION_OPTIONS,
  getFamilyOptionFromQuery,
  getServiceOptionFromQuery,
  type ProductFamily,
  type Region,
} from 'ui/components/NetworkMapSection/utils';
import * as css from './InteractiveOurNetwork.styled';
import * as cssDevFocus from '../InteractiveDeveloperFocus.styled';

export type NetworkMapFilterItemProps = SelectProps & { value: string };

export interface InteractiveOurNetworkProps {
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
  isDark?: boolean;
}

export const NetworkMapFilterItem = ({ ...props }: NetworkMapFilterItemProps) => {
  return (
    <css.FilterItem>
      <Heading level={2} category>
        {props.placeholder}
      </Heading>

      <Select {...props}></Select>
    </css.FilterItem>
  );
};

export const InteractiveOurNetwork = ({
  heading,
  copy,
  filters,
  regionSelect = {},
  transparent,
  isDark,
  ...props
}: InteractiveOurNetworkProps) => {
  const router = useRouter();
  const [family, setFamily] = useState<ProductFamily>(getFamilyOptionFromQuery(router.query?.product));
  const [service, setService] = useState<string>(
    getServiceOptionFromQuery(router.query?.service, filters.services[family].select)
  );
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
    <cssDevFocus.InteractiveContainer>
      <cssDevFocus.ContentItem xs={4} small={6} medium={12} large={12} xl={8}>
        <css.TextBlock>
          <css.HeadingWrapper>
            <Heading
              level={3}
              alt={{
                '@medium': true,
              }}
              dark={isDark}
            >
              {heading}
            </Heading>
          </css.HeadingWrapper>

          <css.FilterWrapper>
            <css.Copy>{copy}</css.Copy>
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
          </css.FilterWrapper>
        </css.TextBlock>
      </cssDevFocus.ContentItem>

      <cssDevFocus.InteractiveItem
        xs={4}
        small={8}
        medium={12}
        transparent={transparent}
        noScroll
        noRelative={!!region}
      >
        <css.Wrapper region={region} {...props} tabIndex={0}>
          <NetworkMapSprite
            enabledMap={filters.services[family].enabledMap[service]}
            family={family}
            service={service}
            region={region}
          />
          <css.NetworkMapBackgroundGradient />
        </css.Wrapper>
      </cssDevFocus.InteractiveItem>
    </cssDevFocus.InteractiveContainer>
  );
};

export default InteractiveOurNetwork;
