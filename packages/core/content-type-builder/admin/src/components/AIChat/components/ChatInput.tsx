import { useState } from 'react';

import { Button, IconButton } from '@strapi/design-system';
import { Paperclip } from '@strapi/icons';

import { Input } from './Input/Input';
import { ResizableTextArea } from './Input/ResizableTextArea';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    if (prompt.trim() === '') return;
    onSendMessage(prompt);
    setPrompt('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input.Root isLoading={isLoading}>
        <Input.Content>
          <ResizableTextArea
            value={prompt}
            onChange={setPrompt}
            onSubmit={handleSubmit}
            placeholder="Ask Strapi AI..."
          />
          <Input.Actions>
            <IconButton label="Attach" disabled={isLoading}>
              <Paperclip />
            </IconButton>
            <Button
              type="submit"
              // disabled={isLoading || !prompt.trim()}
              variant="default"
              size="S"
            >
              Send
            </Button>
          </Input.Actions>
        </Input.Content>
      </Input.Root>
    </form>
  );
};
