import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import * as Inference from '.';
import { useState, type PropsWithChildren } from 'react';
import Heading from '../Typography/Heading';
import Label from '../Typography/Label';
import Button from '../Button';
import ComboBox from '../ComboBox';
import Slider from '../Input/Slider';
import Input from '../Input';
import { InferenceChatContainer } from './components/InferenceChat/InferenceChatContainer';

const Main: Meta = {
  title: 'Components/Inference',
  component: Inference.Root,
};

export default Main;

export const Assembled = {
  render: function Render() {
    function handleSendMessage(messageText: string) {
      alert(`Sending message: ${messageText}`);
    }

    const [isOpen, setIsOpen] = useState(false);

    return (
      <Inference.Root>
        <div style={{ marginLeft: 'auto', marginBottom: 156 }}>
          <Inference.FloatingMenu
            label='Advanced Settings'
            isOpen={isOpen}
            onOpenChange={(newValue) => setIsOpen(newValue)}
          >
            <form
              style={{ display: 'grid', gap: 8, maxWidth: 392 }}
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <ComboBox
                theme='light'
                placeholder='Select an option'
                options={[
                  { label: 'Option 1', value: 'option1' },
                  { label: 'Option 2', value: 'option2' },
                  { label: 'Option 3', value: 'option3' },
                ]}
              />
              <div>
                <Label id='temperature'>Temperature</Label>
                <Slider
                  id='temperature-slider'
                  defaultValue={[0.9]}
                  describedBy='temperature'
                  name='temperature'
                  min={0}
                  max={1}
                  step={0.01}
                  theme='light'
                />
              </div>
              <div>
                <Label>Prompt</Label>
                <Input
                  type='textarea'
                  id='prompt'
                  name='prompt'
                  defaultValue='You are a helpful assistant that summarizes long bodies of text.'
                />
              </div>
              <Button
                type='submit'
                style={{ maxWidth: 'fit-content', marginTop: 16 }}
                onClick={() => setIsOpen(false)}
              >
                Confirm
              </Button>
            </form>
          </Inference.FloatingMenu>
        </div>

        <Heading level={3} css={{ marginBottom: '$xl' }}>
          What can I help with?
        </Heading>
        <div style={{ maxWidth: 454, marginInline: 'auto', width: '100%' }}>
          <Inference.MessageInput
            label='Message'
            onMessage={handleSendMessage}
          />
        </div>

        <Label
          css={{
            textAlign: 'center',
            marginInline: 'auto',
            marginTop: '$large',
            marginBottom: '$small',
          }}
        >
          Suggested topics
        </Label>
        <div style={{ display: 'flex', gap: 8, marginBottom: 156 }}>
          {['Draft a 10DLC messaging campaign', 'What is an eSIM?'].map(
            (label) => (
              <Inference.SuggestionButton
                key={label}
                onClick={() => handleSendMessage(label)}
              >
                {label}
              </Inference.SuggestionButton>
            )
          )}
        </div>
      </Inference.Root>
    );
  },
};

export const Root: StoryObj<PropsWithChildren> = {
  render(args) {
    return <Inference.Root {...args} />;
  },
  args: {
    children: 'Inference Root',
  },
};

export const SuggestionButton: StoryObj<PropsWithChildren> = {
  render(args) {
    return <Inference.SuggestionButton {...args} />;
  },
  args: {
    children: 'How can bi-directional streaming improve my call center?',
  },
};

export const FloatingMenu: StoryObj<
  PropsWithChildren<Inference.InferenceFloatingMenuProps>
> = {
  render(args) {
    return <Inference.FloatingMenu {...args} />;
  },
  args: {
    children: <div>Card content</div>,
    label: 'Advanced Settings',
  },
};

export const ChatBubble: StoryObj<
  PropsWithChildren<Inference.InferenceChatBubbleProps>
> = {
  render(args) {
    return (
      <>
        <Inference.ChatBubble {...args} />
        <Inference.ChatBubble {...args} variant='receiver' />
        <Inference.ChatBubble {...args} variant='sender' />
      </>
    );
  },
  args: {
    children: 'Card content',
    variant: 'sender',
  },
};

export const Chat: StoryObj<
  PropsWithChildren<Inference.InferenceChatBubbleProps>
> = {
  render(args) {
    return (
      <div
        style={{
          maxWidth: 980,
          marginInline: 'auto',
          width: '100%',
          height: '100%',
          maxHeight: 400,
        }}
      >
        <InferenceChatContainer>
          <Inference.ChatBubble variant='sender'>
            Please give me a simple example of telnyx API with node
          </Inference.ChatBubble>
          <Inference.ChatBubble {...args} />
          <Inference.ChatBubble variant='sender'>
            Thank you!
          </Inference.ChatBubble>
        </InferenceChatContainer>
      </div>
    );
  },
  args: {
    children: `I'll need to call a code example generator tool to give an example using node. I need a library to generate the example though, for this I'll need a library that has both Telnyx API examples and Nodejs supported. Let me call this tool.
    \`\`\`javascript
// Requires 'axios' library to send HTTP requests
// First install the axios package with: npm install axios
const axios = require('axios');

// Set API key and API secret
const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';

// Create a new axios instance with authentication
const instance = axios.create({
  baseURL: 'https://api.telnyx.com',
  auth: {
    username: apiKey,
    password: apiSecret
  }
});

// Example to get an account
instance.get('/v2/account')
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
\`\`\``,
    variant: 'receiver',
  },
};

export const MessageInput: StoryObj<Inference.InferenceMessageInputProps> = {
  render(args) {
    return <Inference.MessageInput {...args} />;
  },
  args: {
    placeholder: 'Inference Input',
    label: 'Initial Inference Input',
    onMessage: alert,
  },
  play: ({ canvasElement }) => {
    const { getByLabelText } = within(canvasElement);
    const input = getByLabelText('Initial Inference Input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
    expect(input).toHaveAttribute('placeholder', 'Inference Input');
    const addedInputValue =
      'How can bi-directional streaming improve my call center?';
    userEvent.type(input, addedInputValue);
    expect(input).toHaveValue(addedInputValue);
  },
};

export const ChatBubbleWithCode: StoryObj<
  PropsWithChildren<Inference.InferenceChatBubbleProps>
> = {
  render(args) {
    return (
      <InferenceChatContainer>
        <Inference.ChatBubble variant='sender'>
          Please give me a simple example of telnyx API with node
        </Inference.ChatBubble>
        <Inference.ChatBubble {...args} />
        <Inference.ChatBubble variant='sender'>Thank you!</Inference.ChatBubble>
      </InferenceChatContainer>
    );
  },
  args: {
    children: `I'll need to call a code example generator tool to give an example using node. I need a library to generate the example though, for this I'll need a library that has both Telnyx API examples and Nodejs supported. Let me call this tool.
    \`\`\`javascript
// Requires 'axios' library to send HTTP requests
// First install the axios package with: npm install axios
const axios = require('axios');

// Set API key and API secret
const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';

// Create a new axios instance with authentication
const instance = axios.create({
  baseURL: 'https://api.telnyx.com',
  auth: {
    username: apiKey,
    password: apiSecret
  }
});

// Example to get an account
instance.get('/v2/account')
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
\`\`\``,
    variant: 'receiver',
  },
};
