import api from './axiosInstance';
import type { SigunguResponse } from '@/types/sigungu';

// 위도/경도 기반 시군구 영역조회
export const getSigunguByLocation = async (
  latitude: number,
  longitude: number,
): Promise<SigunguResponse> => {
  const response = await api.get<SigunguResponse>('/api/sigungu/within', {
    params: {
      latitude,
      longitude,
    },
  });
  return response.data;
};

