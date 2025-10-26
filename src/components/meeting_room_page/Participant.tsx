import type { ParticipantDTO } from '@/api/types/meeting_room.dto';
import styled from '@emotion/styled';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

interface ParticipantProps {
  participant: ParticipantDTO;
}

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 6rem;
`;

const Avatar = styled.div<{ imageUrl: string; isHost: boolean }>`
  height: 3rem;
  aspect-ratio: 1/1;
  border-radius: 1.5rem;
  border-style: solid;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  border-width: ${(props) => (props.isHost ? '0.2rem' : '0.05rem')};
  border-color: ${(props) => (props.isHost ? 'green' : 'black')};
  box-sizing: border-box;
  cursor: pointer;
`;

const NameTag = styled.div`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  max-width: 6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
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

export const Participant = ({ participant }: ParticipantProps) => {
  const isHost = participant.role === 'HOST';
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const avatarRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleClick = () => setIsOptionOpen((prev) => !prev);

  useLayoutEffect(() => {
    if (isOptionOpen && avatarRef.current) {
      const rect = avatarRef.current.getBoundingClientRect();
      setPosition({ x: rect.right - 16, y: rect.top + 50 });
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
      <Container ref={avatarRef}>
        <Avatar imageUrl={participant.profile.imageUrl} isHost={isHost} onClick={handleClick} />
        <NameTag>{participant.profile.nickname}</NameTag>
      </Container>

      {isOptionOpen &&
        createPortal(
          <Popover ref={popoverRef} style={{ top: position.y, left: position.x }}>
            <Option onClick={() => navigate(`/user/${participant.profile.id}`)}>프로필 보기</Option>
            <Option>차단</Option>
            <Option>신고</Option>
          </Popover>,
          document.body,
        )}
    </>
  );
};
