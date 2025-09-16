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

interface CreateHeaderProps {
  onBackButtonClick: () => void;
}

export const CreateHeader = ({ onBackButtonClick }: CreateHeaderProps) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <BackButton onClick={onBackButtonClick}>{'<'}</BackButton>
        <Title>방 생성</Title>
      </HeaderContent>
    </HeaderContainer>
  );
};
