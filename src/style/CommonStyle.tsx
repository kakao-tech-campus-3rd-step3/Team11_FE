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
  margin: 0 auto;
  background-color: #ffffffff;
  overflow: hidden;

  /* Tablet */
  @media (min-width: 768px) {
    max-width: 960px;
  }

  /* Small Desktop */
  @media (min-width: 1024px) {
    max-width: 1200px;
  }

  /* Large Desktop */
  @media (min-width: 1440px) {
    max-width: 1320px;
  }
`;

export const ContentContanier = styled.div`
  width: 96%;
  overflow-y: auto;
  padding-bottom: 100px;
  
  /* 스크롤바 숨기기 */
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;


export const Spacer = styled.div<{ h?: number; w?: number }>`
  height: ${({ h }) => (h ? `${h}px` : '0')};
  width: ${({ w }) => (w ? `${w}px` : '0')};
`;
