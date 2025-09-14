import styled from '@emotion/styled';
import Send from '@/assets/meeting_room_page/send.svg?react';
import React, { useState } from 'react';
import type { ChatMessage } from '@/types/meeting_room_page/chatMessage';
import type { SetState } from '@/types/meeting_room_page/chatMessage';

interface ChatInput {
  chatMessages: ChatMessage[];
  setChatMessages: SetState<ChatMessage[]>;
}

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
  padding-top: 0.8rem;
  box-sizing: border-box;
  overflow-y: auto;
  background-color: #efefef;
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChatInput = ({ chatMessages, setChatMessages }: ChatInput) => {
  const [text, setText] = useState('');

  const sendMessage = () => {
    const newMessage: ChatMessage = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      senderType: 'me',
      content: text,
      time: new Date(),
    };

    setChatMessages([...chatMessages, newMessage]);
    setText('');
  };

  return (
    <Container>
      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            sendMessage();
          }
        }}
      />
      <Button onClick={sendMessage}>
        <Send style={{ position: 'absolute', top: '0.75rem', right: '3rem' }} />
      </Button>
    </Container>
  );
};
