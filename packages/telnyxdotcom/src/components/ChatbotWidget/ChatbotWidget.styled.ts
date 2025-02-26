import { styled } from 'ui/styles';
import { CHATBOT_STATUS } from './constants';
import { TelnyxLogo } from 'ui/components/Icons';

export const Container = styled('div', {
  position: 'fixed',
  zIndex: 9999,
  bottom: '20px',
  right: '20px',
  borderRadius: '16px',
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 5px 40px',
  maxHeight: '700px',
  width: '0',
  height: '0',
  opacity: '0',
  transition:
    'width 325ms cubic-bezier(0, 1.2, 1, 1) 0s, height 325ms cubic-bezier(0, 1.2, 1, 1) 0s, transform 300ms cubic-bezier(0, 1.2, 1, 1) 0s, opacity 83ms cubic-bezier(0, 1.2, 1, 1) 0s',
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  gridAutoRows: 'min-content',
  variants: {
    open: {
      true: {
        width: '400px',
        height: '80vh',
        opacity: '1',
      },
    },
  },
  backgroundColor: '$black',
});

export const Header = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'minmax(60px, auto) auto auto',
  height: 200,
  backgroundColor: '$black',
  borderRadius: '16px 16px 0 0',
  padding: '20px 0 20px 20px',
  transition: 'height 325ms ease',
  alignItems: 'center',
  variants: {
    hasMessages: {
      true: {
        padding: '16px 0 16px 16px',
        height: 56,
      },
    },
  },
});

export const StatusIndicator = styled('div', {
  backgroundColor: '$cream',
  fontFamily: '$fonts$inter',
  fontSize: '12px',
  padding: '2px 8px',
  borderRadius: '14px',
  width: 'fit-content',
  textTransform: 'capitalize',

  variants: {
    status: {
      [CHATBOT_STATUS.operational]: {
        color: '$orange',
      },
      [CHATBOT_STATUS.offline]: {
        color: '$redAlt',
      },
      [CHATBOT_STATUS.maintenance]: {
        color: '$blue',
      },
      [CHATBOT_STATUS.degraded]: {
        color: '$orange',
      },
    },
  },
});
export const HeaderTextArea = styled('div', {
  alignSelf: 'end',
});

export const TelnyxIcon = styled(TelnyxLogo, {
  color: '$green',
  height: 32,
  width: 32,
  variants: {
    hasMessages: {
      true: {
        height: 24,
        width: 24,
      },
    },
  },
});

/**
 * @link https://github.com/team-telnyx/frontend-design-core/blob/73ba7f0731990ac5579202f19f90ffa860d5d601/design-tokens/design-tokens-theme-portal.yaml#L133C1-L138C24
 */
const heading4Styles = {
  fontFamily: '$fonts$formula',
  fontWeight: '500',
  fontSize: '22px',
  lineHeight: '30px',
  letterSpacing: '0px',
  color: '$black',
};

export const HeaderText = styled('h4', {
  ...heading4Styles,
  color: '$cream',
  fontFamily: '$fonts$formula',
  fontSize: '24px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginTop: '12px',
  marginBottom: '8px',
  '> span': {
    translate: '0 4px',
  },
});

export const SmallHeaderText = styled('p', HeaderText, {
  fontSize: '16px',
  margin: '0',
  gridColumnStart: 2,
});

export const HeaderSubText = styled('p', {
  color: '$cream',
  fontFamily: '$fonts$inter',
  fontSize: '14px',
  lineHeight: '18px',
  fontWeight: '400',
  '& a': {
    color: '$citron',
    textDecoration: 'underline',
    '&:hover': {
      color: '$cream',
    },
  },
});

const ActionButton = styled('button', {
  margin: '0 8px',
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'transparent',
  fontSize: '20px',
  display: 'flex',
  alignItems: 'center',
  color: '$grayHoverLightBackground',
  borderRadius: '4px',
  justifySelf: 'end',
  alignSelf: 'start',
  variants: {
    hasMessages: {
      true: {
        alignSelf: 'center',
      },
    },
  },
});

export const HeaderCloseButton = styled(ActionButton, {
  color: '$cream',
  width: 24,
  height: 24,
});

export const InputArea = styled('div', {
  backgroundColor: '$cream',
  borderRadius: '0 0 16px 16px',
  textAlign: 'center',
});

export const OfflineHelpButton = styled('button', {
  color: '$cream',
  backgroundColor: '$black',
  fontSize: '14px',
  lineHeight: '20px',
  width: '320px',
  padding: '8px 10px',
  border: 'none',
  borderRadius: '20px',
  margin: '20px',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$green',
  },
});

export const InputFieldContainer = styled('div', {
  alignSelf: 'end',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  margin: '10px',
  borderRadius: '16px',
  backgroundColor: '$cream',
  outline: '$grayHoverDarkBackground 1px solid',
  '&:focus-within': {
    boxShadow: '#0000001a 0px 0px 100px 0px',
    outline: '$grayHoverLightBackground 1px solid',
  },
});

export const InputField = styled('textarea', {
  backgroundColor: '$cream',
  color: '$black',
  fontFamily: '$fonts$inter',
  overflowY: 'auto',
  resize: 'none',
  border: 'none',
  width: '100%',
  margin: '20px 10px',
  fontSize: '14px',
  height: 'auto',
  maxHeight: '5rem',
  whiteSpace: 'pre-wrap',
  overflowWrap: 'break-word',
  '&::placeholder': {
    color: '$grayHoverDarkBackground',
  },
  '&:focus, &:active, &:target': {
    outline: 'none',
  },
  '&:disabled': {
    cursor: 'not-allowed',
    '&::placeholder': {
      color: '$tan',
    },
  },
});

export const SendButton = styled(ActionButton, {
  margin: '0',
  padding: '0 8px',
  width: '36px',
  height: '36px',
  borderRadius: '0 8px 8px 0',
  alignSelf: 'center',
  color: '$black',
  '&:hover': {
    color: '$grayHoverLightBackground',
  },
  '&:disabled': {
    cursor: 'not-allowed',
    color: '$tan',
  },
});

export const ChatArea = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  backgroundColor: '$cream',
  padding: '24px 16px 16px',
  gap: '16px',
  overflowY: 'scroll',
  borderRadius: '16px 16px 0 0',
  transition: 'borderRadius 325ms cubic-bezier(0, 1.2, 1, 1)',
  span: {
    fontFamily: '$fonts$inter',
  },
  body: {
    fontFamily: '$fonts$inter',
  },

  variants: {
    hasMessages: {
      true: {
        borderRadius: 0,
      },
    },
  },
});

export const BotStateMessage = styled('div', {
  fontFamily: '$fonts$inter',
  fontSize: '14px',
  borderRadius: '8px',
  width: '320px',
  padding: '20px 40px',
  marginTop: '20px',
  alignSelf: 'center',
  textAlign: 'center',
  wordWrap: 'break-word',

  variants: {
    status: {
      [CHATBOT_STATUS.operational]: {
        // blue
        backgroundColor: '#3434ef1a',
        color: '$orange',
      },
      [CHATBOT_STATUS.offline]: {
        // red alt with lower opacity
        backgroundColor: '#eb00001a',
        color: '$redAlt',
      },
      [CHATBOT_STATUS.maintenance]: {
        // blue with lower opacity
        backgroundColor: '#3434ef1a',
        color: '$blue',
      },
      [CHATBOT_STATUS.degraded]: {
        // blue with lower opacity
        backgroundColor: '#3434ef1a',
        color: '$orange',
      },
    },
  },
});
export const UserChatArea = styled('div', {
  display: 'grid',
});

export const IconChatArrow = styled('div');

export const BotChatArea = styled('div', {
  display: 'grid',
  alignItems: 'center',
});

export const ChatBubble = styled('div', {
  borderRadius: '8px',
  alignSelf: 'center',
  padding: '12px',
  fontSize: '14px',
});

export const UserChat = styled(ChatBubble, {
  backgroundColor: '$green',
  justifySelf: 'end',
  color: '$black',
  '&::selection': {
    background: '$tan',
    color: '$black',
  },
});

export const UserTimestamp = styled('span', {
  fontSize: '10px',
  justifySelf: 'end',
  color: '$grayHoverLightBackground',
  marginTop: '4px',
});

export const BotChat = styled(ChatBubble, {
  backgroundColor: '$tan',
  justifySelf: 'start',
  color: '$black',
  maxWidth: '300px',
  '&:not(:first-child)': {
    marginTop: '8px',
  },
  a: {
    color: '$blue',
    textDecoration: 'underline',
    ':hover': {
      color: '$black',
    },
  },
  p: {
    margin: '0',
    wordWrap: 'break-word',
  },
  pre: {
    borderRadius: '8px',
    marginTop: '1rem',
  },
  '&::selection': {
    background: '$green',
    color: '$black',
  },
  '& > *': {
    '&::selection': {
      background: '$green',
      color: '$black',
    },
  },
});

export const BotTimestamp = styled('span', {
  fontSize: '10px',
  justifySelf: 'start',
  color: '$grayHoverLightBackground',
  marginTop: '4px',
});

export const DocumentLinkArea = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '4px',
});

export const DocumentLinkContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '4px',
  fontSize: '14px',
  color: '$blue',
  '&:hover > a, &:hover > svg': {
    color: '$black',
  },
});

export const DocumentLink = styled('a', {
  maxWidth: '258px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  color: '$blue',
  textDecoration: 'underline',
});

export const BotErrorMessage = styled('div', {
  backgroundColor: '#FFEFEF',
  color: '$grayHoverLightBackground',
  fontSize: '14px',
  display: 'grid',
  gridTemplateColumns: '24px auto',
  alignItems: 'center',
  justifySelf: 'center',
  borderRadius: '8px',
  maxWidth: '320px',
  padding: '16px',
  svg: {
    height: '20px',
    width: '20px',
    color: '$redAlt',
  },
  p: {
    margin: '0',
  },
  a: {
    color: '$blue',
    textDecoration: 'underline',
    ':hover': {
      color: '$black',
    },
  },
});

export const StyledCaptchaWrapper = styled('div', {
  marginInline: 'auto',
  marginTop: '$medium',
});
