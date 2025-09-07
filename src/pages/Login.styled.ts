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
  width: 80%;
  max-width: 320px;
  color: rgb(42, 48, 56);
`;
export const LoginSection = styled.section`
  width: 100%;
  max-width: 26.25rem;
  padding: 16px;
`;

export const InputSection = styled.input<{ hasError?: boolean }>`
  width: 100%;
  box-sizing: border-box;
  color: rgb(42, 48, 56);
  transition: border-color 200ms;
  border-style: solid;
  min-height: 2.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.375rem;
  padding: 8px 0px;
  border-width: 0px 0px 1px;
  border-color: ${({ hasError }) => (hasError ? 'red' : 'rgb(220, 222, 227)')};
  &:focus {
    outline: none;
    border-color: ${({ hasError }) => (hasError ? 'red' : 'rgb(42, 48, 56)')};
  }
`;

export const LoginButton = styled.button<{ notVaild?: boolean }>`
  width: 100%;
  height: 2.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.1875rem;
  color: rgb(42, 48, 56);
  background-color: ${colors.primary};
  border-radius: 4px;
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

export const Spacer = styled.div<{ h?: number; w?: number }>`
  height: ${({ h }) => (h ? `${h}px` : '0')};
  width: ${({ w }) => (w ? `${w}px` : '0')};
`;
