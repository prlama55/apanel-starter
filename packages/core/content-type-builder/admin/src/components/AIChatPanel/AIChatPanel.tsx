import { useState } from 'react';

import { Flex, Alert, Box } from '@strapi/design-system';

import { ChatContent } from './components/ChatContent';
import { ChatHeader } from './components/ChatHeader';
import { ChatInput } from './components/ChatInput';
import { MOCK_CONVERSATION } from './constants';
import { CuratedMessage } from './types';

interface AIChatPanelProps {
  isVisible: boolean;
}

export const AIChatPanel: React.FC<AIChatPanelProps> = ({ isVisible }) => {
  const [chatHistory, setChatHistory] = useState<CuratedMessage[]>(MOCK_CONVERSATION);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    // setChatHistory((prev) => [...prev, userMessage]);
    setError(null);
    setIsLoading(true);

    try {
      setChatHistory((prev) => [...prev]);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Flex
      direction="column"
      padding={4}
      background="neutral100"
      hasRadius
      borderColor="neutral200"
      maxWidth="400px"
      height="100vh"
      gap={4}
    >
      <ChatHeader />
      <ChatContent chatHistory={chatHistory} />
      {error && (
        <Alert closeLabel="Close" onClose={() => setError(null)} variant="danger">
          {error}
        </Alert>
      )}
      <Box width="100%">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </Box>
    </Flex>
  );
};
