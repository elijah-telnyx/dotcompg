import type { Meta, StoryObj } from '@storybook/react';
import ComboBox, { type ComboBoxProps } from './ComboBox';
import { useState } from 'react';

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
  { label: 'Hindi', value: 'hi' },
  { label: 'Arabic', value: 'ar' },
  { label: 'Turkish', value: 'tr' },
  { label: 'Italian', value: 'it' },
  { label: 'Dutch', value: 'nl' },
  { label: 'Polish', value: 'pl' },
  { label: 'Swedish', value: 'sv' },
  { label: 'Norwegian', value: 'no' },
  { label: 'Danish', value: 'da' },
  { label: 'Finnish', value: 'fi' },
  { label: 'Czech', value: 'cs' },
  { label: 'Hungarian', value: 'hu' },
  { label: 'Greek', value: 'el' },
  { label: 'Bulgarian', value: 'bg' },
  { label: 'Romanian', value: 'ro' },
  { label: 'Indonesian', value: 'id' },
  { label: 'Vietnamese', value: 'vi' },
  { label: 'Thai', value: 'th' },
  { label: 'Hebrew', value: 'he' },
  { label: 'Catalan', value: 'ca' },
  { label: 'Croatian', value: 'hr' },
  { label: 'Lithuanian', value: 'lt' },
  { label: 'Slovak', value: 'sk' },
  { label: 'Ukrainian', value: 'uk' },
  { label: 'Filipino', value: 'fil' },
  { label: 'Latvian', value: 'lv' },
  { label: 'Estonian', value: 'et' },
  { label: 'Slovenian', value: 'sl' },
  { label: 'Serbian', value: 'sr' },
  { label: 'Persian', value: 'fa' },
  { label: 'Malay', value: 'ms' },
  { label: 'Afrikaans', value: 'af' },
  { label: 'Swahili', value: 'sw' },
  { label: 'Esperanto', value: 'eo' },
];

const Main: Meta<ComboBoxProps> = {
  title: 'Components/ComboBox',
  component: ComboBox,
  args: {
    options: languages,
    placeholder: 'Select a language',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default Main;

type story = StoryObj<ComboBoxProps>;

export const Default: story = {};

export const LightTheme: story = {
  args: {
    theme: 'light',
    disabled: false,
  },
};
export const DarkTheme: story = {
  args: {
    theme: 'dark',
    disabled: false,
  },
};

export const ControlledState: story = {
  render: function Render(args) {
    const [value, setValue] = useState(languages[0].value);
    return (
      <div style={{ maxWidth: 600 }}>
        {value}
        <ComboBox
          {...args}
          value={value}
          onSelect={(option) => setValue(option.value)}
        />
      </div>
    );
  },
  args: {
    theme: 'light',
  },
};
