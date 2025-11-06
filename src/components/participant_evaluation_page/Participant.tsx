import styled from '@emotion/styled';
import ThumbUpSVG from '@/assets/participant_evaluation_page/thumb_up.svg?react';
import ThumbDownSVG from '@/assets/participant_evaluation_page/thumb_down.svg?react';
import { useState } from 'react';
import type { EvaluableUserDTO, EvaluationItemDTO } from '@/api/types/evaluation.dto';

interface ParticipantProps {
  info: EvaluableUserDTO;
  setEvaluations: React.Dispatch<React.SetStateAction<EvaluationItemDTO[]>>;
}

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5rem;
  border: 1px solid rgb(243, 244, 246);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
`;

const Avatar = styled.div<{ imageUrl: string }>`
  position: absolute;
  left: 1rem;
  height: 3rem;
  aspect-ratio: 1/1;
  border-radius: 1.5rem;
  border: 1px solid #9ca3af;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

const Name = styled.div`
  position: absolute;
  left: 5rem;
  font-size: 0.875rem;
  font-weight: 400;
  color: #6b7280;
`;

const ThumbUp = styled(ThumbUpSVG)<{ isClicked: boolean }>`
  position: absolute;
  right: 30%;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  fill: ${(props) => (props.isClicked ? '#374151' : '#9ca3af')};
`;

const ThumbDown = styled(ThumbDownSVG)<{ isClicked: boolean }>`
  position: absolute;
  right: 10%;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  fill: ${(props) => (props.isClicked ? '#374151' : '#9ca3af')};
`;

export const Participant = ({ info, setEvaluations }: ParticipantProps) => {
  const [isThumbUpClicked, setIsThumbUpClicked] = useState(false);
  const [isThumbDownClicked, setIsThumbDownClicked] = useState(false);

  const handleEvaluation = (rating: 'LIKE' | 'DISLIKE' | null) => {
    setEvaluations((prev) => {
      const existing = prev.find((item) => item.targetProfileId === info.profileId);
      if (rating === null) {
        return prev.filter((item) => item.targetProfileId !== info.profileId);
      }
      if (existing) {
        return prev.map((item) =>
          item.targetProfileId === info.profileId ? { ...item, rating } : item,
        );
      } else {
        return [...prev, { targetProfileId: info.profileId, rating }];
      }
    });
  };

  return (
    <Container>
      <Avatar imageUrl={info.imageUrl} />
      <Name>{info.nickname}</Name>
      <ThumbUp
        isClicked={isThumbUpClicked}
        onClick={() => {
          const value = !isThumbUpClicked;
          setIsThumbUpClicked(value);
          setIsThumbDownClicked(false);
          handleEvaluation(value ? 'LIKE' : null);
        }}
      />
      <ThumbDown
        isClicked={isThumbDownClicked}
        onClick={() => {
          const value = !isThumbDownClicked;
          setIsThumbDownClicked(value);
          setIsThumbUpClicked(false);
          handleEvaluation(value ? 'DISLIKE' : null);
        }}
      />
    </Container>
  );
};
