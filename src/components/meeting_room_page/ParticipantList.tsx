import styled from '@emotion/styled';
import { Participant } from './Participant';

const Container = styled.div`
  position: absolute;
  top: 6rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 720px;
  height: 5.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  justify-content: flex-start;
  align-items: center;
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
  border-bottom: 1px solid black;
`;

export const ParticipantList = () => {
  return (
    <Container>
      <List>
        <Participant />
        <Participant />
        <Participant />
        <Participant />
        <Participant />
        <Participant />
        <Participant />
        <Participant />
        <Participant />
        <Participant />
        <Participant />
        <Participant />
        <Participant />
      </List>
    </Container>
  );
};
