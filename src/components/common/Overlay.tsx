import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const OverlayContainer = styled.div<{ $closing?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 99;
  animation: ${({ $closing }) => ($closing ? fadeOut : fadeIn)} 0.3s forwards;
`;

interface OverlayProps {
  onClick?: () => void;
  closing?: boolean;
}

export const Overlay = ({ onClick, closing }: OverlayProps) => {
  return <OverlayContainer onClick={onClick} $closing={closing} />;
};
