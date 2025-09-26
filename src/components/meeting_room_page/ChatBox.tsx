import styled from '@emotion/styled';
import { Message } from './Message';
import type { ChatMessage } from '@/types/meeting_room_page/chatMessage';
import { useEffect, useRef } from 'react';

interface ChatBoxProps {
  chatMessages: ChatMessage[];
}

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
  padding-bottom: 2rem;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const ChatBox = ({ chatMessages }: ChatBoxProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'auto' });
  }, [chatMessages]);

  return (
    <Container>
      {chatMessages.map((message) => (
        <Message key={message.id} senderType={message.senderType} content={message.content} />
      ))}
      <div ref={ref} />
    </Container>
  );
};
