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
import { Timer } from '@/components/meeting_room_page/Timer';
import { useChat } from '@/hooks/useChat';
import { Container } from '@/style/CommonStyle';
import type { ChatMessage } from '@/types/meeting_room_page/chatMessage';
import { checkHost } from '@/utils/checkHost';
import { checkHostId } from '@/utils/checkHostId';
import { handleSocketAction } from '@/utils/handleSocketAction';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TEST_MEETUP_ID = import.meta.env.VITE_TEST_MEETUP_ID;

const MeetingRoom = () => {
  const navigate = useNavigate();
  const bottomElementRef = useRef<HTMLDivElement | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [meetUpInfo, setmeetUpInfo] = useState<MeetupResponseDTO | null>(null);
  const [participants, setParticipants] = useState<ParticipantDTO[]>([]);
  const [isHost, setIsHost] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const { connect, disconnect, isConnected, myIdRef, sendMessage, newAction, newChatMessage } =
    useChat(meetUpInfo || null);

  // 모임 참가 임시 로직 & 모임 정보 조회
  useEffect(() => {
    const init = async () => {
      try {
        const response = await getMyJoinedMeetup();
        setmeetUpInfo(response);
        setIsStarted(response.status === 'IN_PROGRESS');
        console.log('모임 조회 성공:', response);
      } catch (error) {
        console.error(error);
        try {
          await joinMeetUp(TEST_MEETUP_ID);
          const response = await getMyJoinedMeetup();
          setmeetUpInfo(response);
          setIsStarted(response.status === 'IN_PROGRESS');
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
    const getNewInfo = async () => {
      try {
        const response = await getMyJoinedMeetup();
        setmeetUpInfo(response);
      } catch (error) {
        console.error(error);
      }
    };
    if (newAction?.action === 'MODIFIED') getNewInfo();
  }, [newAction]);

  // 현재 참여자 정보 조회
  useEffect(() => {
    if (!newAction) return;

    if (!['JOIN', 'ENTER', 'EXIT'].includes(newAction.action ?? '')) return;

    const getParticipantsInfo = async () => {
      if (!meetUpInfo) return;

      try {
        const response = await getParticipantsInMeetUp(meetUpInfo.id);
        setParticipants(response);
        checkHostId(response);
        console.log('참여자 정보 조회 성공:', response);
      } catch (error) {
        console.error('참여자 정보 조회 실패:', error);
      }
    };

    getParticipantsInfo();
  }, [meetUpInfo, newAction]);

  // 내가 방장인지 아닌지 확인
  useEffect(() => {
    setIsHost(checkHost(participants, myIdRef.current!));
  }, [participants]);

  // 웹소캣 액션 메세지에 따른 로직 제어
  useEffect(() => {
    if (!newAction || !myIdRef.current) return;
    console.log('newAction', newAction);
    handleSocketAction('JOIN', newAction, navigate, myIdRef.current, setChatMessages);
    handleSocketAction('EXIT', newAction, navigate, myIdRef.current, setChatMessages);
    handleSocketAction('NEAR_STARTED', newAction, navigate);
    handleSocketAction('STARTED', newAction, navigate, undefined, setIsStarted);
    handleSocketAction('NEAR_END', newAction, navigate);
    handleSocketAction('END', newAction, navigate);
    handleSocketAction('MODIFIED', newAction, navigate);
    handleSocketAction('CANCELED', newAction, navigate);
  }, [newAction]);

  // 새 메세지 수신 시 표시
  useEffect(() => {
    if (!newChatMessage) return;
    console.log('newChatMessage:', newChatMessage);
    setChatMessages((prevMessages) => [newChatMessage, ...prevMessages]);
  }, [newChatMessage]);

  return (
    <Container>
      <Header
        roomTitle={meetUpInfo?.name || ''}
        meetUpId={meetUpInfo?.id || ''}
        isHost={isHost}
        isStarted={isStarted}
        disconnect={disconnect}
      />
      <ParticipantList participants={participants} />
      <Timer startAt={meetUpInfo?.startAt} isStarted={isStarted} />
      <ChatBox
        chatMessages={chatMessages}
        meetUpId={meetUpInfo?.id || null}
        myId={myIdRef.current}
        participants={participants}
        isConnected={isConnected}
        setChatMessages={setChatMessages}
        bottomElementRef={bottomElementRef}
      />
      <ChatInput sendMessage={sendMessage} myId={myIdRef.current} />
    </Container>
  );
};

export default MeetingRoom;
