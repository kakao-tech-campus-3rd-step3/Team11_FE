import type { ParticipantDTO } from '@/api/types/meeting_room.dto';
import styled from '@emotion/styled';
import { useLayoutEffect, useRef, useState } from 'react';
import { ProfileOptions } from './ProfileOptions';

interface ParticipantProps {
  myId: number | null;
  isHost: boolean;
  participant: ParticipantDTO;
  meetUpId: string;
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

const Avatar = styled.div<{ imageUrl: string; isOwner: boolean }>`
  height: 3rem;
  aspect-ratio: 1/1;
  border-radius: 1.5rem;
  border-style: solid;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  border-width: ${(props) => (props.isOwner ? '0.2rem' : '0.05rem')};
  border-color: ${(props) => (props.isOwner ? 'green' : 'black')};
  box-sizing: border-box;
  cursor: pointer;
`;

const NameTag = styled.div`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  font-weight: 400;
  max-width: 6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

export const Participant = ({ myId, isHost, participant, meetUpId }: ParticipantProps) => {
  const isOwner = participant.role === 'HOST';
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const avatarRef = useRef<HTMLDivElement>(null);

  const handleClick = () => setIsOptionOpen((prev) => !prev);

  useLayoutEffect(() => {
    if (isOptionOpen && avatarRef.current) {
      const rect = avatarRef.current.getBoundingClientRect();
      setPosition({ x: rect.right - 16, y: rect.top + 50 });
    }
  }, [isOptionOpen]);

  return (
    <>
      <Container ref={avatarRef}>
        <Avatar imageUrl={participant.profile.imageUrl} isOwner={isOwner} onClick={handleClick} />
        <NameTag>{participant.profile.nickname}</NameTag>
      </Container>

      {isOptionOpen && (
        <ProfileOptions
          myId={myId}
          isHost={isHost}
          position={position}
          onClose={() => setIsOptionOpen(false)}
          meetUpId={meetUpId}
          target={participant}
        />
      )}
    </>
  );
};
