import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Label = styled.div`
  position: absolute;
  top: 6rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 3rem;
  padding-left: 2rem;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
  opacity: 0;
  animation: ${fadeIn} 2s ease-in-out 1s forwards;
  font-size: 0.875rem;
  font-weight: 400;
  color: #6b7280;
`;

export const EvaluationGuideLabel = () => {
  return <Label>참여자에 대한 의견을 남겨주세요.</Label>;
};
