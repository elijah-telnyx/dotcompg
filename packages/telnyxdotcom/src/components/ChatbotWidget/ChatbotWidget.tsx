/**
 * @link https://github.com/team-telnyx/frontend/blob/main/packages/customer-portal-app/src/reactApp/common/components/ChatWidget/ChatWidget.jsx
 */

import React, { useEffect, useRef, useState } from 'react';
import type * as T from './@types';
import ChatbotService from './ChatbotService';

import PulseLoader from 'react-spinners/PulseLoader';
import ChatbotMarkdown from './ChatbotMarkdown';

import IconAlert from 'ui/components/Icons/Alert';
import ChatArrowIcon from 'ui/components/Icons/ChatArrow';
import ExternalLinkIcon from 'ui/components/Icons/External';
import OpenCloseStyled from 'ui/components/Icons/OpenClose';
import { initialize as initializeIntercom } from 'components/scripts/Intercom';
import {
  BotChat,
  BotChatArea,
  BotErrorMessage,
  BotStateMessage,
  BotTimestamp,
  ChatArea,
  Container,
  DocumentLink,
  DocumentLinkArea,
  DocumentLinkContainer,
  Header,
  HeaderCloseButton,
  HeaderSubText,
  HeaderText,
  HeaderTextArea,
  InputArea,
  InputField,
  InputFieldContainer,
  OfflineHelpButton,
  SendButton,
  SmallHeaderText,
  StatusIndicator,
  TelnyxIcon,
  UserChat,
  UserChatArea,
  UserTimestamp,
} from './ChatbotWidget.styled';
import { CHATBOT_STATUS } from './constants';
import useChatbot from './useChatBot';
import { getTimeFromTimestamp, getTimestamp } from './utils';

interface AiChatWindowProps {
  userId: string;
  sessionId: string;
  showAiChatWindow: boolean;
  setShowAiChatWindow: (showAiChatWindow: boolean) => void;
}

function AiChatWindow({ userId, sessionId, showAiChatWindow, setShowAiChatWindow }: AiChatWindowProps) {
  const chatWindowRef = useRef<any>(null);
  const [botState, setBotState] = useState<T.ChatBotState>();
  const [messages, setMessages] = useState<any[]>([]);
  const [rows, setRows] = useState<number>(1);
  const [scrolledDown, setScrolledDown] = useState<boolean>(true);
  const [questionText, setQuestionText] = useState<string>('');
  const isMounted = useRef(false);

  useEffect(() => {
    async function fetchStatusAndUserId() {
      const state = await ChatbotService.getState();
      setBotState(state);
    }
    if (!isMounted.current) {
      fetchStatusAndUserId();
    }
    isMounted.current = true;
  }, []);

  const { chat, lastMessage } = useChatbot({
    sessionId,
    userId,
    messages,
    setMessages,
  });

  useEffect(() => {
    if (scrolledDown && lastMessage) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [lastMessage, scrolledDown]);

  useEffect(() => {
    // An approximate max number of characters per row of text
    const textRows = Math.ceil(questionText.length / 40);
    if (questionText.length === 0) {
      setRows(1);
    }
    if (questionText.length > 0 && textRows < 4) {
      setRows(textRows);
    }
  }, [questionText]);

  function handleScroll() {
    const atBottom =
      Math.abs(
        chatWindowRef.current.scrollHeight - chatWindowRef.current.clientHeight - chatWindowRef.current.scrollTop
      ) <= 1;

    setScrolledDown(atBottom);
  }

  async function handleNewMessage() {
    const state = await ChatbotService.getState();
    setBotState(state);
    chat(questionText);
    setQuestionText('');
  }

  function handleKeyDown(event: any) {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        return;
      }
      if (
        !questionText ||
        messages.some((message: any) => message.state === 'loading' || message.state === 'streaming')
      ) {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      handleNewMessage();
      setRows(1);
    }
  }

  function renderDocuments(documents: any) {
    return (
      <DocumentLinkArea>
        {documents.map((document: any) => (
          <React.Fragment key={document.title}>
            <DocumentLinkContainer>
              <DocumentLink href={document.url} target='_blank'>
                {document.title}
              </DocumentLink>
              <ExternalLinkIcon />
            </DocumentLinkContainer>
          </React.Fragment>
        ))}
      </DocumentLinkArea>
    );
  }

  function renderStateIndicator(status?: T.ChatBotState['status']) {
    if (!status) return status;
    return <StatusIndicator status={status}>{`•${status}`}</StatusIndicator>;
  }

  function renderOfflineHelpButton() {
    return (
      <OfflineHelpButton
        type='button'
        onClick={() => {
          setShowAiChatWindow(false);
          if (window.Intercom) {
            window.Intercom('show');
          } else {
            initializeIntercom(true);
          }
        }}
      >
        Chat to support
      </OfflineHelpButton>
    );
  }

  const hasMessages = Boolean(messages.length);

  return (
    <Container open={showAiChatWindow}>
      <Header hasMessages={hasMessages}>
        {hasMessages ? (
          <>
            {botState?.status !== CHATBOT_STATUS.operational && renderStateIndicator(botState?.status)}
            <SmallHeaderText>
              <TelnyxIcon hasMessages={hasMessages} />
              <span>Ask our AI assistant</span>
            </SmallHeaderText>
          </>
        ) : (
          <HeaderTextArea>
            {botState?.status !== CHATBOT_STATUS.operational && renderStateIndicator(botState?.status)}
            <HeaderText>
              <TelnyxIcon hasMessages={hasMessages} />
              <span>Ask our AI assistant</span>
            </HeaderText>
            <HeaderSubText>
              You can ask the bot your Telnyx-related queries! This is a beta tool. Read more{' '}
              <a
                href='https://support.telnyx.com/en/articles/8020222-mission-control-portal-ai-chat-support'
                target='_blank'
                rel='noopener'
              >
                here
              </a>
              .
            </HeaderSubText>
          </HeaderTextArea>
        )}

        <HeaderCloseButton hasMessages={hasMessages} onClick={() => setShowAiChatWindow(false)} data-state='open'>
          <OpenCloseStyled height={20} width={20} />
        </HeaderCloseButton>
      </Header>
      <ChatArea hasMessages={hasMessages} ref={chatWindowRef} onScroll={handleScroll}>
        {messages.length === 0 && botState?.notice && (
          <BotStateMessage status={botState?.status}>{botState.notice}</BotStateMessage>
        )}
        {botState?.status !== 'offline' && (
          <BotChatArea>
            <BotChat>{"Hello! I'm Telnyx's AI assistant. How can I help you?"}</BotChat>
            <BotTimestamp>{getTimeFromTimestamp(getTimestamp())}</BotTimestamp>
          </BotChatArea>
        )}
        {messages.map((message, index) => {
          if (message.type === 'user') {
            return (
              <UserChatArea key={`user ${index}`}>
                <UserChat>{message.message}</UserChat>
                <UserTimestamp>{message.timestamp.split(', ')[1]}</UserTimestamp>
              </UserChatArea>
            );
          } else {
            return (
              <React.Fragment key={`bot ${index}`}>
                <BotChatArea>
                  {message.state === 'error' && (
                    <>
                      <BotErrorMessage>
                        <IconAlert />
                        <ChatbotMarkdown>{message.message}</ChatbotMarkdown>
                      </BotErrorMessage>
                    </>
                  )}
                  {message.state !== 'error' && (
                    <>
                      <BotChat>
                        {message.state === 'loading' && (
                          <PulseLoader speedMultiplier={0.8} size={6}>
                            loading
                          </PulseLoader>
                        )}
                        {message.state !== 'loading' && <ChatbotMarkdown>{message.message}</ChatbotMarkdown>}
                      </BotChat>
                      {message.state === 'complete' && (
                        <>
                          {Boolean(message.events.documents.length) && (
                            <BotChat>{renderDocuments(message.events.documents)}</BotChat>
                          )}
                          {message.timestamp && <BotTimestamp>{getTimeFromTimestamp(message.timestamp)}</BotTimestamp>}
                        </>
                      )}
                    </>
                  )}
                </BotChatArea>
              </React.Fragment>
            );
          }
        })}
      </ChatArea>
      <InputArea>
        {botState?.status === 'offline' && renderOfflineHelpButton()}
        {botState?.status !== 'offline' && (
          <InputFieldContainer>
            <InputField
              rows={rows}
              placeholder='Type your question here'
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              maxLength={300}
              onKeyDown={handleKeyDown}
            />
            <SendButton
              disabled={
                !questionText ||
                messages.some((message) => message.state === 'loading' || message.state === 'streaming')
              }
              onClick={handleNewMessage}
            >
              <ChatArrowIcon title='Send message' height={24} width={24} />
            </SendButton>
          </InputFieldContainer>
        )}
      </InputArea>
    </Container>
  );
}

export default AiChatWindow;
