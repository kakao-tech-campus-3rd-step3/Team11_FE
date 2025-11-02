import type {
  ChatListResponseDTO,
  ChatMessageDTO,
  MeetupRequestDTO,
  MeetupResponseDTO,
  ParticipantDTO,
} from '../types/meeting_room.dto';
import api from '../clients/axiosInstance';

// 모임 생성
export const createMeetUp = async (body: MeetupRequestDTO) => {
  const response = await api.post<MeetupResponseDTO>('/api/meetups', body);
  return response.data;
};

// 모임 참가
export const joinMeetUp = async (meetUpId: string) => {
  const response = await api.post(`/api/meetups/${meetUpId}/participants`);
  return response.data;
};

// 모임 수정
export const updateMeetUp = async (body: MeetupRequestDTO) => {
  const response = await api.put<MeetupResponseDTO>('/api/meetups/me', body);
  return response.data;
};

// 모임 시작
export const startMeetUp = async () => {
  const response = await api.post(`/api/meetups/me/start`);
  return response.data;
};

// 모임 종료
export const endMeetUp = async () => {
  const response = await api.post(`/api/meetups/me/finish`);
  return response.data;
};

// 채팅 목록 조회
const MAX_CHAT_FETCH_COUNT = 3; // 한 번에 최대 30개씩 반환

export const getChatList = async (meetUpId: string, nextId?: number) => {
  const messages: ChatMessageDTO[] = [];
  let hasNext = true;
  let cursorId = nextId;

  for (let i = 0; i < MAX_CHAT_FETCH_COUNT; i++) {
    if (!hasNext) break;

    const response = await api.get<ChatListResponseDTO>(`/api/meetups/${meetUpId}/messages`, {
      params: cursorId ? { cursorId } : undefined,
    });

    const data = response.data;
    messages.push(...data.content);

    hasNext = data.hasNext;
    cursorId = data.nextId;
  }

  return {
    content: messages,
    hasNext,
    nextId: cursorId,
  };
};

// 현재 내가 참여 중인 모임 조회
export const getMyJoinedMeetup = async () => {
  const response = await api.get<MeetupResponseDTO>('/api/meetups/me');
  return response.data;
};

// 현재 모임 내 참여자 조회
export const getParticipantsInMeetUp = async (meetUpId: string) => {
  const response = await api.get<ParticipantDTO[]>(`/api/meetups/${meetUpId}/participants`);
  return response.data;
};

// 모집 취소
export const cancelMeetUp = async () => {
  const response = await api.post(`/api/meetups/me/cancel`);
  return response.data;
};

// 모임 나가기
export const leaveMeetUp = async (meetUpId: string) => {
  const response = await api.delete(`/api/meetups/${meetUpId}/participants`);
  return response.data;
};
