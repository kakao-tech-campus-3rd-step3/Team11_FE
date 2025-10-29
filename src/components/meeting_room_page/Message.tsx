import type { ParticipantDTO } from '@/api/types/meeting_room.dto';
import styled from '@emotion/styled';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

interface Message {
  sender: ParticipantDTO | undefined;
  senderType: 'me' | 'other' | 'system';
  content: string;
}

const Container = styled.div<{ isSystem: boolean }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  justify-content: ${({ isSystem }) => (isSystem ? 'center' : 'flex-start')};
  align-items: ${({ isSystem }) => (isSystem ? 'center' : 'flex-start')};
  margin-bottom: 0.4rem;
`;

const Profile = styled.div<{ imageUrl?: string }>`
  width: 2rem;
  aspect-ratio: 1/1;
  border-radius: 1rem;
  border: 1px solid black;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;

const SubContainer = styled.div<{ isMine: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: ${({ isMine }) => (isMine ? 'center' : 'flex-start')};
  align-items: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
`;

const Name = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  margin-left: 0.2rem;
`;

const Content = styled.div<{ isMine: boolean }>`
  display: flex;
  width: auto;
  min-width: 3rem;
  max-width: 60%;
  height: auto;
  min-height: 1.5rem;
  line-height: 1.25rem;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 0.2rem;
  margin-top: ${({ isMine }) => (isMine ? '0' : '0.2rem')};
  margin-left: ${({ isMine }) => (isMine ? '0' : '0.2rem')};
  margin-right: ${({ isMine }) => (isMine ? '0.2rem' : '0')};
  padding: 0.3rem;
  font-size: 1rem;
  font-weight: 400;
`;

const Popover = styled.div`
  position: absolute;
  top: 3.5rem;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  padding: 0.5rem;
  z-index: 100;
`;

const Option = styled.div`
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  cursor: pointer;
  &:hover {
    background-color: #f3f3f3;
  }
`;

const SystemMessage = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: gray;
`;

export const Message = ({ senderType, content, sender }: Message) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const avatarRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleClick = () => setIsOptionOpen((prev) => !prev);

  useLayoutEffect(() => {
    if (isOptionOpen && avatarRef.current) {
      const rect = avatarRef.current.getBoundingClientRect();
      setPosition({ x: rect.right + 10, y: rect.top + 20 });
    }
  }, [isOptionOpen]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(e.target as Node) &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setIsOptionOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <>
      <Container isSystem={senderType === 'system'}>
        {senderType === 'system' ? (
          <>
            <SystemMessage>{content}</SystemMessage>
          </>
        ) : (
          <>
            {senderType === 'other' && (
              <Profile ref={avatarRef} imageUrl={sender?.profile.imageUrl} onClick={handleClick} />
            )}
            <SubContainer isMine={senderType === 'me'}>
              {senderType === 'other' && <Name>{sender?.profile.nickname}</Name>}
              <Content isMine={senderType === 'me'}>{content}</Content>
            </SubContainer>
          </>
        )}
      </Container>

      {isOptionOpen &&
        createPortal(
          <Popover ref={popoverRef} style={{ top: position.y, left: position.x }}>
            <Option onClick={() => navigate(`/user/${sender?.profile.id}`)}>프로필 보기</Option>
            <Option>차단</Option>
            <Option>신고</Option>
          </Popover>,
          document.body,
        )}
    </>
  );
};
