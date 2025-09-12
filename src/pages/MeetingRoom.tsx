import { ChatBox } from '@/components/meeting_room_page/ChatBox';
import { ChatInput } from '@/components/meeting_room_page/ChatInput';
import { Header } from '@/components/meeting_room_page/Header';
import { mockMessages } from '@/components/meeting_room_page/mockData';
import { ParticipantList } from '@/components/meeting_room_page/ParticipantList';
import { Container } from '@/style/CommonStyle';
import type { ChatMessage } from '@/types/meeting_room_page/chatMessage';
import { useState } from 'react';

const MeetingRoom = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockMessages);

  return (
    <Container>
      <Header />
      <ParticipantList />
      <ChatBox chatMessages={chatMessages} />
      <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages} />
    </Container>
  );
};

export default MeetingRoom;
