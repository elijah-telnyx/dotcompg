import {
  type HTMLAttributes,
  type ImgHTMLAttributes,
  type ReactNode,
} from 'react';
import { A11ySVG } from '../../Icons/A11ySVG';
import { type Region } from '../utils';
import { type SpriteProps } from './networkMapSpritePaths';
import * as css from './NetworkMapSprite.styled';
import { NetworkMapPoPPath, NetworkMapPoPSVG } from './NetworkMapPoP';
import {
  PATH_ID_PREFIX,
  CONTAINER_ID,
  TOOLTIP_ID_PREFIX,
  POP_PIN_SERVICE_PATHS_BY_FAMILY,
  getOptionProperties,
  getSVGProperties,
  onFocusListOption,
  type NetworkMapSpriteProps,
  type NetworkMapTooltipProps,
  type SpriteElementProps,
} from './utils';

function NetworkMapOption({
  children,
  ...optionProps
}: HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  pin?: boolean;
  'data-region': string;
  region: Region;
}) {
  return <css.Option {...optionProps}>{children}</css.Option>;
}

function NetworkMapPath({
  id,
  'aria-label': ariaLabel,
  transform,
  ...props
}: SpriteElementProps) {
  return (
    <css.Path {...props} id={`${PATH_ID_PREFIX}${id}`}>
      <title>{`${ariaLabel} Map Path`}</title>
    </css.Path>
  );
}

function NetworkMapGraphics({
  id,
  group,
  'aria-label': ariaLabel,
  ...props
}: SpriteElementProps) {
  return (
    <>
      {group ? (
        <css.Group {...props}>
          {group.map((pathProps, index) => (
            <NetworkMapPath
              key={index}
              {...pathProps}
              id={id + index}
              aria-label={ariaLabel}
            />
          ))}
        </css.Group>
      ) : (
        <NetworkMapPath {...props} id={id} aria-label={ariaLabel} />
      )}
    </>
  );
}

function NetworkMapToolTip({
  title,
  description,
  family,
  ...props
}: NetworkMapTooltipProps) {
  const id = props.popId || props.id;
  const tooltipProps = {
    id: `${TOOLTIP_ID_PREFIX}${id}`,
    role: 'tooltip',
  };

  const flagProps: ImgHTMLAttributes<HTMLImageElement> = {
    alt: `Flag of ${title}`,
    src: `https://hatscripts.github.io/circle-flags/flags/${props.id.toLowerCase()}.svg`,
    loading: 'lazy',
  };

  if (description) {
    let copyProps = { children: description.join(', '), plural: false };

    if (family === 'iot') {
      copyProps = {
        children: `${description.length} Carrier`,
        plural: description.length > 1,
      };
    }

    return (
      <css.Tooltip
        {...tooltipProps}
        onClick={() => {
          navigator.clipboard.writeText(description.toString());
        }}
        copy
      >
        <css.Title>
          <css.TitleText>{title}</css.TitleText> <css.IconFlag {...flagProps} />
        </css.Title>
        <css.Copy {...copyProps} />
      </css.Tooltip>
    );
  }

  return (
    <css.Tooltip {...tooltipProps}>
      <css.Title>
        <css.TitleText>{title}</css.TitleText> <css.IconFlag {...flagProps} />
      </css.Title>
      <css.Copy>No coverage</css.Copy>
    </css.Tooltip>
  );
}

function NetworkMapSprite({
  enabledMap,
  family,
  service,
  region,
  ...props
}: NetworkMapSpriteProps) {
  const optionProperties = getOptionProperties(enabledMap);

  return (
    <css.Container
      id={CONTAINER_ID}
      role='listbox'
      tabIndex={-1}
      aria-label='Countries'
      onFocus={onFocusListOption()}
      {...props}
    >
      {Object.keys(optionProperties).map((id) => {
        const {
          role,
          tabIndex,
          'aria-disabled': ariaDisabled,
          'aria-label': ariaLabel,
          'data-region': dataRegion,
          description,
          x,
          y,
          width,
          height,
          ...svgGraphicsProps
        } = optionProperties[id];
        let popOptionProperties: { [location: string]: SpriteProps[string] } =
          {};
        const optionProps: HTMLAttributes<HTMLDivElement> & {
          pin?: boolean;
          'data-region': string;
        } = {
          id,
          role,
          tabIndex,
          'aria-disabled': ariaDisabled,
          'aria-label': ariaLabel,
          'data-region': dataRegion,
        };
        const popPinServicePathsProps = POP_PIN_SERVICE_PATHS_BY_FAMILY[family];

        if (
          popPinServicePathsProps &&
          popPinServicePathsProps[service] &&
          popPinServicePathsProps[service][id]
        ) {
          popOptionProperties = popPinServicePathsProps[service][id];
          // only show pins if there is a PoP SVG for the country
          optionProps.pin = !!popOptionProperties;
        }

        const tooltipProps = {
          id,
          title: ariaLabel,
          description,
          family,
        };

        return (
          <div key={id}>
            <NetworkMapOption {...optionProps} region={region}>
              <A11ySVG {...getSVGProperties(id)}>
                <NetworkMapGraphics
                  id={id}
                  aria-label={ariaLabel}
                  {...svgGraphicsProps}
                />
              </A11ySVG>
              <NetworkMapToolTip {...tooltipProps} />
            </NetworkMapOption>
            {Object.keys(popOptionProperties).map((popId) => {
              const {
                'aria-label': ariaLabel,
                'data-region': dataRegion,
                description,
                ...svgPathProps
              } = popOptionProperties[popId];

              return (
                <NetworkMapOption
                  key={popId}
                  region={region}
                  id={popId}
                  role={role}
                  tabIndex={0}
                  aria-label={ariaLabel}
                  data-region={dataRegion}
                >
                  <NetworkMapPoPSVG id={popId} aria-label={ariaLabel}>
                    <NetworkMapPoPPath
                      id={popId}
                      aria-label={ariaLabel}
                      data-region={dataRegion}
                      {...svgPathProps}
                    />
                  </NetworkMapPoPSVG>
                  <NetworkMapToolTip
                    id={id}
                    popId={popId}
                    title={ariaLabel}
                    description={description}
                    family={family}
                  />
                </NetworkMapOption>
              );
            })}
          </div>
        );
      })}
    </css.Container>
  );
}

export default NetworkMapSprite;
