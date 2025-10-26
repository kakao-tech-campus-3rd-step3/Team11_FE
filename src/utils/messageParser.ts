import type { ChatMessage } from '@/types/meeting_room_page/chatMessage';

type MessageType = 'TEXT' | 'IMAGE' | 'SYSTEM';

type rawMessages = {
  type: MessageType;
  content: string;
  senderId: number;
  sentAt: string;
};

export const messageParser = (rawMessages: rawMessages[], myId: string): ChatMessage[] => {
  const chatMessages = rawMessages.map((msg) => {
    const parsedMsg: ChatMessage = {
      id: crypto.randomUUID(),
      senderType: myId === msg.senderId.toString() ? 'me' : 'other',
      content: msg.content,
      time: new Date(msg.sentAt),
    };

    return parsedMsg;
  });

  return chatMessages;
};
