import {
  getMyJoinedMeetup,
  getParticipantsInMeetUp,
  joinMeetUp,
} from '@/api/services/meetup_room.service';
import type { MeetupResponseDTO, ParticipantDTO } from '@/api/types/meeting_room.dto';
import { ChatBox } from '@/components/meeting_room_page/ChatBox';
import { ChatInput } from '@/components/meeting_room_page/ChatInput';
import { Header } from '@/components/meeting_room_page/Header';
import { ParticipantList } from '@/components/meeting_room_page/ParticipantList';
import { useChat } from '@/hooks/useChat';
import { Container } from '@/style/CommonStyle';
import type { ChatMessage } from '@/types/meeting_room_page/chatMessage';
import { checkHost } from '@/utils/checkHost';
import { useEffect, useRef, useState } from 'react';

const TEST_MEETUP_ID = '2258edde-d510-439a-86c7-91c37a8ab430';

const MeetingRoom = () => {
  const bottomElementRef = useRef<HTMLDivElement | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [meetUpInfo, setmeetUpInfo] = useState<MeetupResponseDTO | null>(null);
  const [participants, setParticipants] = useState<ParticipantDTO[]>([]);
  const [isHost, setIsHost] = useState<boolean>(false);
  const { connect, disconnect, isConnected, myIdRef, sendMessage, newChatMessage } = useChat(
    meetUpInfo?.id || null,
  );

  console.log(
    'MeetingRoom 렌더링, meetUpId:',
    meetUpInfo?.id,
    'myId:',
    myIdRef.current,
    'isConnected:',
    isConnected,
  );

  // 모임 참가 임시 로직
  useEffect(() => {
    const init = async () => {
      try {
        const response = await getMyJoinedMeetup();
        setmeetUpInfo(response);
        console.log('모임 조회 성공:', response);
      } catch (error) {
        console.error(error);
        try {
          const response = await joinMeetUp(TEST_MEETUP_ID);
          console.log('모임 참가 성공:', response);
        } catch (error) {
          console.error(error);
        }
      }
    };
    if (!meetUpInfo) init();
    else connect();

    return () => {
      disconnect();
    };
  }, [meetUpInfo]);

  useEffect(() => {
    const getParticipantsInfo = async () => {
      if (!meetUpInfo) return;

      try {
        const response = await getParticipantsInMeetUp(meetUpInfo.id);
        setParticipants(response);
        console.log('참여자 정보 조회 성공:', response);
      } catch (error) {
        console.error('참여자 정보 조회 실패:', error);
      }
    };

    getParticipantsInfo();
  }, [meetUpInfo]);

  useEffect(() => {
    setIsHost(checkHost(participants, myIdRef.current!));
  }, [participants, myIdRef.current]);

  useEffect(() => {
    if (!newChatMessage) return;
    console.log('newChatMessage:', newChatMessage);
    setChatMessages((prevMessages) => [newChatMessage, ...prevMessages]);
  }, [newChatMessage]);

  return (
    <Container>
      <Header roomTitle={meetUpInfo?.name || ''} isHost={isHost} />
      <ParticipantList participants={participants} />
      <ChatBox
        chatMessages={chatMessages}
        meetUpId={meetUpInfo?.id || null}
        myId={myIdRef.current}
        participants={participants}
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
