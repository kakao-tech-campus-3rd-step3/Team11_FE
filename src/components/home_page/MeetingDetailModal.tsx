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

interface MeetingDetailModalProps {
  meeting: Meeting;
  onClose: () => void;
  isOpen?: boolean;
}

export const MeetingDetailModal = ({ meeting, onClose, isOpen }: MeetingDetailModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <ModalBackdrop onClick={handleClose} $isVisible={isVisible} />
      <ModalContainer $isVisible={isVisible}>
        <Handle />
        <Content>
          <Category>{meeting.category}</Category>
          <Title>{meeting.title}</Title>
          <HashtagContainer>
            {meeting.hashtags.map((tag) => (
              <Hashtag key={tag}>{tag}</Hashtag>
            ))}
          </HashtagContainer>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>🌡️ 제한 매너 온도</InfoLabel>
              <InfoValue>{meeting.mannerTemperatureLimit}°C 이상</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>👥 인원</InfoLabel>
              <InfoValue>
                {meeting.currentMembers} / {meeting.maxMembers}명
              </InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>⏰ 마감 시간</InfoLabel>
              <InfoValue>{meeting.deadline}</InfoValue>
            </InfoItem>
          </InfoGrid>
          <EnterButton onClick={() => alert(`${meeting.title} 방에 입장합니다!`)}>입장</EnterButton>
        </Content>
      </ModalContainer>
    </>
  );
};
