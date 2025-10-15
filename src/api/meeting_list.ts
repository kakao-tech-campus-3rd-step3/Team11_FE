import api from './axiosInstance';
import type { Meeting } from '@/types/meeting';

export interface GetMeetingsParams {
  name?: string;
  hobby?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
}

export const getMeetings = async (params: GetMeetingsParams): Promise<Meeting[]> => {
  try {
    const response = await api.get<Meeting[]>('/api/meetings', { params });
    return response.data;
  } catch (error) {
    console.error('모임 목록 조회 실패:', error);
    throw error;
  }
};
