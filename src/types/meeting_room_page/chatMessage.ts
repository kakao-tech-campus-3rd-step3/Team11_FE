import type { Dispatch, SetStateAction } from 'react';

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type MessageType = 'TEXT' | 'IMAGE' | 'SYSTEM';

export type Payload = {
  type: MessageType;
  content: string;
};

export type ChatMessage = {
  id: string;
  senderId: number;
  senderType: 'me' | 'other' | 'system';
  content: string;
  time: Date;
};
