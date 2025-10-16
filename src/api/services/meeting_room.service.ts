import { getAccessToken } from '@/utils/tokenStorage';
import publicApi from '../clients/publicApi';
import type { MeetupRequestDTO, MeetupResponseDto } from '../types/meeting_room.dto';

export const getMyJoinedMeetup = async () => {
  try {
    const accessToken = getAccessToken();
    const response = await publicApi.get<MeetupResponseDto>('/api/meetups/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('내 미팅룸 조회 실패:', error);
    if (error.response) {
      // 네트워크 에러 처리
      if (error.response.status === 0) {
        throw new Error('서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
      }
      // 인증 에러 처리
      if (error.response.status === 401) {
        throw new Error('인증이 필요합니다. 다시 로그인해주세요.');
      }
      // 권한 에러 처리
      if (error.response.status === 403) {
        throw new Error('권한이 없습니다. 접근이 거부되었습니다.');
      }
      // 리소스 없음 처리
      if (error.response.status === 404) {
        throw new Error('요청한 리소스를 찾을 수 없습니다.');
      }
      // 서버 에러 처리
      if (error.response.status >= 500) {
        throw new Error('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
      // 기타 에러 처리
      if (error.response.data && (error.response.data.detail || error.response.data.message)) {
        const errorMessage = error.response.data.detail || error.response.data.message;
        throw new Error(errorMessage);
      } else {
        throw new Error('알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    } else {
      // 요청이 아예 서버에 도달하지 못한 경우
      if (error.request) {
        throw new Error('서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
      } else {
        throw new Error('알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  }
};

export const createMeetUp = async (body: MeetupRequestDTO) => {
  try {
    const accessToken = getAccessToken();
    const response = await publicApi.post<MeetupResponseDto>('/api/meetups', body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('미팅룸 생성 요청 실패:', error);
    if (error.response) {
      // 네트워크 에러 처리
      if (error.response.status === 0) {
        throw new Error('서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
      }
      // 인증 에러 처리
      if (error.response.status === 401) {
        throw new Error('인증이 필요합니다. 다시 로그인해주세요.');
      }
      // 권한 에러 처리
      if (error.response.status === 403) {
        throw new Error('권한이 없습니다. 접근이 거부되었습니다.');
      }
      // 리소스 없음 처리
      if (error.response.status === 404) {
        throw new Error('요청한 리소스를 찾을 수 없습니다.');
      }
      // 서버 에러 처리
      if (error.response.status >= 500) {
        throw new Error('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
      // 기타 에러 처리
      if (error.response.data && (error.response.data.detail || error.response.data.message)) {
        const errorMessage = error.response.data.detail || error.response.data.message;
        throw new Error(errorMessage);
      } else {
        throw new Error('알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    } else {
      // 요청이 아예 서버에 도달하지 못한 경우
      if (error.request) {
        throw new Error('서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
      } else {
        throw new Error('알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  }
};

export const joinMeetUp = async () => {
  try {
    const TEST_MEETUP_ID = '40d1cd59-1323-4602-94ce-73219cba2c26';
    const accessToken = getAccessToken();
    const response = await publicApi.post(`/api/meetups/${TEST_MEETUP_ID}/participants`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('미팅룸 생성 요청 실패:', error);
    if (error.response) {
      // 네트워크 에러 처리
      if (error.response.status === 0) {
        throw new Error('서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
      }
      // 인증 에러 처리
      if (error.response.status === 401) {
        throw new Error('인증이 필요합니다. 다시 로그인해주세요.');
      }
      // 권한 에러 처리
      if (error.response.status === 403) {
        throw new Error('권한이 없습니다. 접근이 거부되었습니다.');
      }
      // 리소스 없음 처리
      if (error.response.status === 404) {
        throw new Error('요청한 리소스를 찾을 수 없습니다.');
      }
      // 서버 에러 처리
      if (error.response.status >= 500) {
        throw new Error('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
      // 기타 에러 처리
      if (error.response.data && (error.response.data.detail || error.response.data.message)) {
        const errorMessage = error.response.data.detail || error.response.data.message;
        throw new Error(errorMessage);
      } else {
        throw new Error('알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    } else {
      // 요청이 아예 서버에 도달하지 못한 경우
      if (error.request) {
        throw new Error('서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
      } else {
        throw new Error('알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  }
};
