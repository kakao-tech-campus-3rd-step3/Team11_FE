import { useState, useEffect } from 'react';
import type { Meeting } from '@/types/meeting';
import {
  EnterButton,
  Hashtag,
  HashtagContainer,
  InfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  ModalBackdrop,
  ModalContainer,
  Handle,
  Content,
  Title,
  Category,
} from '@/components/home_page/ModalStyle';
import { joinMeetUp } from '@/api/services/meetup_room.service';
import { useMyProfile } from '@/hooks/useMyProfile';
import { useMyCurrentMeeting } from '@/hooks/useMyCurrentMeeting';

interface MeetingDetailModalProps {
  meeting: Meeting;
  onClose: () => void;
  isOpen?: boolean;
}

export const MeetingDetailModal = ({ meeting, onClose, isOpen }: MeetingDetailModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);

  const { myProfile, isLoadingProfile } = useMyProfile();
  const { myMeeting, isLoadingMeeting, refetchMyMeeting } = useMyCurrentMeeting();

  const userTemperature = myProfile?.temperature || 0;
  const isInRoom = !!myMeeting;
  const isLoading = isLoadingProfile || isLoadingMeeting;

  useEffect(() => {
    if (isOpen) {
      setJoinError(null);
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleEnterRoom = async () => {
    if (!myProfile) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (isInRoom) {
      alert('이미 다른 모임에 참여 중입니다.');
      return;
    }

    const limit = meeting.scoreLimit;
    if (userTemperature < limit) {
      alert(
        `이 모임은 매너 점수 ${limit}점 이상이어야 입장할 수 있습니다. (현재 ${userTemperature}점)`,
      );
      return;
    }

    setIsJoining(true);
    setJoinError(null);
    try {
      await joinMeetUp(String(meeting.id));
      alert(`${meeting.name} 방에 성공적으로 입장했습니다!`);
      await refetchMyMeeting();
      handleClose();
    } catch (err: any) {
      const errorMessage = err.message || '알 수 없는 오류';
      setJoinError(errorMessage);
      alert(`입장 실패: ${errorMessage}`);
    } finally {
      setIsJoining(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  //
  const tags = meeting.hashTags || [];

  return (
    <>
      <ModalBackdrop onClick={handleClose} $isVisible={isVisible} />
      <ModalContainer $isVisible={isVisible}>
        <Handle />
        <Content>
          <Category>{meeting.category}</Category>
          <Title>{meeting.name}</Title>
          <HashtagContainer>
            {/* */}
            {tags.map((tag) => (
              <Hashtag key={tag}>{tag}</Hashtag>
            ))}
          </HashtagContainer>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>🌡️ 제한 매너 점수</InfoLabel>
              <InfoValue>{meeting.scoreLimit}°C 이상</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>👥 인원</InfoLabel>
              <InfoValue>
                {meeting.participantCount} / {meeting.capacity}명
              </InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>⏰ 마감 시간</InfoLabel>
              <InfoValue>{meeting.endAt}</InfoValue>
            </InfoItem>
          </InfoGrid>
          <EnterButton onClick={handleEnterRoom} disabled={isJoining || isLoading}>
            {isLoading ? '정보 확인 중...' : isJoining ? '입장 중...' : '입장'}
          </EnterButton>
          {joinError && (
            <div style={{ color: 'red', fontSize: '14px', marginTop: '10px', textAlign: 'center' }}>
              {joinError}
            </div>
          )}
        </Content>
      </ModalContainer>
    </>
  );
};
