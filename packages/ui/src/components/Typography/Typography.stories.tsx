import type { Meta } from '@storybook/react';
import ParagraphComponent, {
  type Paragraph as ParagrapProps,
} from './Paragraph';
import CaptionComponent from './Caption';
import StatisticsComponent from './Statistics';
import QuoteComponent, { type Quote as QuoteProps } from './Quote';
import CTAComponent from './CTA';
import CodeComponent from './Code';
import LinkComponent from './Link';
import LabelComponent from './Label';

const componentMeta: Meta<any> = {
  title: 'Components/Typography',
  argTypes: {
    children: {
      control: 'text',
    },
    dark: {
      control: 'boolean',
      defaultValue: false,
    },
  },
};

export default componentMeta;

export const Paragraph = (args: ParagrapProps) => (
  <ParagraphComponent {...args}></ParagraphComponent>
);
Paragraph.args = { children: 'Paragraph', lead: false };

export const Caption = (args: any) => (
  <CaptionComponent {...args}></CaptionComponent>
);
Caption.args = { children: 'Caption' };

export const Statistics = (args: any) => (
  <StatisticsComponent {...args}></StatisticsComponent>
);
Statistics.args = { children: 'Statistics', major: false };

export const Quote = (args: QuoteProps) => (
  <QuoteComponent {...args}></QuoteComponent>
);
Quote.args = { children: 'Quote', useQuotes: true };

export const CTA = (args: any) => <CTAComponent {...args}></CTAComponent>;
CTA.args = { children: 'TextCTA' };

export const Code = (args: any) => <CodeComponent {...args}></CodeComponent>;
Code.args = { children: 'Code' };

export const Link = (args: ParagrapProps) => (
  <LinkComponent {...args}></LinkComponent>
);
Link.args = { children: 'Link', lead: false };

export const Label = (args: any) => <LabelComponent {...args}></LabelComponent>;
Label.args = { children: 'Label' };
