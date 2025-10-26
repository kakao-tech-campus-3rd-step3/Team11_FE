import { getMyJoinedMeetup, joinMeetUp } from '@/api/services/meetup_room.service';
import { ChatBox } from '@/components/meeting_room_page/ChatBox';
import { ChatInput } from '@/components/meeting_room_page/ChatInput';
import { Header } from '@/components/meeting_room_page/Header';
import { ParticipantList } from '@/components/meeting_room_page/ParticipantList';
import { useChat } from '@/hooks/useChat';
import { Container } from '@/style/CommonStyle';
import type { ChatMessage } from '@/types/meeting_room_page/chatMessage';
import { useEffect, useRef, useState } from 'react';

const TEST_MEETUP_ID = '2258edde-d510-439a-86c7-91c37a8ab430';

const MeetingRoom = () => {
  const bottomElementRef = useRef<HTMLDivElement | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [meetUpId, setmeetUpId] = useState<string | null>(null);
  const { connect, isConnected, myIdRef, sendMessage, newChatMessage } = useChat(meetUpId);

  console.log(
    'MeetingRoom 렌더링, meetUpId:',
    meetUpId,
    'myId:',
    myIdRef.current,
    'isConnected:',
    isConnected,
  );

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

  useEffect(() => {
    if (!newChatMessage) return;
    console.log('newChatMessage:', newChatMessage);
    setChatMessages((prevMessages) => [newChatMessage, ...prevMessages]);
  }, [newChatMessage]);

  return (
    <Container>
      <Header />
      <ParticipantList />
      <ChatBox
        chatMessages={chatMessages}
        meetUpId={meetUpId}
        myId={myIdRef.current}
        isConnected={isConnected}
        setChatMessages={setChatMessages}
        bottomElementRef={bottomElementRef}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        sendMessage={sendMessage}
      />
    </Container>
  );
};

export default MeetingRoom;
