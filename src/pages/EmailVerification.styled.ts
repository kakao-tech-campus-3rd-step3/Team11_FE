import { colors } from '@/style/themes';
import styled from '@emotion/styled';

export const VerificationMain = styled.main`
  width: 100%;
  height: calc(-2.75rem + 100vh);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const Logo = styled.img`
  width: 80%;
  max-width: 320px;
  color: rgb(42, 48, 56);
`;

export const VerificationSection = styled.section`
  width: 100%;
  max-width: 26.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${colors.primary100};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  
  &::before {
    content: '✓';
    font-size: 48px;
    color: ${colors.primary};
    font-weight: bold;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: rgb(42, 48, 56);
  margin-bottom: 16px;
`;

export const Message = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: rgb(140, 144, 152);
  margin-bottom: 48px;
  line-height: 1.5;
`;

export const LoginButton = styled.button`
  width: 100%;
  height: 48px;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.1875rem;
  color: rgba(255, 255, 255, 1);
  background-color: ${colors.primary};
  border-radius: 3px;
  border: none;
  cursor: pointer;
  transition: background-color 200ms;
  
  &:hover {
    background-color: ${colors.primary400};
  }
`;

export const Spacer = styled.div<{ h?: number; w?: number }>`
  height: ${({ h }) => (h ? `${h}px` : '0')};
  width: ${({ w }) => (w ? `${w}px` : '0')};
`;


