import styled from '@emotion/styled';
import Send from '@/assets/meeting_room_page/send.svg?react';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 6rem;
  max-width: 720px;
  padding-left: 2rem;
  padding-right: 2rem;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  background-color: transparent;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 3rem;
  resize: none;
  outline: none;
  font-size: 1rem;
  line-height: 1.2rem;
  border: none;
  border-radius: 1.5rem;
  padding-left: 1.5rem;
  padding-top: 0.75rem;
  box-sizing: border-box;
  overflow-y: auto;
  background-color: #efefef;
`;

export const ChatInput = () => {
  return (
    <Container>
      <TextArea />
      <Send style={{ position: 'absolute', top: '0.75rem', right: '3rem' }} />
    </Container>
  );
};
