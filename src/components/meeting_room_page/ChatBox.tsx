import styled from '@emotion/styled';
import { Message } from './Message';
import type { ChatMessage } from '@/types/meeting_room_page/chatMessage';
import React, { useEffect, useRef, useState } from 'react';
import { keyframes } from '@emotion/react';
import { getChatList } from '@/api/services/meetup_room.service';
import { messageParser } from '@/utils/messageParser';
import type { ParticipantDTO } from '@/api/types/meeting_room.dto';
import { findSender } from '@/utils/findSender';

interface ChatBoxProps {
  chatMessages: ChatMessage[];
  meetUpId: string | null;
  myId: number | null;
  participants: ParticipantDTO[];
  isConnected: boolean;
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  bottomElementRef: React.RefObject<HTMLDivElement | null>;
}

const Container = styled.div<{ isFirstRender: boolean }>`
  position: absolute;
  top: 15.5rem;
  bottom: 4.5rem;
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  max-width: 720px;
  padding-top: 0.3rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 2rem;
  justify-content: ${({ isFirstRender }) => (isFirstRender ? 'center' : 'flex-start')};
  align-items: center;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 1.7rem;
  height: 1.7rem;
  border: 0.2rem solid #ccc;
  border-top-color: #ff8a8a;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

const IntersectionTrigger = styled.div`
  display: flex;
  width: 100%;
  min-height: 1rem;
  justify-content: center;
  align-items: center;
`;

export const ChatBox = ({
  chatMessages,
  meetUpId,
  myId,
  isConnected,
  participants,
  setChatMessages,
  bottomElementRef,
}: ChatBoxProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const intersectionTriggerRef = useRef<HTMLDivElement | null>(null);
  const nextId = useRef<number | undefined>(undefined);
  const hasNext = useRef(true);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const getChatData = async () => {
    if (!meetUpId || !myId) return;

    if (!hasNext.current) return;

    try {
      const response = await getChatList(meetUpId, nextId.current);
      const parsedMessages = messageParser(response.content, myId);
      setChatMessages((prevMessages) => [...prevMessages, ...parsedMessages]);
      hasNext.current = response.hasNext;
      nextId.current = response.nextId;
      console.log('채팅 목록 조회 성공:', response);

      if (isFirstRender) {
        requestAnimationFrame(() => {
          bottomElementRef.current?.scrollIntoView({ behavior: 'auto' });
          setIsLoading(false);
          setIsFirstRender(false);
        });
      }
    } catch (error) {
      console.error('채팅 목록 조회 실패:', error);
    }
  };

  // 초기 입장 시, 이전 채팅 내역 조회
  useEffect(() => {
    if (meetUpId && isConnected) {
      getChatData();
    }
  }, [meetUpId, isConnected]);

  // 위로 스크롤 시, 이전 채팅 내역 조회
  useEffect(() => {
    const container = containerRef.current;
    const targetElement = intersectionTriggerRef?.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isFirstRender) return;

        if (entry.isIntersecting) {
          getChatData();
        }
      },
      {
        root: container,
        rootMargin: '300px',
        threshold: 0.1,
      },
    );
    if (targetElement) observer.observe(targetElement);

    return () => {
      if (targetElement) observer.unobserve(targetElement);
    };
  }, [meetUpId, isConnected, isFirstRender]);

  return (
    <Container ref={containerRef} isFirstRender={isFirstRender}>
      {isFirstRender ? (
        <Spinner />
      ) : (
        <>
          <div ref={bottomElementRef} />
          {chatMessages.map((message) => {
            const sender = findSender(participants, message.senderId);

            return (
              <Message
                key={message.id}
                senderType={message.senderType}
                content={message.content}
                sender={sender}
              />
            );
          })}
          <IntersectionTrigger ref={intersectionTriggerRef}>
            {!isFirstRender && isLoading && <Spinner />}
          </IntersectionTrigger>
        </>
      )}
    </Container>
  );
};
