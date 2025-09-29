import { clearTokens } from "@/utils/tokenStorage";
import axios from "axios";

const HTTP_STATUS = {
  UNAUTHORIZED: 401,
} as const;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://swallow104.gonetis.com:18081", 
  timeout: 10000, // 10초 
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: false, // CORS 문제 해결을 위해 false로 설정
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
    
    return Promise.reject(error);
  }
);

export default api;
