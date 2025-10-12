import { clearTokens } from '@/utils/tokenStorage';
import axios from 'axios';

const HTTP_STATUS = {
  UNAUTHORIZED: 401,
} as const;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000, // 10초
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false, // CORS 문제 해결을 위해 false로 설정
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 에러 메시지 변환 함수
const transformErrorMessage = (error: any): string => {
  // 네트워크 에러 처리 (response가 없는 경우)
  if (!error.response) {
    switch (error.code) {
      case 'ECONNABORTED':
        return '서버 응답 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.';
      case 'ERR_NETWORK':
        return '네트워크 연결에 실패했습니다. 인터넷 연결을 확인해주세요.';
      default:
        return '서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.';
    }
  }

  // 유효성 검사 에러 처리
  if (error.response.data?.validationErrors) {
    const validationErrors = error.response.data.validationErrors;
    const errorMessages = Object.entries(validationErrors)
      .map(([_, messages]) => (messages as string[]).join('\n'))
      .join('\n');
    return errorMessages || '유효성 검사에 실패했습니다.';
  }

  // 서버 응답 에러 처리
  return error.response.data?.detail || 
         error.response.data?.message || 
         '요청 처리 중 오류가 발생했습니다.';
};

// 응답 인터셉터 추가
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401 에러 시 토큰 제거
    if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
      clearTokens();
    }

    // 에러 메시지 변환 후 재발생
    const transformedError = new Error(transformErrorMessage(error));
    return Promise.reject(transformedError);
  },
);

export default api;
