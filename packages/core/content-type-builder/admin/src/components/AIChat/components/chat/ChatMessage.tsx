import { Typography, Flex, Avatar } from '@strapi/design-system';

// @ts-expect-error - fix
import Logo from '../../../../assets/strapi-logo.svg';
import {
  CuratedMessage,
  MessageContent,
  isTextContent,
  UserMessage as UserMessageType,
  AssistantMessage as AssistantMessageType,
} from '../../types';

const MessageContent = ({ content }: { content: MessageContent }) => {
  if (isTextContent(content)) {
    return <Typography variant="omega">{content.text}</Typography>;
  }
  return null;
};

const UserMessage = ({ message }: { message: UserMessageType }) => {
  return (
    <Flex gap={4} alignItems="flex-start">
      <Avatar.Item fallback="MR" />
      <Flex flex={1} alignItems="flex-start">
        {message.contents.map((content, index) => (
          <MessageContent key={index} content={content} />
        ))}
      </Flex>
    </Flex>
  );
};

const AssistantMessage = ({ message }: { message: AssistantMessageType }) => {
  return (
    <Flex gap={4} alignItems="flex-start">
      <Avatar.Item src={Logo} fallback="AI" />

      <Flex flex={1} alignItems="flex-start">
        {message.contents.map((content, index) => (
          <MessageContent key={index} content={content} />
        ))}
      </Flex>
    </Flex>
  );
};

export const ChatMessage: React.FC<{ message: CuratedMessage }> = ({ message }) => {
  if (message.role === 'user') {
    return <UserMessage message={message} />;
  }
  return <AssistantMessage message={message} />;
};
