import { useRef, useCallback, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import type { IMessage } from '@stomp/stompjs';
import { getAccessToken } from '@/utils/tokenStorage';
import { getUgradeToken } from '@/api/services/auth.service';
import { body } from '@/data/mockApiBodyData';
import type { ChatMessage } from '@/types/meeting_room_page/chatMessage';
import type { ChatMessageDTO } from '@/api/types/meeting_room.dto';

type ActionType = 'ENTER' | 'LEAVE' | 'EXIT' | 'MESSAGE' | 'STARTED' | 'FINISH' | undefined;

type MessageType = 'TEXT' | 'IMAGE' | 'SYSTEM';

type Payload = {
  type: MessageType;
  content: string;
};

export function useChat(meetupId: string | null) {
  const isFirstConnectRef = useRef(true);
  const myIdRef = useRef<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [newAction, setNewAction] = useState<ActionType>(undefined);
  const [newChatMessage, setNewChatMessage] = useState<ChatMessage | null>(null);
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
      // 액션 구독
      client.subscribe(
        `/topic/meetups/${meetupId}/actions`,
        (msg: IMessage) => {
          console.log('Action:', JSON.parse(msg.body));
          const response = JSON.parse(msg.body);
          if (isFirstConnectRef.current && response.action === 'ENTER') {
            myIdRef.current = response.participantId;
            isFirstConnectRef.current = false;
            setIsConnected(true);
          }
          setNewAction(response.action);
        },
        {
          Authorization: `Bearer ${accessToken}`,
        },
      );

      // 메시지 구독
      client.subscribe(
        `/topic/meetups/${meetupId}/messages`,
        (msg: IMessage) => {
          console.log('Message:', JSON.parse(msg.body));
          const response: ChatMessageDTO = JSON.parse(msg.body);

          if (!myIdRef.current || myIdRef.current === response.senderId) return;

          const chatMessage: ChatMessage = {
            id: crypto.randomUUID(),
            senderId: response.senderId,
            senderType: 'other',
            content: response.content,
            time: new Date(response.sentAt),
          };
          setNewChatMessage(chatMessage);
          setNewAction('MESSAGE');
        },
        {
          Authorization: `Bearer ${accessToken}`,
        },
      );

      // 에러 구독
      client.subscribe(`/user/queue/errors`, (msg: IMessage) => {
        console.error('Error:', msg.body);
      });

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
      if (!isConnected) {
        console.warn('Not connected');
        return;
      }
      // !clientRef.current: 아직 클라이언트를 만들지 않은 경우를 차단
      // !clientRef.current.connected: clientRef.current 객체는 있는데, 실제 연결은 아직 안 된 경우를 차단

      const destination = `/app/meetups/${meetupId}/messages`;
      const payload: Payload = { type, content };
      clientRef.current?.publish({
        destination: destination,
        headers: { Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify(payload),
      });
      console.log('Sent:', payload);
    },
    [meetupId, isConnected],
  );

  return { connect, disconnect, isConnected, myIdRef, sendMessage, newAction, newChatMessage };
}
