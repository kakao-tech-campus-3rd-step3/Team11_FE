import styled from '@emotion/styled';
import { Participant } from './Participant';
import type { ParticipantDTO } from '@/api/types/meeting_room.dto';

interface ParticipantListProps {
  participants: ParticipantDTO[];
}

const Container = styled.div`
  position: absolute;
  top: 6rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 720px;
  height: 6.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
`;

const List = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow-x: auto;
`;

const Text = styled.div`
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  font-size: 0.85rem;
  font-weight: 500;
`;

export const ParticipantList = ({ participants }: ParticipantListProps) => {
  return (
    <Container>
      <Text>현재 참여자</Text>
      <List>
        {participants.map((participant) => (
          <Participant key={crypto.randomUUID()} participant={participant} />
        ))}
      </List>
    </Container>
  );
};
