import { useState } from 'react';
import publicApi from '@/api/publicApi';
import Cookies from 'js-cookie';

interface LoginPayload {
  email: string;
  password: string;
}

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (payload: LoginPayload) => {
    try {
      const res = await publicApi.post('/api/auth/login', payload);

      const { accessToken, refreshToken } = res.data;

      Cookies.set('accessToken', accessToken, {
        sameSite: 'none',
        secure: true,
      });
      Cookies.set('refreshToken', refreshToken, {
        sameSite: 'none',
        secure: true,
      });

      console.log(
        `로그인 성공, 쿠키 저장 완료 - accessToken: ${accessToken}, refreshToken: ${refreshToken}`,
      );
      setIsLoggedIn(true);
    } catch (err) {
      console.error('로그인 실패', err);
      setIsLoggedIn(false);
    }
  };

  const logout = async () => {
    try {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      await publicApi.post('/api/auth/logout');
      setIsLoggedIn(false);
      console.log('로그아웃 완료');
    } catch (err) {
      console.error('로그아웃 실패', err);
    }
  };

  return { isLoggedIn, login, logout };
}
