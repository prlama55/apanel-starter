import { useRef, useEffect } from 'react';

import { Box, Flex } from '@strapi/design-system';

import { CuratedMessage } from '../../types';

import { ChatMessage } from './ChatMessage';

interface ChatContentProps {
  chatHistory: CuratedMessage[];
}

export const ChatContent: React.FC<ChatContentProps> = ({ chatHistory }) => {
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <Box overflow="auto" height="100%" width="100%">
      <Flex direction="column" alignItems="left" gap={4}>
        {chatHistory.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messageEndRef} />
      </Flex>
    </Box>
  );
};
