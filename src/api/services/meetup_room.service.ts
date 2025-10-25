import type { MeetupRequestDTO, MeetupResponseDto } from '../types/meeting_room.dto';
import api from '../clients/axiosInstance';

export const createMeetUp = async (body: MeetupRequestDTO) => {
  const response = await api.post<MeetupResponseDto>('/api/meetups', body);
  return response.data;
};

export const joinMeetUp = async (meetUpId: string) => {
  const response = await api.post(`/api/meetups/${meetUpId}/participants`);
  return response.data;
};

export const getMyJoinedMeetup = async () => {
  const response = await api.get('/api/meetups/me');
  return response.data;
};

export const leaveMeetUp = async (meetUpId: string) => {
  const response = await api.delete(`/api/meetups/${meetUpId}/participants`);
  return response.data;
};
