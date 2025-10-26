import styled from '@emotion/styled';
import Send from '@/assets/meeting_room_page/send.svg?react';
import { useRef, useState } from 'react';
import type { ChatMessage } from '@/types/meeting_room_page/chatMessage';
import type { SetState } from '@/types/meeting_room_page/chatMessage';

type MessageType = 'TEXT' | 'IMAGE' | 'SYSTEM';

interface ChatInputProps {
  chatMessages: ChatMessage[];
  setChatMessages: SetState<ChatMessage[]>;
  sendMessage: (type: MessageType, message: string) => void;
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
  padding-top: 1rem;
  padding-right: 3rem;
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

const HelperText = styled.div`
  font-size: 0.75rem;
  color: gray;
  margin-top: 0.3rem;
`;

export const ChatInput = ({ chatMessages, setChatMessages, sendMessage }: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState('');

  const handleClick = () => {
    const trimmedText = text.trim();

    if (!trimmedText) {
      setText('');
      return;
    }

    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      senderType: 'me',
      content: trimmedText,
      time: new Date(),
    };

    sendMessage('TEXT', trimmedText);
    setChatMessages([newMessage, ...chatMessages]);
    setText('');

    if (textareaRef.current) {
      textareaRef.current.value = '';
    }
  };

  return (
    <Container>
      <TextArea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="대화를 시작해 보세요!"
        onKeyDown={(e) => {
          if (e.nativeEvent.isComposing) return;

          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleClick();
          }
        }}
      />
      <Button onClick={handleClick}>
        <Send style={{ position: 'absolute', top: '0.75rem', right: '3rem' }} />
      </Button>
      <HelperText>Enter: 전송, Shift + Enter: 줄바꿈</HelperText>
    </Container>
  );
};
