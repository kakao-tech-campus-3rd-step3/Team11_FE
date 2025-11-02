import type { Meeting } from '@/types/meeting';
import api from '../clients/axiosInstance';

export interface GetMeetingsParams {
  name?: string;
  hobby?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
}

export const getMeetings = async (params: GetMeetingsParams): Promise<Meeting[]> => {
  const response = await api.get<Meeting[]>('/api/meetings', { params });
  return response.data;
};
