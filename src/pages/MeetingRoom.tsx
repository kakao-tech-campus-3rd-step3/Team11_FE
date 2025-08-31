import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f0f0f0;
`;

const Text = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 2rem;
`;

const MeetingRoom = () => {
  return (
    <Container>
      <Text>Meeting Room Page</Text>
    </Container>
  );
};

export default MeetingRoom;
