import styled from '@emotion/styled';
import Undo from '@/assets/meeting_room_page/undo.svg?react';
import { useNavigate } from 'react-router-dom';
import { handleMeetupAction } from '@/utils/handleMeetupSidebarAction';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isHost: boolean;
  isStarted: boolean;
  disconnect: () => void;
  meetUpId: string;
}

const Container = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100vh;
  background-color: #ffffff;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  transition: transform 0.4s ease;
  z-index: 1000;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 6rem;
  justify-content: flex-end;
  align-items: flex-start;
  box-sizing: border-box;
  border-bottom: 0.5px solid #e5e7eb;
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Option = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  transition: all 0.2s ease;
  border-bottom: 0.5px solid #f3f4f6;

  &:hover {
    color: #ffffff;
    background-color: #ef4444;
  }

  &:active {
    background-color: #dc2626;
  }
`;

const UNDO_SVG_SIZE = '25.6';

export const Sidebar = ({
  isOpen,
  onClose,
  isHost,
  isStarted,
  disconnect,
  meetUpId,
}: SidebarProps) => {
  const navigate = useNavigate();

  return (
    <Container isOpen={isOpen}>
      <Header>
        <Button onClick={onClose}>
          <Undo
            width={UNDO_SVG_SIZE}
            height={UNDO_SVG_SIZE}
            fill="#6b7280"
            style={{ marginLeft: '0.7rem', marginBottom: '0.7rem' }}
          />
        </Button>
      </Header>
      {isStarted ? (
        isHost && (
          <Option onClick={() => handleMeetupAction('end', navigate, meetUpId, disconnect)}>
            모임 종료
          </Option>
        )
      ) : (
        <>
          {isHost && (
            <>
              <Option onClick={() => handleMeetupAction('start', navigate)}>실제 모임 시작</Option>
              <Option onClick={() => handleMeetupAction('cancel', navigate)}>모집 취소</Option>
              <Option onClick={() => handleMeetupAction('update', navigate)}>방 수정하기</Option>
            </>
          )}
          <Option onClick={() => handleMeetupAction('leave', navigate, meetUpId, disconnect)}>
            방 나가기
          </Option>
        </>
      )}
    </Container>
  );
};
