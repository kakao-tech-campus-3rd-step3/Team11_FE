import api from '../clients/axiosInstance';

export interface BlockedUser {
  profileId: string;
  nickname: string;
  imageUrl: string;
  temperature: number;
  blockedAt: string;
}

export interface PageInfo {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface BlockListResponse {
  content: BlockedUser[];
  page: PageInfo;
}

// 특정 사용자 차단
export const blockUser = async (targetProfileId: string) => {
  const response = await api.post(`/api/blocks/${targetProfileId}`);
  return response.data;
};

// 차단 목록 조회
export const getBlockedUsers = async (): Promise<BlockListResponse> => {
  const response = await api.get<BlockListResponse>('/api/blocks/profiles');
  return response.data;
};

// 차단 해제
export const unblockUser = async (targetMemberId: string): Promise<void> => {
  await api.delete(`/api/blocks/${targetMemberId}`);
};
