import { clearTokens, getAccessToken } from '@/utils/tokenStorage';
import axios from 'axios';
import {
  NETWORK_ERROR_CODES,
  HTTP_STATUS,
  ERROR_MESSAGES,
  SERVER_RESPONSE_KEYS,
} from '@/utils/errorCodes';

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
  const token = getAccessToken();
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
      case NETWORK_ERROR_CODES.ECONNABORTED:
        return ERROR_MESSAGES.TIMEOUT;
      case NETWORK_ERROR_CODES.ERR_NETWORK:
        return ERROR_MESSAGES.NETWORK_ERROR;
      default:
        return ERROR_MESSAGES.CONNECTION_ERROR;
    }
  }

  // 유효성 검사 에러 처리
  if (error.response.data?.[SERVER_RESPONSE_KEYS.VALIDATION_ERRORS]) {
    const validationErrors = error.response.data[SERVER_RESPONSE_KEYS.VALIDATION_ERRORS];
    const errorMessages = Object.entries(validationErrors)
      .map(([_, messages]) => (messages as string[]).join('\n'))
      .join('\n');
    return errorMessages || ERROR_MESSAGES.VALIDATION_ERROR;
  }

  // 서버 응답 에러 처리
  return (
    error.response.data?.[SERVER_RESPONSE_KEYS.DETAIL] ||
    error.response.data?.[SERVER_RESPONSE_KEYS.MESSAGE] ||
    ERROR_MESSAGES.DEFAULT_ERROR
  );
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
