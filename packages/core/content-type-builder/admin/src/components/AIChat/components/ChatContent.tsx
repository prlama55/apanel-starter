import { useRef, useEffect } from 'react';

import { Flex } from '@strapi/design-system';

import { CuratedMessage } from '../types';

import { ChatMessage } from './Messages/Message';

interface ChatContentProps {
  messages: CuratedMessage[];
}

export const ChatContent: React.FC<ChatContentProps> = ({ messages }) => {
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Flex direction="column" gap={5}>
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      <div ref={messageEndRef} />
    </Flex>
  );
};
