import { createContext, useContext } from 'react';

import { Box, Flex, IconButton } from '@strapi/design-system';
import { Cross } from '@strapi/icons';
import { styled } from 'styled-components';

type PanelSize = 'sm' | 'md' | 'lg';
type PanelPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

interface PanelContextValue {
  size: PanelSize;
  position: PanelPosition;
  isOpen: boolean;
  onClose?: () => void;
}

const PanelContext = createContext<PanelContextValue>({
  size: 'md',
  position: 'bottom-right',
  isOpen: false,
});

interface PanelDimensions {
  width: string;
  minHeight: string;
}

const PANEL_SIZES: Record<PanelSize, PanelDimensions> = {
  sm: { width: '300px', minHeight: '250px' },
  md: { width: '400px', minHeight: '300px' },
  lg: { width: '500px', minHeight: '400px' },
};

const PANEL_POSITIONS: Record<PanelPosition, { [key: string]: number }> = {
  'bottom-right': { bottom: 4, right: 4 },
  'bottom-left': { bottom: 4, left: 4 },
  'top-right': { top: 4, right: 4 },
  'top-left': { top: 4, left: 4 },
};

interface RootProps {
  children: React.ReactNode;
  size?: PanelSize;
  position?: PanelPosition;
  isOpen?: boolean;
  onClose?: () => void;
}

const PanelContainer = styled(Box)<{ $size: PanelSize; $position: PanelPosition }>`
  position: fixed;
  width: ${({ $size }) => PANEL_SIZES[$size].width};
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  ${({ $position, theme }) =>
    Object.entries(PANEL_POSITIONS[$position]).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: theme.spaces[value],
      }),
      {}
    )}
`;

const Root = ({
  children,
  size = 'md',
  position = 'bottom-right',
  isOpen = false,
  onClose,
}: RootProps) => {
  if (!isOpen) return null;

  return (
    <PanelContext.Provider value={{ size, position, isOpen, onClose }}>
      <PanelContainer
        $size={size}
        $position={position}
        background="neutral0"
        shadow="filterShadow"
        hasRadius
        borderColor="neutral200"
        borderStyle="solid"
        borderWidth="1px"
      >
        {children}
      </PanelContainer>
    </PanelContext.Provider>
  );
};

const HeaderBox = styled(Box)`
  padding: ${({ theme }) => `${theme.spaces[2]} ${theme.spaces[4]}`};
`;

const Header = ({ children }: { children: React.ReactNode }) => (
  <HeaderBox borderColor="neutral150" borderStyle="solid" borderWidth="0 0 1px 0">
    <Flex justifyContent="space-between" alignItems="center">
      {children}
    </Flex>
  </HeaderBox>
);

const Body = ({ children }: { children: React.ReactNode }) => {
  const { size } = usePanel();
  return (
    <Box padding={3} flex="1" overflow="auto" minHeight={PANEL_SIZES[size].minHeight}>
      {children}
    </Box>
  );
};

const Footer = ({ children }: { children: React.ReactNode }) => <Box padding={4}>{children}</Box>;

const Close = () => {
  const { onClose } = usePanel();

  return (
    <IconButton onClick={onClose} variant="ghost" label="Close panel">
      <Cross />
    </IconButton>
  );
};

export const Panel = {
  Root,
  Header,
  Body,
  Footer,
  Close,
};

export const usePanel = () => useContext(PanelContext);
