import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  max-width: 720px;
  background-color: #ffffffff;
  overflow: hidden;
`;

export const Text = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 2rem;
`;

export const ContentContanier = styled.div`
  width: 88%
`
export const Spacer = styled.div<{ h?: number; w?: number }>`
  height: ${({ h }) => (h ? `${h}px` : "0")};
  width: ${({ w }) => (w ? `${w}px` : "0")};
`;
