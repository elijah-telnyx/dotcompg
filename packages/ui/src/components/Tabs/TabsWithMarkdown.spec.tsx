import { render } from '@testing-library/react';

import TabsWithMarkdown from './TabsWithMarkdown';

const TabsContent = [
  {
    id: 'tab-1',
    label: 'Our network',
    copy: 'More points of presence give you lower latency anywhere on earth. Multi-cloud architecture provides peace-of-mind redundancy.',
  },
  {
    id: 'tab-2',
    label: 'Competitor networks',
    copy: 'More points of presence give you lower latency anywhere on earth. Multi-cloud architecture provides peace-of-mind redundancy.\n![Our network](//images.ctfassets.net/2vm221913gep/53dgOYiBF01d8bbninOW6p/a4c17e3deb6ef5d2d56ff85ae10cb0e8/out_network.png)',
  },
];

describe('TabsWithMarkdown', () => {
  it('should render with second tab selected', () => {
    const { container } = render(
      <TabsWithMarkdown
        tabList={TabsContent}
        heading='Tab heading'
        defaultValue='tab-1'
        backgroundColor='cream'
        hasOverflow={false}
        spacingBottom='continuous'
        spacingTop='contrasting'
        dark={false}
      />
    );

    expect(container).toHaveTextContent(TabsContent[0].copy);
  });
});
