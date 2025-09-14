import type { Dispatch, SetStateAction } from 'react';

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type ChatMessage = {
  id: string;
  senderType: 'me' | 'other';
  content: string;
  time: Date;
};
