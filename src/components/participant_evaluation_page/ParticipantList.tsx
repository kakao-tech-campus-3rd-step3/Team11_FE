import styled from '@emotion/styled';
import { Participant } from './Participant';
import { mockParticipants } from './mockData';

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

export const ParticipantList = () => {
  return (
    <Container>
      <Title>참여자</Title>
      <List>
        {mockParticipants.map((participant) => (
          <Participant key={participant.id} name={participant.name} />
        ))}
      </List>
    </Container>
  );
};
