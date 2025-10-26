import type { MeetupRequestDTO, MeetupResponseDto } from '../types/meeting_room.dto';
import api from '../clients/axiosInstance';

// 모임 생성
export const createMeetUp = async (body: MeetupRequestDTO) => {
  const response = await api.post<MeetupResponseDto>('/api/meetups', body);
  return response.data;
};

// 모임 참가
export const joinMeetUp = async (meetUpId: string) => {
  const response = await api.post(`/api/meetups/${meetUpId}/participants`);
  return response.data;
};

// 채팅 목록 조회
export const getChatList = async (meetUpId: string, nextId?: number) => {
  const response = await api.get(`/api/meetups/${meetUpId}/messages`, {
    params: nextId ? { cursorId: nextId } : undefined,
  });
  return response.data;
};

// 현재 내가 참여 중인 모임 조회
export const getMyJoinedMeetup = async () => {
  const response = await api.get('/api/meetups/me');
  return response.data;
};

// 모임 탈퇴
export const leaveMeetUp = async (meetUpId: string) => {
  const response = await api.delete(`/api/meetups/${meetUpId}/participants`);
  return response.data;
};

// 현재 참여 중인 참여자 조회
export const getCurrentParticipants = async (meetUpId: string) => {
  const response = await api.get(`/api/meetups/${meetUpId}/participants`);
  return response.data;
};
