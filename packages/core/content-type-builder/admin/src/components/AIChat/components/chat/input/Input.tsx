import { createContext, useContext } from 'react';

import { Box, Flex, inputFocusStyle } from '@strapi/design-system';
import { styled } from 'styled-components';

export interface InputContextValue {
  isLoading?: boolean;
}

export const InputContext = createContext<InputContextValue>({});

export interface InputRootProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Root = ({ children, isLoading = false }: InputRootProps) => {
  return (
    <InputContext.Provider value={{ isLoading }}>
      <Box width="100%" position="relative">
        {children}
      </Box>
    </InputContext.Provider>
  );
};

const InputContainer = styled(Box)`
  &:focus-within {
    ${inputFocusStyle()}
  }
`;

const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <InputContainer
      background="neutral0"
      hasRadius
      borderColor="neutral200"
      borderWidth="1px"
      borderStyle="solid"
      shadow="filterShadow"
      width="100%"
    >
      {children}
    </InputContainer>
  );
};

const Actions = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex gap={2} padding={3} justifyContent="flex-end" alignItems="center" hasRadius>
      {children}
    </Flex>
  );
};

export const Input = {
  Root,
  Content,
  Actions,
};

export const useInput = () => useContext(InputContext);
