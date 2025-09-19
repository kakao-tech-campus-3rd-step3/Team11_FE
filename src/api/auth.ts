import api from "./axiosInstance";

// 로그인 API
export const login = async (email: string, password: string) => {
  const res = await api.post("/api/auth/login", { email, password });
  return res.data; // { accessToken, refreshToken } 구조
};

// 카카오 로그인 API
export const kakaoLogin = async (code: string) => {
  const res = await api.post("/api/auth/kakao", { code });
  return res.data; // { accessToken, refreshToken, user } 구조
};

// 회원가입 API
export const signup = async (email: string, password1: string, password2: string) => {
  const res = await api.post("/api/auth/signup", { email, password1, password2 });
  return res.data; // { accessToken, refreshToken } 구조
};