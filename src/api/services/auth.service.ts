import type { MeetupRequestDTO } from '../types/meeting_room.dto';
import api from '../clients/axiosInstance';

// 로그인
export const login = async (email: string, password: string) => {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
};

// 카카오 로그인
export const kakaoLogin = async (code: string) => {
  const response = await api.post('/api/auth/kakao', { code });
  return response.data;
};

// 회원가입
export const signup = async (email: string, password1: string, password2: string) => {
  const response = await api.post('/api/auth/signup', { email, password1, password2 });
  return response.data;
};

// 로그아웃
export const logout = async () => {
  const response = await api.post('/api/auth/logout');
  return response.data;
};

// WebSocket 연결 시, 업그레이드 토큰 발급
export const getUgradeToken = async (body: MeetupRequestDTO) => {
  const response = await api.post('/api/auth/ws-upgrade', body);
  return response.data;
};

// 이메일 인증
export const verifyEmail = async (code: string) => {
  const response = await api.get(`/api/auth/verify?code=${code}`);
  return response.data;
};