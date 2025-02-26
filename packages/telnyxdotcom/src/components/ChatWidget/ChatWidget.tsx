import ChatbotWidget from 'components/ChatbotWidget';
import { initialize as initializeIntercom } from 'components/scripts/Intercom';
import { useState } from 'react';
import ChatBubble from 'ui/components/Icons/ChatBubble';
import * as css from './ChatWidget.styled';
import SegmentService from 'services/Segment/SegmentService';
import SessionLib from 'lib/Session';

const PAGES_WITH_INTERCOM = [
  '/report-abuse',
  '/sign-up/verify-email',
  '/sign-up/verify-email/b',
  '/sign-up/verify-email/f',
];
/**
 * @TODO: update this list according to recaptcha badge being hidden
 * For marketo forms, badge may be hidden
 * https://developers.google.com/recaptcha/docs/faq#id-like-to-hide-the-recaptcha-badge.-what-is-allowed
 */
const PAGES_WITH_RECAPTCHA = ['/sign-up'];

const ChatWidget = () => {
  const [showAiChatWindow, setShowAiChatWindow] = useState(false);
  const userId = SegmentService.userId;
  const sessionId = SessionLib.sessionId;
  const hasIntercom = PAGES_WITH_INTERCOM.includes(window.location.pathname);
  const hasRecaptcha = PAGES_WITH_RECAPTCHA.includes(window.location.pathname);

  const MENU_ITEMS = [
    ...(hasIntercom
      ? [
          {
            name: 'CHAT TO SUPPORT',
            onClick: () => {
              if (window.Intercom) {
                window.Intercom('show');
              } else {
                initializeIntercom(true);
              }
            },
          },
        ]
      : []),
    {
      name: 'ASK OUR AI ASSISTANT',
      onClick: () => {
        setShowAiChatWindow(true);
      },
    },
  ];

  if (!showAiChatWindow)
    return (
      <css.Container pageHasRecaptcha={hasRecaptcha}>
        <css.MenuButton>
          <ChatBubble
            width={33}
            height={40}
            onClick={() => {
              if (!hasIntercom) {
                setShowAiChatWindow(true);
              }
            }}
          />
        </css.MenuButton>

        <css.MenuItemsContainer>
          {MENU_ITEMS.map(({ name, onClick }, index) => (
            <css.MenuItemButton
              key={`chat-button-${index}`}
              onClick={onClick}
              css={{
                animationDelay: `${index * 0.05}s`,
              }}
            >
              {name}
            </css.MenuItemButton>
          ))}
        </css.MenuItemsContainer>
      </css.Container>
    );
  return <ChatbotWidget userId={userId} sessionId={sessionId} {...{ showAiChatWindow, setShowAiChatWindow }} />;
};

export default ChatWidget;
