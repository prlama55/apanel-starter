import { useRef } from 'react';

import { Box } from '@strapi/design-system';
import { styled } from 'styled-components';

import { useInput } from './Input';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
}

const TextAreaElement = styled(Box).attrs({ as: 'textarea' })`
  border: none;
  resize: none;
  background: transparent;
  outline: none !important;
  width: 100%;
  min-height: 44px;
  padding: 0px;
  max-height: 160px;
  line-height: ${({ theme }) => theme.lineHeights[4]};
  font-size: ${({ theme }) => theme.fontSizes[2]};
  color: ${({ theme }) => theme.colors.neutral800};

  ::placeholder {
    color: ${({ theme }) => theme.colors.neutral500};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.neutral600};
  }
`;

export const ResizableTextArea = ({ value, onChange, onSubmit, placeholder }: TextAreaProps) => {
  const { isLoading } = useInput();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && onSubmit) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <Box padding={[3, 3, 0, 3]}>
      <TextAreaElement
        ref={textareaRef}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        placeholder={placeholder}
        rows={1}
      />
    </Box>
  );
};
