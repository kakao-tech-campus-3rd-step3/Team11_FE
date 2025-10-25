import { clearTokens, getAccessToken } from '@/utils/tokenStorage';
import axios from 'axios';
import { HTTP_STATUS } from '@/api/utils/errorCodes';
import { transformErrorMessage } from '../utils/transformErrorMessage';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000, // 10초
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401 에러 시 토큰 제거
    if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
      clearTokens();
    }

    // 에러 메시지 변환 후 재발행
    const transformedError = new Error(transformErrorMessage(error));
    return Promise.reject(transformedError);
  },
);

export default api;
