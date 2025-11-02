import React, { type ReactNode } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

interface PageTransitionProps {
  children: ReactNode;
  isVisible: boolean;
  direction?: 'left' | 'right' | 'up' | 'down' | 'fade';
  duration?: number;
}

const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInFromUp = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideInFromDown = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideOutToRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const slideOutToLeft = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

const slideOutToUp = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const slideOutToDown = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const TransitionContainer = styled.div<{
  $isVisible: boolean;
  $direction: string;
  $duration: number;
}>`
  width: 100%;
  min-height: 100vh;
  animation: ${({ $isVisible, $direction }) => {
    if ($isVisible) {
      switch ($direction) {
        case 'left':
          return slideInFromLeft;
        case 'right':
          return slideInFromRight;
        case 'up':
          return slideInFromUp;
        case 'down':
          return slideInFromDown;
        case 'fade':
        default:
          return fadeIn;
      }
    } else {
      switch ($direction) {
        case 'left':
          return slideOutToLeft;
        case 'right':
          return slideOutToRight;
        case 'up':
          return slideOutToUp;
        case 'down':
          return slideOutToDown;
        case 'fade':
        default:
          return fadeOut;
      }
    }
  }} ${({ $duration }) => $duration}ms ease-in-out forwards;
`;

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  isVisible,
  direction = 'fade',
  duration = 300,
}) => {
  return (
    <TransitionContainer
      $isVisible={isVisible}
      $direction={direction}
      $duration={duration}
    >
      {children}
    </TransitionContainer>
  );
};

export default PageTransition;
