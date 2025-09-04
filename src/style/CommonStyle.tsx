import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw; /* 뷰포트 가로 꽉 채우기 */
  height: 100vh;
  max-width: 720px;
  background-color: #ffffffff;
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
