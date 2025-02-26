import type * as T from 'lib/Pricing/@types';

const parseDataPricingToRowValue = (data: Record<string, { amount: number; tokens: string }>) => {
  return Object.entries(data)
    .map(([key, value]) => `${key}: $${value.amount} / ${value.tokens} tokens`)
    .join('<br/>');
};

const parseInferenceRowValue = () => {
  return [
    { amount: 0.0002, tokens: '1K', models: ['7B'] },
    { amount: 0.0003, tokens: '1K', models: ['13B', '34B', '8x7B'] },
    { amount: 0.0006, tokens: '1K', models: ['70B+'] },
  ]
    .map((value) => `$${value.amount} / ${value.tokens} tokens for ${value.models?.join(', ')} parameter models<br />`)
    .join(`<br />`);
};

export const fetchInferenceApiPricing = async (): Promise<T.TablesSectionProps['data']> => {
  const data = [
    ['Chat Completions per token', parseInferenceRowValue(), 'Up to 90% cheaper vs. OpenAI GPT-3.5 Turbo'],
    [
      'Embeddings per token',
      parseDataPricingToRowValue({
        Small: { amount: 0.00005, tokens: '1K' },
        Large: { amount: 0.0001, tokens: '1K' },
      }),
      'Up to 50% cheaper vs. OpenAI Ada',
    ],
    ['Speech to text per minute', '$0.003 / minute', 'Up to 50% cheaper vs. OpenAI Whisper'],
    ['AI-enabled storage and retrieval', '$0.02 / GB / day', 'At least 90% cheaper vs. OpenAI Assistant Retrieval'],
  ];

  return {
    USD: [
      {
        columns: 3,
        caption: 'Service pricing',
        head: [
          { label: { value: 'Service', category: true } },
          { label: { value: 'Price', category: true } },
          { label: { value: '% Cheaper', category: true } },
        ],
        body: data.map(([label, ...cols]) => ({
          label: { value: label },
          data: { value: cols },
        })),
      },
    ],
  };
};
