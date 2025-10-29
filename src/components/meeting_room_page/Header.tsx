import styled from '@emotion/styled';
import BackArrow from '@/assets/meeting_room_page/chevron_left.svg?react';
import Menu from '@/assets/meeting_room_page/menu.svg?react';
import { Sidebar } from '@/components/meeting_room_page/Sidebar';
import { useBoolean } from '@/hooks/useBoolean';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  roomTitle: string;
  meetUpId: string;
  isHost: boolean;
  isStarted: boolean;
  disconnect: () => void;
}

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

export const Header = ({ roomTitle, meetUpId, isHost, isStarted, disconnect }: HeaderProps) => {
  const naviagate = useNavigate();
  const [isSidebarOpen, { on: openSidebar, off: closeSidebar }] = useBoolean(false);

  return (
    <HeaderContainer>
      <HeaderContent>
        <Button onClick={() => naviagate('/home')}>
          <BackArrow
            width={BACKARROW_SVG_SIZE}
            height={BACKARROW_SVG_SIZE}
            style={{ position: 'absolute', left: 0 }}
          />
        </Button>
        <RoomTitle>{roomTitle}</RoomTitle>
        <Button onClick={openSidebar}>
          <Menu
            width={MENU_SVG_SIZE}
            height={MENU_SVG_SIZE}
            style={{ position: 'absolute', right: 0, top: '0.85rem' }}
          />
        </Button>
      </HeaderContent>
      {isSidebarOpen && <Overlay onClick={closeSidebar} />}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        isHost={isHost}
        isStarted={isStarted}
        disconnect={disconnect}
        meetUpId={meetUpId}
      />
    </HeaderContainer>
  );
};
