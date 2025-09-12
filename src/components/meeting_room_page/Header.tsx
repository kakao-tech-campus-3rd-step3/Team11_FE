import styled from '@emotion/styled';
import BackArrow from '@/assets/meeting_room_page/chevron_left.svg?react';
import Menu from '@/assets/meeting_room_page/menu.svg?react';
import { useState } from 'react';
import { Sidebar } from '@/components/meeting_room_page/Sidebar';

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
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 720px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

const BACKARROW_SVG_SIZE = '32';
const MENU_SVG_SIZE = '25.6';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HeaderContainer>
      <HeaderContent>
        <BackArrow
          width={BACKARROW_SVG_SIZE}
          height={BACKARROW_SVG_SIZE}
          style={{ position: 'absolute', left: 0 }}
        />
        <RoomTitle>축구할 사람 구해요~</RoomTitle>
        <Button onClick={() => setIsOpen(true)}>
          <Menu
            width={MENU_SVG_SIZE}
            height={MENU_SVG_SIZE}
            style={{ position: 'absolute', right: 0, top: '0.85rem' }}
          />
        </Button>
      </HeaderContent>
      {isOpen && <Overlay />}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </HeaderContainer>
  );
};
