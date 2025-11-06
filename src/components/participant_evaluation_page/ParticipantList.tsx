import styled from '@emotion/styled';
import { Participant } from './Participant';
import type { EvaluableUserDTO, EvaluationItemDTO } from '@/api/types/evaluation.dto';
import type React from 'react';

interface ParticipantListProps {
  participants: EvaluableUserDTO[] | undefined;
  setEvaluations: React.Dispatch<React.SetStateAction<EvaluationItemDTO[]>>;
}

const Container = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  padding: 2rem;
  padding-top: 3rem;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
`;

const Title = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
`;

const List = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 1rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ParticipantList = ({ participants, setEvaluations }: ParticipantListProps) => {
  return (
    <Container>
      <Title>참여자</Title>
      <List>
        {participants?.map((participant) => (
          <Participant
            key={participant.profileId}
            info={participant}
            setEvaluations={setEvaluations}
          />
        ))}
      </List>
    </Container>
  );
};
