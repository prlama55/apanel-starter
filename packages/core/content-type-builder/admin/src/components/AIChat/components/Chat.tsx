import { useState } from 'react';

import { Box, Flex, Typography } from '@strapi/design-system';
import { Message } from '@strapi/icons';

import { MOCK_CONVERSATION } from '../constants';

import { ChatContent } from './ChatContent';
import { ChatInput } from './ChatInput';
import { Panel } from './FloatingPanel/FloatingPanel';

import type { CuratedMessage, UserMessage, AssistantMessage } from '../types';

interface ChatbotProps {
  isOpen: boolean;
  onClose?: () => void;
}

const createUserMessage = (text: string): UserMessage => ({
  id: crypto.randomUUID(),
  role: 'user',
  contents: [{ type: 'text', text }],
});

const createAssistantMessage = (text: string): AssistantMessage => ({
  id: crypto.randomUUID(),
  role: 'assistant',
  contents: [{ type: 'text', text }],
  status: 'success',
});

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<CuratedMessage[]>(MOCK_CONVERSATION);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = (message: string) => {
    setLoading(true);
    const userMessage = createUserMessage(message);
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Mock response - replace with actual API call
    setTimeout(() => {
      const assistantMessage = createAssistantMessage('This is a mock response.');
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      setLoading(false);
    }, 500);
  };

  return (
    <Panel.Root
      size="md"
      position="bottom-right"
      defaultOpen={isOpen}
      onChange={onClose}
      toggleIcon={<Message />}
    >
      <Panel.Header>
        <Typography tag="h3" variant="omega" fontWeight="bold">
          New conversation
        </Typography>
        <Panel.Close />
      </Panel.Header>

      <Panel.Body>
        <ChatContent messages={messages} />
      </Panel.Body>

      <Panel.Footer>
        <ChatInput onSendMessage={handleSendMessage} isLoading={loading} />
      </Panel.Footer>
    </Panel.Root>
  );
};

export { Chatbot };
