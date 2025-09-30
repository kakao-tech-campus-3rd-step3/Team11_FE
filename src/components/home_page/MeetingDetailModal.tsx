import { AnimatePresence } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
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
}

const modalVariants = {
  hidden: { y: '100%' },
  visible: { y: '0%' },
};

export const MeetingDetailModal = ({ meeting, onClose }: MeetingDetailModalProps) => {
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 200) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <ModalBackdrop
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <ModalContainer
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ type: 'spring', damping: 40, stiffness: 400 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.5 }}
        onDragEnd={handleDragEnd}
      >
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
    </AnimatePresence>
  );
};
