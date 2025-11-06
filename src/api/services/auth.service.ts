import type { MeetupRequestDTO } from '../types/meeting_room.dto';
import api from '../clients/axiosInstance';

// 로그인
export const login = async (email: string, password: string) => {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
};

// 카카오 로그인
export const kakaoLogin = async (code: string) => {
  const redirectUri = `${window.location.origin}/kakaoLogin`;
  const requestBody = {
    code,
    redirectUri,
  };
  
  console.log('=== 카카오 로그인 요청 ===');
  console.log('요청 URL:', '/api/auth/kakao');
  console.log('요청 본문:', JSON.stringify(requestBody, null, 2));
  console.log('현재 origin:', window.location.origin);
  
  try {
    const response = await api.post('/api/auth/kakao', requestBody);
    console.log('카카오 로그인 성공:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('=== 카카오 로그인 요청 실패 ===');
    console.error('에러 상태:', error.response?.status);
    console.error('에러 응답:', error.response?.data);
    console.error('에러 메시지:', error.message);
    console.error('요청 본문:', JSON.stringify(requestBody, null, 2));
    throw error;
  }
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
export const getUpgradeToken = async (body: MeetupRequestDTO) => {
  const response = await api.post('/api/auth/ws-upgrade', body);
  return response.data;
};

// 이메일 인증
export const verifyEmail = async (code: string) => {
  const response = await api.get(`/api/auth/verify?code=${code}`);
  return response.data;
};

// 회원탈퇴
export const deleteAccount = async () => {
  const response = await api.delete('/api/members/me');
  return response.data;
};
