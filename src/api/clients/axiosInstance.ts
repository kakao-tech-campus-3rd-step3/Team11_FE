import { clearTokens, getAccessToken, getRefreshToken } from '@/utils/tokenStorage';
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

// 리프레시 토큰으로 새 액세스 토큰 발급
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return null;

    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`,
      { refreshToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const { accessToken } = response.data;
    if (accessToken) {
      // 새 토큰 저장
      localStorage.setItem('accessToken', accessToken);
      return accessToken;
    }
    return null;
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    return null;
  }
};

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
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } else {
        clearTokens();
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }

    const transformedError = new Error(transformErrorMessage(error)) as any;
    transformedError.response = error.response;
    transformedError.status = error.response?.status;
    return Promise.reject(transformedError);
  },
);

export default api;
