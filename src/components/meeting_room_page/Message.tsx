import type { ParticipantDTO } from '@/api/types/meeting_room.dto';
import styled from '@emotion/styled';
import { useLayoutEffect, useRef, useState } from 'react';
import { ProfileOptions } from './ProfileOptions';

interface Message {
  isHost: boolean;
  myId: number | null;
  meetUpId: string;
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
  display: flex;
  justify-content: center;
  align-items: center;
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

const SystemMessage = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: gray;
`;

export const Message = ({ isHost, myId, meetUpId, senderType, content, sender }: Message) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const avatarRef = useRef<HTMLDivElement>(null);

  const handleProfileClick = () => setIsOptionOpen((prev) => !prev);

  useLayoutEffect(() => {
    if (isOptionOpen && avatarRef.current) {
      const rect = avatarRef.current.getBoundingClientRect();
      setPosition({ x: rect.right + 10, y: rect.top + 20 });
    }
  }, [isOptionOpen]);

  return (
    <>
      <Container isSystem={senderType === 'system'}>
        {senderType === 'system' ? (
          <>
            <SystemMessage>{content}</SystemMessage>
          </>
        ) : (
          <>
            {senderType === 'other' &&
              (sender?.profile.imageUrl ? (
                <Profile
                  ref={avatarRef}
                  imageUrl={sender.profile.imageUrl}
                  onClick={handleProfileClick}
                />
              ) : (
                <Profile ref={avatarRef} onClick={handleProfileClick}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </Profile>
              ))}
            <SubContainer isMine={senderType === 'me'}>
              {senderType === 'other' && <Name>{sender?.profile.nickname || '(알 수 없음)'}</Name>}
              <Content isMine={senderType === 'me'}>{content}</Content>
            </SubContainer>
          </>
        )}
      </Container>

      {isOptionOpen && sender && (
        <ProfileOptions
          myId={myId}
          isHost={isHost}
          position={position}
          onClose={() => setIsOptionOpen(false)}
          meetUpId={meetUpId}
          target={sender}
        />
      )}
    </>
  );
};
