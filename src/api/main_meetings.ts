import api from './axiosInstance';
import type { Meeting } from '@/types/meeting';

interface GetMeetingsParams {
  latitude: number;
  longitude: number;
  radius: number;
}

export const getMeetings = async (params: GetMeetingsParams): Promise<Meeting[]> => {
  try {
    const response = await api.get('/api/meetings', { params });
    return response.data;
  } catch (error) {
    console.error('주변 모임 목록 조회 실패:', error);
    throw error;
  }
};
