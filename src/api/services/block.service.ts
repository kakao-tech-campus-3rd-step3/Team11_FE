import api from '../clients/axiosInstance';

// 특정 사용자 차단
export const blockUser = async (targetProfileId: string) => {
  const response = await api.post(`/api/blocks/${targetProfileId}`);
  return response.data;
};
