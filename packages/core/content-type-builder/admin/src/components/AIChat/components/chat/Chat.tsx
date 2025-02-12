import { useState } from 'react';

import { Box, Typography } from '@strapi/design-system';

import { Panel } from '../floating-panel/FloatingPanel';

import { ChatInput } from './ChatInput';

interface ChatbotProps {
  isOpen: boolean;
  onClose?: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<
    { content: string; isUser: boolean; timestamp: number }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = (message: string) => {
    setLoading(true);
    const newMessage = { content: message, isUser: true, timestamp: Date.now() };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Mock response - replace with actual API call
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: 'This is a mock response.', isUser: false, timestamp: Date.now() },
      ]);
      setLoading(false);
    }, 500);
  };

  return (
    <Panel.Root size="md" position="bottom-right" isOpen={isOpen} onClose={onClose}>
      <Panel.Header>
        <Typography tag="h3" variant="omega" fontWeight="bold">
          Strapi AI Chatbot
        </Typography>
        <Panel.Close />
      </Panel.Header>

      <Panel.Body>
        <Box>
          {messages.map((message, index) => (
            <Box
              key={index}
              paddingBottom={2}
              style={{
                alignSelf: message.isUser ? 'flex-end' : 'flex-start',
              }}
              maxWidth="80%"
            >
              <Box
                background={message.isUser ? 'primary100' : 'neutral0'}
                borderColor={message.isUser ? 'primary200' : 'neutral200'}
                hasRadius
                borderStyle="solid"
                borderWidth="1px"
                padding={3}
              >
                <Typography>{message.content}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Panel.Body>

      <Panel.Footer>
        <ChatInput onSendMessage={handleSendMessage} isLoading={loading} />
      </Panel.Footer>
    </Panel.Root>
  );
};

export { Chatbot };
