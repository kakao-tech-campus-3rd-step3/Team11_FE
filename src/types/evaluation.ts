// 평가 모임 타입 정의
export interface Meetup {
  meetupId: string;
  name: string;
  category: 'SPORTS' | 'STUDY' | 'GAME' | 'FOOD' | 'CULTUR_ARTS' | 'OTAKU' | 'TRAVEL' | 'OTHER';
  startAt: string;
  endAt: string;
  participantCount: number;
  capacity: number;
  evaluated: boolean;
}

// 페이지 정보
export interface PageInfo {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

// 평가 모임 목록 응답
export interface EvaluationListResponse {
  content: Meetup[];
  page: PageInfo;
}
