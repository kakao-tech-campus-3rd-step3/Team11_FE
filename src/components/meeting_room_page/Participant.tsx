import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100%;
  aspect-ratio: 1/1;
`;

const Avatar = styled.div`
  height: 3rem;
  aspect-ratio: 1/1;
  border-radius: 1.5rem;
  border: 1px solid black;
`;

export const Participant = () => {
  return (
    <Container>
      <Avatar />
    </Container>
  );
};
