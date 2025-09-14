import styled from '@emotion/styled';
import Undo from '@/assets/meeting_room_page/undo.svg?react';
import type React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
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
  border-bottom: 1px solid black;
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
  color: #000000;
  transition: color 0.3s ease;
  transition: background-color 0.3s ease;

  &:hover {
    color: #ffffff;
    background-color: #ff8a8a;
  }
`;

const UNDO_SVG_SIZE = '25.6';

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <Container isOpen={isOpen}>
      <Header>
        <Button onClick={onClose}>
          <Undo
            width={UNDO_SVG_SIZE}
            height={UNDO_SVG_SIZE}
            fill={'#000000'}
            style={{ marginLeft: '0.7rem', marginBottom: '0.7rem' }}
          />
        </Button>
      </Header>
      <Option>실제 모임 시작</Option>
      <Option>방 나가기</Option>
      <Option>방 수정하기</Option>
      <Option>마감 기한 연장</Option>
    </Container>
  );
};
