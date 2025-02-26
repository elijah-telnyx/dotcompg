import type { ThemedCSS } from '../../styles/config/stitches.config';
import * as style from './GridExtended.styled';
import { extendCss } from '../../utils/extendCss';
import type { StyledComponent } from '@stitches/react/types/styled-component';

type BreakpointSize = number;
export interface GridExtendedItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  xs?: BreakpointSize;
  small?: BreakpointSize;
  medium?: BreakpointSize;
  large?: BreakpointSize;
  xl?: BreakpointSize;
  htmlAs?: keyof JSX.IntrinsicElements | StyledComponent<'div'>;
  css?: ThemedCSS;
}

export const fullWidthColumns = {
  xs: 4,
  small: 8,
  medium: 12,
  large: 12,
  xl: 12,
};

export const Container = style.Container;

export const Item = ({
  xs,
  small,
  medium,
  large,
  xl,
  css,
  htmlAs,
  ...props
}: GridExtendedItemProps) => {
  return (
    <style.Item
      as={htmlAs}
      css={extendCss({
        customCss: css,
        css: {
          gridItemWidth: xs,
          '@xs': { ...css?.['@xs'] },
          '@small': { ...css?.['@small'], gridItemWidth: small },
          '@medium': { ...css?.['@medium'], gridItemWidth: medium },
          '@large': { ...css?.['@large'], gridItemWidth: large },
          '@xl': { ...css?.['@xl'], gridItemWidth: xl },
        },
      })}
      {...props}
    />
  );
};

export const FullWidthItem = (props: GridExtendedItemProps) => (
  <Item {...fullWidthColumns} {...props} />
);
