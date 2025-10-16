import { useRef, useCallback, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import type { IMessage } from '@stomp/stompjs';
import { getAccessToken } from '@/utils/tokenStorage';
import { getUgradeToken } from '@/api/services/auth.service';
import { body } from '@/api/services/mockBodyData';

type MessageType = 'TEXT' | 'IMAGE' | 'SYSTEM';
interface ChatMessage {
  type: MessageType;
  content: string;
}

export function useChat(meetupId: string | null) {
  const [connected, setConnected] = useState(false);
  const clientRef = useRef<Client | null>(null);
  const accessToken = getAccessToken();

  // 연결
  const connect = useCallback(async () => {
    if (!meetupId) {
      console.warn('[useChat] Cannot connect: meetupId is null or undefined.');
      return;
    }

    const upgradeToken = await getUgradeToken(body);

    if (clientRef.current?.connected) {
      console.log('Already connected');
      return;
    }

    const socketUrl = `${import.meta.env.VITE_API_BASE_URL}/ws/chat?token=${upgradeToken}`;

    const client = new Client({
      webSocketFactory: () => new SockJS(socketUrl),
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    client.onConnect = () => {
      // 메시지 구독
      client.subscribe(
        `/topic/meetups/${meetupId}/messages`,
        (msg: IMessage) => {
          console.log('Message:', JSON.parse(msg.body));
        },
        {
          Authorization: `Bearer ${accessToken}`,
        },
      );

      // 액션 구독
      client.subscribe(
        `/topic/meetups/${meetupId}/actions`,
        (msg: IMessage) => {
          console.log('Action:', JSON.parse(msg.body));
        },
        {
          Authorization: `Bearer ${accessToken}`,
        },
      );

      // 에러 구독
      client.subscribe(`/user/queue/errors`, (msg: IMessage) => {
        console.error('Error:', msg.body);
      });

      setConnected(true);
      console.log('Connected');
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
    (type: MessageType, content: string) => {
      if (!connected) {
        console.warn('Not connected');
        return;
      }
      // !clientRef.current: 아직 클라이언트를 만들지 않은 경우를 차단
      // !clientRef.current.connected: clientRef.current 객체는 있는데, 실제 연결은 아직 안 된 경우를 차단

      const destination = `/app/meetups/${meetupId}/messages`;
      const payload: ChatMessage = { type, content };
      clientRef.current?.publish({
        destination: destination,
        headers: { Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify(payload),
      });
      console.log('Sent:', payload);
    },
    [meetupId, connected],
  );

  return { connect, disconnect, sendMessage };
}
