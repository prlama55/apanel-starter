import { Typography, Flex, Avatar, Box, Status } from '@strapi/design-system';

// @ts-expect-error - fix
import Logo from '../../../../assets/strapi-logo.svg';
import {
  CuratedMessage,
  MessageContent,
  isTextContent,
  isMarkerContent,
  UserMessage as UserMessageType,
  AssistantMessage as AssistantMessageType,
} from '../../types';

const MessageContent = ({ content }: { content: MessageContent }) => {
  if (isTextContent(content)) {
    return <Typography>{content.text}</Typography>;
  }

  // if (isMarkerContent(content)) {
  //   return (
  //     <Box>
  //       <Flex gap={2} paddingBottom={2}>
  //         {/* <Status variant={content.state === 'error' ? 'danger' : 'success'} size="S" /> */}
  //         <Typography fontWeight="bold">{content.title}</Typography>
  //       </Flex>
  //       <Box paddingLeft={6}>
  //         {content.steps.map((step) => (
  //           <Typography key={step.id} textColor="neutral600" variant="pi">
  //             {step.description}
  //           </Typography>
  //         ))}
  //       </Box>
  //     </Box>
  //   );
  // }

  return null;
};

const UserMessage = ({ message }: { message: UserMessageType }) => {
  return (
    <Box style={{ alignSelf: 'flex-end' }} maxWidth="80%">
      <Box
        background="primary100"
        borderColor="primary200"
        hasRadius
        borderStyle="none"
        padding={3}
      >
        {message.contents.map((content, index) => (
          <MessageContent key={index} content={content} />
        ))}
      </Box>
    </Box>
  );
};

const AssistantMessage = ({ message }: { message: AssistantMessageType }) => {
  return (
    <Box style={{ alignSelf: 'flex-start' }} maxWidth="90%">
      <Flex gap={2}>
        <Box>
          <Box background="neutral0" borderColor="neutral200" hasRadius borderStyle="none">
            {message.contents.map((content, index) => (
              <MessageContent key={index} content={content} />
            ))}
          </Box>
          {message.status === 'loading' && (
            <Box paddingTop={1}>
              <Typography variant="pi" textColor="neutral600">
                Loading...
              </Typography>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export const ChatMessage: React.FC<{ message: CuratedMessage }> = ({ message }) => {
  if (message.role === 'user') {
    return <UserMessage message={message} />;
  }
  return <AssistantMessage message={message} />;
};
