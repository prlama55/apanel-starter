/**
 * MESSAGE TYPES
 *
 * Assistant:
 *  - Task execution: `task`
 *  - Plan creation: `plan`
 *  - Raw message: `text`
 *
 * User:
 *  - Raw message: `text`
 *  - Plan review: `plan`
 */

export interface MarkerContent {
  type: 'marker';
  title: string;
  state: 'loading' | 'success' | 'error';
  steps: Array<{ id: string; description: string }>;
}

export interface TextContent {
  type: 'text';
  text: string;
}

export type UserMessage = {
  id: string;
  role: 'user';
  contents: TextContent[];
};

export type MessageContent = TextContent | MarkerContent;

export type AssistantMessage = {
  id: string;
  role: 'assistant';
  contents: MessageContent[];
  status: 'loading' | 'success' | 'error';
};

export type CuratedMessage = UserMessage | AssistantMessage;

// Helper type guards
export const isAssistantMessage = (message: CuratedMessage): message is AssistantMessage =>
  message.role === 'assistant';

export const isUserMessage = (message: CuratedMessage): message is UserMessage =>
  message.role === 'user';

export const isTextContent = (content: MessageContent): content is TextContent =>
  content.type === 'text';

export const isMarkerContent = (content: MessageContent): content is MarkerContent =>
  content.type === 'marker';
