import styled from '@emotion/styled';

interface Message {
  senderType: 'me' | 'other';
}

const Container = styled.div<{ isMine: boolean }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  min-height: ${({ isMine }) => (isMine ? '3rem' : '4rem')};
  justify-content: flex-start;
  align-items: flex-start;
`;

const Profile = styled.div`
  width: 2rem;
  aspect-ratio: 1/1;
  border-radius: 1rem;
  border: 1px solid black;
`;

const SubContainer = styled.div<{ isMine: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: ${({ isMine }) => (isMine ? 'center' : 'flex-start')};
  align-items: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
`;

const Name = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  margin-left: 0.2rem;
`;

const Content = styled.div<{ isMine: boolean }>`
  display: flex;
  width: auto;
  min-width: 3rem;
  height: auto;
  min-height: 1.5rem;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 0.2rem;
  margin-top: ${({ isMine }) => (isMine ? '0' : '0.2rem')};
  margin-left: ${({ isMine }) => (isMine ? '0' : '0.2rem')};
  margin-right: ${({ isMine }) => (isMine ? '0.2rem' : '0')};
  padding: 0.3rem;
  font-size: 1rem;
  font-weight: 400;
`;

export const Message = ({ senderType }: Message) => {
  return (
    <Container isMine={senderType === 'me'}>
      {senderType === 'other' && <Profile />}
      <SubContainer isMine={senderType === 'me'}>
        {senderType === 'other' && <Name>이병길</Name>}
        <Content isMine={senderType === 'me'}>안녕하세요!</Content>
      </SubContainer>
    </Container>
  );
};
