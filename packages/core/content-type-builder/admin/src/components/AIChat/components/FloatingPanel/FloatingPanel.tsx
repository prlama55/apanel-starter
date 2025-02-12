import { createContext, useContext, useState } from 'react';

import { Box, Flex, IconButton } from '@strapi/design-system';
import { Cross } from '@strapi/icons';
import { styled } from 'styled-components';

import { ANIMATIONS } from './animations';

type PanelSize = 'sm' | 'md' | 'lg';
type PanelPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

interface PanelContextValue {
  size: PanelSize;
  position: PanelPosition;
  isOpen: boolean;
  onToggle: () => void;
}

const PanelContext = createContext<PanelContextValue>({
  size: 'md',
  position: 'bottom-right',
  isOpen: false,
  onToggle: () => undefined,
});

const PANEL_SIZES: Record<PanelSize, { width: string; minHeight: string }> = {
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
  defaultOpen?: boolean;
  onChange?: (isOpen: boolean) => void;
  toggleIcon?: React.ReactNode;
}

const FixedWrapper = styled(Box)<{ $position: PanelPosition }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: ${({ $position }) => ($position.includes('right') ? 'flex-end' : 'flex-start')};
  ${({ $position, theme }) =>
    Object.entries(PANEL_POSITIONS[$position]).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: theme.spaces[value],
      }),
      {}
    )}
`;

const PanelContainer = styled(Box)<{ $size: PanelSize; $position: PanelPosition }>`
  width: ${({ $size }) => PANEL_SIZES[$size].width};
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spaces[2]};

  @media (prefers-reduced-motion: no-preference) {
    animation-duration: 200ms;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    &[data-state='open'] {
      animation-name: ${({ $position }) =>
        $position.startsWith('top') ? ANIMATIONS.slideDownIn : ANIMATIONS.slideUpIn};
    }

    &[data-state='closed'] {
      animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
      animation-name: ${({ $position }) =>
        $position.startsWith('top') ? ANIMATIONS.slideDownOut : ANIMATIONS.slideUpOut};
    }
  }
`;

const Root = ({
  children,
  size = 'md',
  position = 'bottom-right',
  defaultOpen = false,
  onChange,
  toggleIcon,
}: RootProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onChange?.(newIsOpen);
  };

  return (
    <PanelContext.Provider value={{ size, position, isOpen, onToggle: handleToggle }}>
      <FixedWrapper $position={position}>
        <PanelContainer
          $size={size}
          $position={position}
          background="neutral0"
          shadow="filterShadow"
          hasRadius
          borderColor="neutral200"
          borderStyle="solid"
          borderWidth="1px"
          data-state={isOpen ? 'open' : 'closed'}
          style={{ display: isOpen ? 'flex' : 'none' }}
        >
          {children}
        </PanelContainer>
        {toggleIcon && (
          <IconButton onClick={handleToggle} label="Toggle panel" variant="secondary">
            {toggleIcon}
          </IconButton>
        )}
      </FixedWrapper>
    </PanelContext.Provider>
  );
};

const Header = ({ children }: { children: React.ReactNode }) => (
  <Box padding={[2, 4]} borderColor="neutral150" borderStyle="solid" borderWidth="0 0 1px 0">
    <Flex justifyContent="space-between" alignItems="center">
      {children}
    </Flex>
  </Box>
);

const Body = ({ children }: { children: React.ReactNode }) => {
  const { size } = usePanel();
  return (
    <Box padding={4} flex="1" overflow="auto" minHeight={PANEL_SIZES[size].minHeight}>
      {children}
    </Box>
  );
};

const Footer = ({ children }: { children: React.ReactNode }) => <Box padding={4}>{children}</Box>;

const Close = () => {
  const { onToggle } = usePanel();

  return (
    <IconButton onClick={onToggle} variant="ghost" label="Close panel">
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
