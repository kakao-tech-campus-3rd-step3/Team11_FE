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

// 시도 코드로 시군구 리스트 조회 (모든 페이지 가져오기)
export const getSigunguListBySido = async (sidoCode: number): Promise<SigunguListResponse> => {
  const allContent: SigunguResponse[] = [];
  let currentPage = 0;
  let totalPages = 1;
  const pageSize = 100; // 한 번에 가져올 크기

  // 모든 페이지를 순회
  while (currentPage < totalPages) {
    const response = await api.get<SigunguListResponse>('/api/sigungu', {
      params: {
        sidoCode,
        size: pageSize,
        page: currentPage,
      },
    });

    const data = response.data;
    allContent.push(...data.content);

    if (data.page) {
      totalPages = data.page.totalPages;
      currentPage++;
    } else {
      break;
    }
  }

  return {
    content: allContent,
    page: {
      size: allContent.length,
      number: 0,
      totalElements: allContent.length,
      totalPages: 1,
    },
  };
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
