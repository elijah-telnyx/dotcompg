import type { Meta, StoryObj } from '@storybook/react';

import Codes, { type CodesProps } from './Codes';

const componentMeta: Meta<CodesProps> = {
  title: 'Components/Codes',
  component: Codes,
  args: {
    items: [
      {
        heading: 'PHP',
        code: `
    \\Telnyx\\Telnyx::setApiKey("YOUR_API_KEY");

    \\Telnyx\\SimCard::Update(id, ["authorized_imeis" => ["106516771852751","534051870479563","508821468377961"]]);
    \\Telnyx\\SimCard::Update(id, ,"data_limit" => ["amount" => "2048.1","unit" => "MB"]]);`,
      },
      {
        heading: 'Node',
        code: `
    const telnyx = require('telnyx')('YOUR_API_KEY');

    const { data: simCard } = await telnyx.simCards.update(
      id,
      { tags: ['region_7', 'int_cards'] }
    );`,
      },
      {
        heading: 'Ruby',
        code: `
    require "telnyx"
    Telnyx.api_key = "YOUR_API_KEY"

    Telnyx::SimCard.update(id, tags: ["region_7", "int_cards"])`,
      },
      {
        heading: 'Python',
        code: `
    import telnyx
    telnyx.api_key = "YOUR_API_KEY"

    res = telnyx.SIMCard.retrieve(id)
    res.created_at = "2018-02-02T22:25:27.521Z"
    res.iccid = "89310410106543789301"

    res.save()`,
      },
      {
        heading: '.NET',
        code: `
    TelnyxConfiguration.SetApiKey('YOUR_API_KEY');

    var service = new NumberReservationsService();
    var listOptions = new NumberReservationsListOptions
    {
      //options
    };
    service.list(listOptions);`,
      },
      {
        heading: 'Java',
        code: `
    import com.telnyx.sdk.ApiClient;
    import com.telnyx.sdk.ApiException;
    import com.telnyx.sdk.Configuration;
    import com.telnyx.sdk.auth.*;
    import com.telnyx.sdk.model.*;

    var service = new Service();
    service.Get(params)`,
      },
    ],
  },
};

export default componentMeta;

type Story = StoryObj<CodesProps>;

export const Default: Story = {};
export const Alternative: Story = {
  args: {
    alt: true,
  },
};
