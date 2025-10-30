import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getMyProfile } from '@/api/services/profile.service';
import { setMyProfile, clearMyProfile } from '@/store/slices/myProfileSlice';
import { clearProfile, clearTokens, saveTokens, saveProfile } from '@/utils/tokenStorage';
import { kakaoLogin, login, logout, signup } from '@/api/services/auth.service';

// 프로필이 있는지 확인
const hasCompleteProfile = (profile: any): boolean => {
  return profile && profile.nickname;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 로그인 성공
  const handleLoginSuccess = useCallback(
    async (result: any) => {
      try {
        saveTokens(result.accessToken, result.refreshToken);
        console.log(result.accessToken, result.refreshToken);

        let hasProfile = false;
        try {
          const profileData = await getMyProfile();
          // 프로필이 완전한지 확인
          if (hasCompleteProfile(profileData)) {
            dispatch(setMyProfile(profileData));
            saveProfile(profileData);
            hasProfile = true;
          }
        } catch (profileError: any) {
          console.error('프로필 조회 실패:', profileError);
          if (profileError.response?.status === 404) {
            hasProfile = false;
          } else {
            throw profileError;
          }
        }

        navigate(hasProfile ? '/home' : '/onboarding');
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
      // 회원가입 API는 성공 시 '1' 같은 단순 응답만 반환하고 토큰은 반환하지 않음
      // 이메일 인증 후 로그인해야 토큰을 받을 수 있음
      const result = await signup(email, password1, password2);
      return result;
    },
    [],
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
