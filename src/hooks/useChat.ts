import { useEffect, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import type { IMessage } from '@stomp/stompjs';

interface ChatMessage {
  type: 'TEXT' | 'IMAGE' | 'SYSTEM';
  content: string;
}

export function useChat(meetupId: string) {
  const clientRef = useRef<Client | null>(null);

  // 연결
  const connect = useCallback(() => {
    if (clientRef.current?.connected) {
      console.log('이미 연결됨');
      return;
    }

    const socketUrl = `${import.meta.env.VITE_API_BASE_URL}/ws/chat`;

    const client = new Client({
      webSocketFactory: () => new SockJS(socketUrl),
      reconnectDelay: 3000, // 연결 끊어지면 3초 후 재연결
    });

    client.onConnect = () => {
      console.log('Connected');

      // 메시지 구독
      client.subscribe(`/topic/meetups/${meetupId}/messages`, (msg: IMessage) => {
        console.log('Message:', JSON.parse(msg.body));
      });

      // 액션 구독
      client.subscribe(`/topic/meetups/${meetupId}/actions`, (msg: IMessage) => {
        console.log('Action:', JSON.parse(msg.body));
      });

      // 에러 구독
      client.subscribe(`/user/queue/errors`, (msg: IMessage) => {
        console.error('Error:', msg.body);
      });
    };

    client.onStompError = (frame) => {
      console.error('Broker error:', frame.headers['message'], frame.body);
    };

    client.activate();
    clientRef.current = client;
  }, [meetupId]);

  // 연결 해제
  const disconnect = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.deactivate();
      clientRef.current = null;
      console.log('Disconnected');
    }
  }, []);

  // 메시지 보내기
  const sendMessage = useCallback(
    (type: ChatMessage['type'], content: string) => {
      if (!clientRef.current || !clientRef.current.connected) {
        console.warn('Not connected');
        return;
      }
      // !clientRef.current: 아직 클라이언트를 만들지 않은 경우를 차단
      // !clientRef.current.connected: clientRef.current 객체는 있는데, 실제 연결은 아직 안 된 경우를 차단

      const destination = `/app/meetups/${meetupId}/messages`;
      const payload: ChatMessage = { type, content };
      clientRef.current.publish({
        destination: destination,
        body: JSON.stringify(payload),
      });
      console.log('Sent:', payload);
    },
    [meetupId],
  );

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return { connect, disconnect, sendMessage };
}
