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

const Avatar = styled.div<{ imageUrl?: string; isOwner: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  aspect-ratio: 1/1;
  border-radius: 1.5rem;
  border-style: solid;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  border-width: ${(props) => (props.isOwner ? '2px' : '1px')};
  border-color: ${(props) => (props.isOwner ? '#10b981' : '#9ca3af')};
  box-sizing: border-box;
  cursor: pointer;
  overflow: hidden;
  color: #6b7280;
`;

const NameTag = styled.div`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  font-weight: 400;
  color: #6b7280;
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
        {participant.profile.imageUrl ? (
          <Avatar imageUrl={participant.profile.imageUrl} isOwner={isOwner} onClick={handleClick} />
        ) : (
          <Avatar isOwner={isOwner} onClick={handleClick}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
            </svg>
          </Avatar>
        )}
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
