import api from '../clients/axiosInstance';
import type { SigunguResponse, SigunguListResponse } from '@/types/sigungu';

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

// 시도 코드로 시군구 리스트 조회
export const getSigunguListBySido = async (sidoCode: number): Promise<SigunguListResponse> => {
  const response = await api.get<SigunguListResponse>('/api/sigungu', {
    params: {
      sidoCode,
    },
  });
  return response.data;
};

// 위도/경도로 해당 지역의 시도에 속한 모든 시군구 리스트 조회
export const getSigunguListByLocation = async (
  latitude: number,
  longitude: number,
): Promise<SigunguListResponse> => {
  const sigungu = await getSigunguByLocation(latitude, longitude);
  const sidoCode = sigungu.sidoCode;
  return await getSigunguListBySido(sidoCode);
};
