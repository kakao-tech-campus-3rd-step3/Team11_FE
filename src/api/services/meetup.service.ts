import type { Meeting } from '@/types/meeting';
import api from '../clients/axiosInstance';

export interface GetMeetingsParams {
  name?: string;
  category?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
}

const baseURL = import.meta.env.VITE_API_BASE_URL as string | undefined;

export const getMeetings = async (params: GetMeetingsParams): Promise<Meeting[]> => {
  const url = baseURL ? `${baseURL}/api/meetups/geo` : '/api/meetups/geo';
  const response = await api.get<Meeting[]>(url, { params });
  return response.data;
};
