import styled from '@emotion/styled';
import BackArrow from '@/assets/meeting_room_page/chevron_left.svg?react';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const slideUp = keyframes`
  from {
    transform: translateY(3rem);
  }
  to {
    transform: translateY(0);
  }
`;

const HeaderContainer = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 720px;
  height: 6rem;
  padding-left: 2rem;
  padding-right: 2rem;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
`;

const HeaderContent = styled.div`
  position: relative;
  width: 100%;
  height: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
`;

const RoomTitle = styled.div`
  position: absolute;
  top: 1.1rem;
  font-size: 1rem;
  font-weight: 500;
  animation: ${slideUp} 1s ease-in-out forwards;
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BACKARROW_SVG_SIZE = '32';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <HeaderContent>
        <Button onClick={() => navigate('/home')}>
          <BackArrow
            width={BACKARROW_SVG_SIZE}
            height={BACKARROW_SVG_SIZE}
            style={{ position: 'absolute', left: 0 }}
          />
        </Button>
        <RoomTitle>모임은 어떠셨나요?</RoomTitle>
      </HeaderContent>
    </HeaderContainer>
  );
};
