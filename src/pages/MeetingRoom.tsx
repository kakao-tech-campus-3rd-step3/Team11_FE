import { getMyJoinedMeetup, joinMeetUp } from '@/api/services/meeting_room.service';
import { ChatBox } from '@/components/meeting_room_page/ChatBox';
import { ChatInput } from '@/components/meeting_room_page/ChatInput';
import { Header } from '@/components/meeting_room_page/Header';
import { mockMessages } from '@/components/meeting_room_page/mockData';
import { ParticipantList } from '@/components/meeting_room_page/ParticipantList';
import { useChat } from '@/hooks/useChat';
import { Container } from '@/style/CommonStyle';
import type { ChatMessage } from '@/types/meeting_room_page/chatMessage';
import { useEffect, useState } from 'react';

const TEST_MEETUP_ID = 'db6acd92-a2ef-4383-9a57-94a48f4c6ea2';

const MeetingRoom = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockMessages);
  const [meetUpId, setmeetUpId] = useState<string | null>(null);
  const { connect, myId, actorId, sendMessage, newChatMessage } = useChat(meetUpId);

  useEffect(() => {
    console.log('myId:', myId, 'actorId:', actorId, 'newChatMessage:', newChatMessage);
  }, [myId, actorId]);

  useEffect(() => {
    if (newChatMessage && myId !== actorId) {
      setChatMessages((prevMessages) => [...prevMessages, newChatMessage]);
    }
  }, [newChatMessage]);

  // 테스트용 모임 참가 로직
  useEffect(() => {
    const init = async () => {
      try {
        const response = await getMyJoinedMeetup();
        setmeetUpId(response.id);
        console.log('모임 조회 성공:', response);
      } catch (error) {
        console.error(error);
        try {
          const response = await joinMeetUp(TEST_MEETUP_ID);
          setmeetUpId(TEST_MEETUP_ID);
          console.log('모임 참가 성공:', response);
        } catch (error) {
          console.error(error);
        }
      }
    };
    if (!meetUpId) init();
    else connect();
  }, [meetUpId]);

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
