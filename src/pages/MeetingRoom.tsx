import { ChatBox } from '@/components/meeting_room_page/ChatBox';
import { ChatInput } from '@/components/meeting_room_page/ChatInput';
import { Header } from '@/components/meeting_room_page/Header';
import { mockMessages } from '@/components/meeting_room_page/mockData';
import { ParticipantList } from '@/components/meeting_room_page/ParticipantList';
// import { useAuth } from '@/hooks/useAuth';
import { useChat } from '@/hooks/useChat';
import { Container } from '@/style/CommonStyle';
import type { ChatMessage } from '@/types/meeting_room_page/chatMessage';
import { getAccessToken } from '@/utils/tokenStorage';
import { useEffect, useState } from 'react';

const MeetingRoom = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockMessages);
  const { connect } = useChat('95ee73b5-9c1c-4224-b445-59094dc20152');
  // const { login } = useAuth();

  useEffect(() => {
    (async () => {
      // login({ email: 'user@test.com', password: 'testpass1212!' });
      console.log(`Token: ${getAccessToken()}`);
      connect();
    })();
  }, []);

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
