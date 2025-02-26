import type { Meta, StoryObj } from '@storybook/react';
import 'glider-js/glider.min.css';

import DocSection from './DocSection';

const Main: Meta = {
  title: 'Components/DocSection',
  component: DocSection,
};

export default Main;

type Story = StoryObj;

export const Default: Story = {
  args: {
    tagline: 'Build Next-Gen Connectivity',
    heading: 'Empower innovation with our API-first platform',
    copy: 'Equip your developers with a comprehensive suite of APIs, SDKs, and tools via Telnyx’s robust, modular, multi-cloud platform. Build innovative, AI-centric communications and connectivity products confidently, backed by a real-time network, low-latency inference, and secure, scalable infrastructure.',
    ctaButtons: [
      {
        text: 'Explore Dev Docs',
        type: 'button',
        href: 'https://developers.telnyx.com',
        buttonKind: 'primary',
        buttonIcon: {
          src: '',
          svg: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="c-hFGGuH"><g clip-path="url(#:r1i:)"><path d="M3.29289 15.2929L2.58579 16L4 17.4142L4.70711 16.7071L3.29289 15.2929ZM4.70711 16.7071L12.8671 8.54709L11.4529 7.13288L3.29289 15.2929L4.70711 16.7071Z" fill="currentColor"></path><path d="M15.7026 3.03247C16.4844 2.77188 17.2281 3.51562 16.9675 4.29738L14.7116 11.065C14.4765 11.7703 13.5815 11.9816 13.0558 11.4559L8.54405 6.94415C8.0184 6.4185 8.2297 5.52343 8.93493 5.28835L15.7026 3.03247Z" fill="currentColor"></path></g><defs><clipPath id=":r1i:"><rect width="20" height="20" fill="white"></rect></clipPath></defs></svg>',
        },
      },
    ],
    codes: [
      {
        id: 'purchase-a-phone-number',
        label: 'Purchase a phone number',
        code: '```shell \\\n  curl -i -X POST "https://api.telnyx.com/v2/number_orders" \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer YOUR_TELNYX_API_KEY" \\\n  -d \'{\n    "phone_numbers": [\n      {"phone_number": "+15558675309"}\n    ]\n  }\'```',
        endpoint: 'pathname:///api/numbers/create-number-order',
      },
      {
        id: 'make-a-phone-call',
        label: 'Make a phone call',
        code: '```shell \\\n  curl -i -X POST "https://api.telnyx.com/v2/calls" \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer YOUR_TELNYX_API_KEY" \\\n  -d \'{\n    "connection_id": "YOUR_CONNECTION_ID",\n    "to": "+15551234567",\n    "from": "+15557654321",\n    "webhook_url": "https://your-webhook.url/events"\n  }\'```',
        endpoint: 'pathname:///api/call-control/dial-call',
      },
      {
        id: 'send-a-message',
        label: 'Send a message',
        code: '```shell \\\n  curl -i -X POST "https://api.telnyx.com/v2/messages" \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer YOUR_TELNYX_API_KEY" \\\n  -d \'{\n    "from": "+15557654321",\n    "to": "+15551234567",\n    "text": "Hello world, this is a test message from Telnyx!"\n  }\'```',
        endpoint: 'pathname:///api/messaging/send-message',
      },
      {
        id: 'purchase-an-esim',
        label: 'Purchase an ESIM',
        code: '```shell \\\n  curl -i -X POST \\\n  https://api.telnyx.com/v2/sim_card_orders \\\n  -H \'Authorization: Bearer YOUR_TELNYX_API_KEY\' \\\n  -H \'Content-Type: application/json\' \\\n  -d \'{\n    "address_id": "1293384261075731499",\n    "quantity": 210\n  }\'```',
        endpoint: 'pathname:///api/wireless/purchase-e-sim',
      },
      {
        id: 'create-a-storage-bucket',
        label: 'Create a storage bucket',
        code: '```shell \\\n  PUT /mybucket HTTP/1.1\n  Host:  [region].telnyxstorage.com\n  Accept: text/xml\n  x-amz-acl: private\n  Content-Type: application/xml\n  X-Amz-Content-Sha256: beaead3198f7da1e70d03ab969765e0821b24fc913697e929e726aeaebf0eba3\n  X-Amz-Date: 20230927T152207Z\n  Authorization: AWS4-HMAC-SHA256 Credential=YOUR_TELNYX_API_KEY/20230927/test/execute-api/aws4_request, SignedHeaders=accept;content-length;content-type;host;x-amz-acl;x-amz-content-sha256;x-amz-date, Signature=eb67629c5cd507c56c5c5447323cc0190c605ab87c2b2fd3046825ca09a28425\n  Content-Length: 197\n  \n  <?xml version="1.0" encoding="UTF-8"?>\n  <CreateBucketConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">\n      <LocationConstraint>us-east-1</LocationConstraint>\n  </CreateBucketConfiguration>```',
        endpoint:
          'pathname:///api/cloud-storage/bucket-operations/create-bucket',
      },
      {
        id: 'chat-with-language-model',
        label: 'Chat with a language model',
        code: '```shell \\\n  curl -i -X POST \\\n  https://api.telnyx.com/v2/ai/chat/completions \\\n  -H \'Authorization: Bearer YOUR_TELNYX_API_KEY\' \\\n  -H \'Content-Type: application/json\' \\\n  -d \'{\n    "messages": [\n      {\n        "role": "user",\n        "content": "Hello, World!"\n      }\n    ],\n    "model": "mistralai/Mistral-7B-Instruct-v0.1"\n  }\'```',
        endpoint:
          'pathname:///api/inference/inference-embedding/chat-public-chat-completions-post',
      },
    ],
  },
};
