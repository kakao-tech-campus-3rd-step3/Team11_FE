import styled from '@emotion/styled';
import { Message } from './Message';

const Container = styled.div`
  position: absolute;
  top: 11.5rem;
  bottom: 4.5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 720px;
  padding-top: 0.3rem;
  padding-left: 2rem;
  padding-right: 2rem;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const ChatBox = () => {
  return (
    <Container>
      <Message senderType="other" />
      <Message senderType="me" />
      <Message senderType="other" />
      <Message senderType="me" />
      <Message senderType="other" />
      <Message senderType="me" />
      <Message senderType="other" />
      <Message senderType="me" />
      <Message senderType="other" />
      <Message senderType="me" />
      <Message senderType="me" />
      <Message senderType="me" />
      <Message senderType="other" />
      <Message senderType="other" />
      <Message senderType="other" />
      <Message senderType="me" />
      <Message senderType="other" />
    </Container>
  );
};
