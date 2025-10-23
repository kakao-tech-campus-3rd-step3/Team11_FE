import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { colors } from '@/style/themes';

export const Logo = styled.img`
  width: 80%;
  max-width: 320px;
  color: rgb(42, 48, 56);
`;

// 스플래시 스크린 페이드아웃 애니메이션
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const WhiteBackground = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100vh;
  max-width: 720px;
  background: white;
  z-index: 999;
  animation: ${fadeOut} 1s ease-in-out 3.5s forwards;
`;

export const SplashScreen = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100vh;
  max-width: 720px;
  background: linear-gradient(135deg, ${colors.primary300}, ${colors.primary300},${colors.primary200});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeOut} 1s ease-in-out 2s forwards;
`;

export const SplashContent = styled.div`
  text-align: center;
  color: white;
`;

export const SplashTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const SplashSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2rem;
`;

// 텍스트 페이드인 애니메이션
const textFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Text = styled.div`
  padding-top: 0.1rem;
  font-size: 4.5rem;
  font-weight: 400;
  color:rgb(82, 82, 82);
  margin-bottom: 2rem;
  animation: ${textFadeIn} 2s ease-out 5s forwards;
  opacity: 0;
`;
