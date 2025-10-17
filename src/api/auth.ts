import api from './axiosInstance';

// 로그인
export const login = async (email: string, password: string) => {
  const res = await api.post('/api/auth/login', { email, password });
  return res.data;
};

// 카카오 로그인
export const kakaoLogin = async (code: string) => {
  const res = await api.post('/api/auth/kakao', { code });
  return res.data;
};

// 회원가입
export const signup = async (email: string, password1: string, password2: string) => {
  const res = await api.post('/api/auth/signup', { email, password1, password2 });
  return res.data;
};

// 로그아웃
export const logout = async () => {
  const res = await api.post('/api/auth/logout');
  return res.data;
};
