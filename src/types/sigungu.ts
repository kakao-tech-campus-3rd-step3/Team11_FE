// 시군구 조회 응답 
export interface SigunguResponse {
  sidoName: string;
  sidoCode: number;
  sigunguName: string;
  sigunguCode: number;
  baseLocation: {
    longitude: number;
    latitude: number;
    address: string;
  };
  createdAt: string;
  updatedAt: string;
}

// 시군구 리스트 응답
export interface SigunguListResponse {
  content: SigunguResponse[];
}

