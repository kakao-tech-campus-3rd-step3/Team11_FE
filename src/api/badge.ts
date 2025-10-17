import api from './axiosInstance';
import type { BadgeListResponse } from '@/types/badge';

// 내 뱃지 조회 API
export const getMyBadges = async (): Promise<BadgeListResponse> => {
  try {
    const response = await api.get<BadgeListResponse>('/api/profiles/me/badges');
    console.log('뱃지 조회 성공:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('뱃지 조회 실패:', error);
    throw error;
  }
};

