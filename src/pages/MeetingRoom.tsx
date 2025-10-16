import { getMyJoinedMeetup } from '@/api/services/meeting_room.service';
import { ChatBox } from '@/components/meeting_room_page/ChatBox';
import { ChatInput } from '@/components/meeting_room_page/ChatInput';
import { Header } from '@/components/meeting_room_page/Header';
import { mockMessages } from '@/components/meeting_room_page/mockData';
import { ParticipantList } from '@/components/meeting_room_page/ParticipantList';
import { useChat } from '@/hooks/useChat';
import { Container } from '@/style/CommonStyle';
import type { ChatMessage } from '@/types/meeting_room_page/chatMessage';
import { useEffect, useState } from 'react';

const MeetingRoom = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockMessages);
  const [meetingRoomId, setMeetingRoomId] = useState<string | null>(null);
  const { connect, sendMessage } = useChat(meetingRoomId);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await getMyJoinedMeetup();
        setMeetingRoomId(response.id);
        console.log('모임 조회 성공:', response);
      } catch (error) {
        console.error('모임 조회 실패:', error);
      }
    };
    if (!meetingRoomId) init();
    connect();
  }, [meetingRoomId]);

  return (
    <Container>
      <Header />
      <ParticipantList />
      <ChatBox chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        sendMessage={sendMessage}
      />
    </Container>
  );
};

export default MeetingRoom;
