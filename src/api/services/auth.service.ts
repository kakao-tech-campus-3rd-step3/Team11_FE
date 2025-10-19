import { getAccessToken } from '@/utils/tokenStorage';
import publicApi from '../clients/publicApi';
import type { MeetupRequestDTO } from '../types/meeting_room.dto';

export const getUgradeToken = async (body: MeetupRequestDTO) => {
  try {
    const accessToken = getAccessToken();
    const response = await publicApi.post('/api/auth/ws-upgrade', body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('업그레이드 토큰 요청 실패:', error);
    throw error;
  }
};
