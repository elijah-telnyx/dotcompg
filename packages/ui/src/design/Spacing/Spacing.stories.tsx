import type { Meta } from '@storybook/react';

import * as SpacingSizes from './';

const SpacingSizesOrdered = {
  XXS: SpacingSizes.XXS,
  XS: SpacingSizes.XS,
  Small: SpacingSizes.Small,
  Medium: SpacingSizes.Medium,
  Large: SpacingSizes.Large,
  XL: SpacingSizes.XL,
  XXL: SpacingSizes.XXL,
  Huge: SpacingSizes.Huge,
  XH: SpacingSizes.XH,
};

export const Spacing = () => {
  return (
    <>
      {Object.entries(SpacingSizesOrdered).map(([name, SpacingSize]) => {
        return <SpacingSize key={name}>{name}</SpacingSize>;
      })}
    </>
  );
};

const componentMeta: Meta<typeof Spacing> = {
  title: 'Design/Spacing',
  component: Spacing,
  parameters: {
    options: {
      showPanel: false,
    },
  },
};

export default componentMeta;
