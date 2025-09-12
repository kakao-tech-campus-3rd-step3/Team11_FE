import styled from 'styled-components';
import { colors } from '@/style/themes';

const HeaderContainer = styled.header`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 720px;
  height: 6rem;
  padding: 0 2rem;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  background-color: #fff;
  z-index: 10;
`;

const HeaderContent = styled.div`
  position: relative;
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${colors.secondary300};
`;

const BackButton = styled.button`
  all: unset;
  cursor: pointer;
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
`;

interface SearchHeaderProps {
  onBackButtonClick: () => void; // 뒤로 가기 버튼 클릭 시 호출될 콜백 함수
}

export const SearchHeader = ({ onBackButtonClick }: SearchHeaderProps) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <BackButton onClick={onBackButtonClick}>{'<'}</BackButton>
        <Title>모임 검색</Title>
      </HeaderContent>
    </HeaderContainer>
  );
};
