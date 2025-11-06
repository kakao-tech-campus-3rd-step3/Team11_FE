import { colors } from '@/style/themes';
import styled from '@emotion/styled';

export const MyDiv = styled.div`
  max-width: 720px;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: rgb(255, 255, 255);
  padding-top: 2.75rem;
`;

export const LoginMain = styled.main`
  width: 100%;
  height: calc(-2.75rem + 100vh);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.img`
  width: 70%;
  max-width: 240px;
  color: rgb(42, 48, 56);
  margin-bottom: 1rem;
`;
export const LoginSection = styled.section`
  width: 100%;
  max-width: 26.25rem;
  padding: 0 1.5rem;
`;

export const InputSection = styled.input<{ hasError?: boolean }>`
  width: 100%;
  box-sizing: border-box;
  color: rgb(42, 48, 56);
  transition: border-color 200ms;
  border-style: solid;
  min-height: 3rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 0.75rem 0;
  border-width: 0px 0px 2px;
  border-color: ${({ hasError }) => (hasError ? 'red' : 'rgb(220, 222, 227)')};
  &:focus {
    outline: none;
    border-color: ${({ hasError }) => (hasError ? 'red' : colors.primary)};
  }
  &::placeholder {
    color: rgb(156, 163, 175);
  }
`;

export const LoginButton = styled.button<{ notVaild?: boolean }>`
  width: 100%;
  height: 3.25rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  color: rgba(255, 255, 255, 1);
  background-color: ${colors.primary};
  border-radius: 0.5rem;
  border: none;
  cursor: ${({ notVaild }) => (notVaild ? 'not-allowed' : 'pointer')};
  opacity: ${({ notVaild }) => (notVaild ? '0.5' : '1')};
  transition: opacity 0.2s ease;
  &:active:not(:disabled) {
    opacity: 0.8;
  }
`;

export const KaKaoLoginBTn = styled.button<{ notVaild?: boolean }>`
  width: 100%;
  height: 3.25rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  color: #000000;
  background-color: #fee500;
  border-radius: 0.5rem;
  border: none;
  cursor: ${({ notVaild }) => (notVaild ? 'not-allowed' : 'pointer')};
  opacity: ${({ notVaild }) => (notVaild ? '0.5' : '1')};
  transition: opacity 0.2s ease;
  &:active:not(:disabled) {
    opacity: 0.8;
  }
`;

export const RegisterButton = styled.button<{ notVaild?: boolean }>`
  width: 100%;
  height: 48px;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.1875rem;
  color: rgba(255, 255, 255, 1);
  background-color: ${colors.secondary600};
  border-radius: 3px;
  border: none;
  cursor: ${({ notVaild }) => (notVaild ? 'not-allowed' : 'pointer')};
  opacity: ${({ notVaild }) => (notVaild ? '0.5' : '1')};
  transition: background-color 200ms;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 0.75rem;
  margin-top: 4px;
`;

export const LinkText = styled.span`
  color: rgb(107, 114, 128);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25rem;
`;

export const Spacer = styled.div<{ h?: number; w?: number }>`
  height: ${({ h }) => (h ? `${h}px` : '0')};
  width: ${({ w }) => (w ? `${w}px` : '0')};
`;
