import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const TransitionContainer = styled.div<{ isTransitioning: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  animation: ${({ isTransitioning }) => isTransitioning ? slideOut : slideIn} 0.3s ease-in-out forwards;
`;

interface PageTransitionProps {
  children: React.ReactNode;
  to: string;
  className?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, to, className }) => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate(to);
    }, 300); // 애니메이션 시간과 동일
  };

  return (
    <TransitionContainer 
      isTransitioning={isTransitioning} 
      onClick={handleClick}
      className={className}
    >
      {children}
    </TransitionContainer>
  );
};

export default PageTransition;
