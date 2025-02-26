import type { AirtableLLMRecord } from 'services/airtableService';

export const parseAirtableSEO = (airtableData: AirtableLLMRecord) => {
  const {
    seoTitle,
    seoDescription,
    ogTitle,
    ogDescription,
    ogImage,
    ogImgAlt,
    twitterTitle,
    twitterDescription,
    twitterImg,
    twitterImgAlt,
  } = airtableData;
  return {
    title: seoTitle,
    description: seoDescription,
    ogTitle,
    ogDescription,
    ogImage: ogImage?.length && { ...ogImage[0], src: ogImage[0].url },
    ogImgAlt,
    twitterTitle,
    twitterDescription,
    twitterImg: twitterImg?.length && { ...twitterImg[0], src: twitterImg[0].url },
    twitterImgAlt,
  };
};

export const parseAirtableHeader = (airtableData: AirtableLLMRecord) => {
  const { properName, excerpt } = airtableData;
  return {
    heading: properName,
    copy: excerpt,
  };
};

export const parseHowItWorksItems = (airtableData: AirtableLLMRecord) => {
  const { properName } = airtableData;
  return [
    {
      id: '5sPN2Dc94tRi20j5JQfnQu',
      title: 'LLM Library - How it works 1',
      heading: 'Create an account',
      copy: 'Sign-up to the Telnyx platform to get access to our suite of intuitive AI tools.',
      media: {
        src: 'https://images.ctfassets.net/2vm221913gep/30F7qmCnhd9FvK1Eugn6Rt/0ceeef1ae1863f24cf0b41953664e9df/Compute_Model-Library_HIW-1.png',
        alt: 'Sign-up to get started with the Telnyx model library',
        height: 1632,
        width: 1872,
        fm: 'webp',
        autoPlay: true,
        noVideoOnMobile: false,
      },
    },
    {
      id: '5zQpLwqJxc6YGwV2zKGmvj',
      title: 'LLM Library - How it works 2',
      heading: `Choose ${properName}`,
      copy: `In the [AI Playground](https://portal.telnyx.com/#/app/next/ai/ai-playground "Telnyx AI Playground") select ${properName} from the dropdown.`,
      media: {
        src: 'https://images.ctfassets.net/2vm221913gep/JDO8kJ6HmDydfHw2ZcJEz/a7eec2b406122b09b805b3e482b5f073/Compute_Model-Library_HIW-2.png',
        alt: 'Choose your LLM from our library of open-source and proprietary models',
        height: 1632,
        width: 1872,
        fm: 'webp',
        autoPlay: true,
        noVideoOnMobile: false,
      },
    },
    {
      id: '4tpg6SPkHCfmR4NnBfAFN0',
      title: 'LLM Library - How it works 3',
      heading: 'Enter your API key',
      copy: 'If you’re using a proprietary model, you’ll need your API key before prompting the LLM. Our vast selection of OS models allow you to get started right away. ',
      media: {
        src: 'https://images.ctfassets.net/2vm221913gep/1ViQkMlc2D2DJkxM4EtsMA/9f739d1a3c9ed8928628c45917b5f10d/Compute_Model-Library_HIW-3.png',
        alt: 'Enter your API key or choose an open source model',
        height: 1632,
        width: 1872,
        fm: 'webp',
        autoPlay: true,
        noVideoOnMobile: false,
      },
    },
    {
      id: '3CfXC7hEcAmexru9iKoFm2',
      title: 'LLM Library - How it works 4',
      heading: 'Prompt the LLM',
      copy: 'Get responses from an LLM in minutes, and scale with our [OpenAI-compatible APIs](https://developers.telnyx.com/docs/inference/openai "OpenAI compatibility matrix"). \n',
      media: {
        src: 'https://images.ctfassets.net/2vm221913gep/2oqVqSL7t4slyOf10dK8pZ/22febc89d38b0b0a12cd47377f902e6a/Product_Detail_How_It_Works_Inference_4.svg',
        alt: 'Prompt the LLM to get a response in seconds',
        height: 816,
        width: 936,
        fm: 'webp',
        autoPlay: true,
        noVideoOnMobile: false,
      },
    },
  ];
};
