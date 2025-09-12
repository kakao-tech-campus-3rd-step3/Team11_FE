export type ChatMessage = {
  id: string;
  senderType: 'me' | 'other';
  content: string;
  time: Date;
};
