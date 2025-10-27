import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getMyProfile } from '@/api/services/profile.service';
import { setMyProfile, clearMyProfile } from '@/store/slices/myProfileSlice';
import { clearProfile, clearTokens, saveTokens, saveProfile } from '@/utils/tokenStorage';
import { kakaoLogin, login, logout, signup } from '@/api/services/auth.service';

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 로그인 성공
  const handleLoginSuccess = useCallback(
    async (result: any) => {
      try {
        saveTokens(result.accessToken, result.refreshToken);
        console.log(result.accessToken, result.refreshToken);

        try {
          const profileData = await getMyProfile();
          dispatch(setMyProfile(profileData));
          saveProfile(profileData);
        } catch (profileError) {
          console.error('프로필 조회 실패:', profileError);
          // 프로필 조회 실패 시 기본 데이터로 설정
          const userData = result.user || {};
          const defaultProfile = {
            name: userData.name || userData.nickname || result.email,
          };
          dispatch(setMyProfile(defaultProfile));
          saveProfile(defaultProfile); // 기본 프로필도 저장
        }

        navigate('/home');
      } catch (error) {
        console.error('로그인 후 처리 실패:', error);
        throw error;
      }
    },
    [dispatch, navigate],
  );

  const handleLoginError = useCallback((error: any, loginType: 'email' | 'kakao' = 'email') => {
    console.error(`${loginType === 'kakao' ? '카카오 ' : ''}로그인 에러:`, error);

    const errorMessage =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      `${loginType === 'kakao' ? '카카오 ' : ''}로그인에 실패했습니다. 네트워크 연결을 확인해주세요.`;

    alert(errorMessage);
  }, []);

  // 이메일 로그인
  const handleEmailLogin = useCallback(
    async (email: string, password: string) => {
      const result = await login(email, password);
      handleLoginSuccess(result);
    },
    [handleLoginSuccess],
  );

  // 카카오 로그인
  const handleKakaoLogin = useCallback(
    async (code: string) => {
      const result = await kakaoLogin(code);
      handleLoginSuccess(result);
    },
    [handleLoginSuccess],
  );

  // 회원가입
  const handleSignup = useCallback(
    async (email: string, password1: string, password2: string) => {
      try {
        const result = await signup(email, password1, password2);

        if (result.accessToken && result.refreshToken) {
          saveTokens(result.accessToken, result.refreshToken);
          console.log('회원가입 성공 - 토큰 저장 완료');
        }

        navigate('/onboarding');
      } catch (error: any) {
        handleLoginError(error, 'email');
        throw error;
      }
    },
    [navigate, handleLoginError],
  );

  // 로그아웃
  const handleLogout = useCallback(async () => {
    if (!confirm('로그아웃하시겠습니까?')) {
      return;
    }

    try {
      await logout();
      clearTokens();
      clearProfile();
      dispatch(clearMyProfile());
      alert('로그아웃되었습니다.');
      navigate('/login');
    } catch (error: any) {
      console.error('로그아웃 실패:', error);
      alert(`로그아웃 실패: ${error.message}`);
    }
  }, [dispatch, navigate]);

  return {
    handleEmailLogin,
    handleKakaoLogin,
    handleSignup,
    handleLogout,
  };
};
