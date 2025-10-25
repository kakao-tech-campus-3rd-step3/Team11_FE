import api from '../clients/axiosInstance';
import type { MyProfileState } from '@/store/slices/myProfileSlice';
import { createProfileFormData } from '../utils/createProfileFormData';
import type { BadgeListResponse } from '@/types/badge';

// 프로필 조회
export const getMyProfile = async (): Promise<MyProfileState> => {
  const response = await api.get<MyProfileState>('/api/profiles/me');
  return response.data;
};

// 온보딩용 프로필 저장
export const saveOnboardingProfile = async (profileData: MyProfileState) => {
  const formData = createProfileFormData(profileData);

  const response = await api.post('/api/profiles', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// 프로필 수정
export const updateProfile = async (profileData: MyProfileState) => {
  const formData = createProfileFormData(profileData);

  const response = await api.patch('/api/profiles/me', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// 다른 사용자 프로필 조회
export const getUserProfile = async (profileId: number): Promise<MyProfileState> => {
  const response = await api.get<MyProfileState>(`/api/profiles/${profileId}`);

  return response.data;
};

// 내 뱃지 조회 API
export const getMyBadges = async (): Promise<BadgeListResponse> => {
  const response = await api.get<BadgeListResponse>('/api/profiles/me/badges');
  console.log('뱃지 조회 성공:', response.data);
  return response.data;
};
