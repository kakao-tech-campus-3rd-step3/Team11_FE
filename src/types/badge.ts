// 뱃지 타입 정의
export interface Badge {
  badgeId: string;
  name: string;
  description: string;
  iconUrl: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

// 페이지 정보
export interface PageInfo {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

// 뱃지 목록 응답
export interface BadgeListResponse {
  content: Badge[];
  page: PageInfo;
}

