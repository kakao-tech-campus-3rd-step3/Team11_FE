import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.DEV ? "" : "http://swallow104.gonetis.com:18081", // 개발환경에서는 프록시 사용
  timeout: 10000, // 10초 타임아웃
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
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    
    return Promise.reject(error);
  }
);

export default api;
