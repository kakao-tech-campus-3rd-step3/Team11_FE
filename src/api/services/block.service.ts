import api from '../clients/axiosInstance';

export const blockUser = async (userId: string) => {
  const response = await api.post(`api/blocks/${userId}`);
  return response.data;
};
