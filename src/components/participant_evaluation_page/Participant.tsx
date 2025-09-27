import styled from '@emotion/styled';
import ThumbUpSVG from '@/assets/participant_evaluation_page/thumb_up.svg?react';
import ThumbDownSVG from '@/assets/participant_evaluation_page/thumb_down.svg?react';
import { useState } from 'react';

interface ParticipantProps {
  name: string;
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

const Avatar = styled.div`
  position: absolute;
  left: 1rem;
  height: 3rem;
  aspect-ratio: 1/1;
  border-radius: 1.5rem;
  border: 1px solid black;
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

export const Participant = ({ name }: ParticipantProps) => {
  const [isThumbUpClicked, setIsThumbUpClicked] = useState(false);
  const [isThumbDownClicked, setIsThumbDownClicked] = useState(false);

  return (
    <Container>
      <Avatar />
      <Name>{name}</Name>
      <ThumbUp
        isClicked={isThumbUpClicked}
        onClick={() => {
          setIsThumbUpClicked(!isThumbUpClicked);
          setIsThumbDownClicked(false);
        }}
      />
      <ThumbDown
        isClicked={isThumbDownClicked}
        onClick={() => {
          setIsThumbDownClicked(!isThumbDownClicked);
          setIsThumbUpClicked(false);
        }}
      />
    </Container>
  );
};
