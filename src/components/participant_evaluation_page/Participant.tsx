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
  border: 1px solid black;
  border-radius: 1rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
`;

const Avatar = styled.div<{ imageUrl?: string }>`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  left: 1rem;
  height: 3rem;
  aspect-ratio: 1/1;
  border-radius: 1.5rem;
  border: 1px solid black;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

const Name = styled.div`
  position: absolute;
  left: 5rem;
  font-size: 1rem;
  font-weight: 500;
`;

const ThumbUp = styled(ThumbUpSVG)<{ isClicked: boolean }>`
  position: absolute;
  right: 30%;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  fill: ${(props) => (props.isClicked ? 'black' : '#aeaeb2')};
`;

const ThumbDown = styled(ThumbDownSVG)<{ isClicked: boolean }>`
  position: absolute;
  right: 10%;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  fill: ${(props) => (props.isClicked ? 'black' : '#aeaeb2')};
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
      {info.imageUrl ? (
        <Avatar imageUrl={info.imageUrl} />
      ) : (
        <Avatar>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1" />
          </svg>
        </Avatar>
      )}
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
