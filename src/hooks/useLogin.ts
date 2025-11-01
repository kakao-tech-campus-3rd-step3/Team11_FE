import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getMyProfile } from '@/api/services/profile.service';
import { setMyProfile, clearMyProfile } from '@/store/slices/myProfileSlice';
import { clearProfile, clearTokens, saveTokens, saveProfile } from '@/utils/tokenStorage';
import { kakaoLogin, login, logout, signup, deleteAccount } from '@/api/services/auth.service';
import { useToast } from '@/hooks/useToast';

// 프로필이 있는지 확인
const hasCompleteProfile = (profile: any): boolean => {
  return profile && profile.nickname;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();

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
          const isProfileNotFound = 
            profileError.response?.status === 404 ||
            profileError.message?.includes('프로필이 존재하지 않습니다') ||
            profileError.message?.includes('404');
          
          if (isProfileNotFound) {
            hasProfile = false;
          } else {
            console.error('프로필 조회 실패:', profileError);
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

 /* const handleLoginError = useCallback(
    (error: any, loginType: 'email' | 'kakao' = 'email') => {
      console.error(`${loginType === 'kakao' ? '카카오 ' : ''}로그인 에러:`, error);

      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        `${loginType === 'kakao' ? '카카오 ' : ''}로그인에 실패했습니다. 네트워크 연결을 확인해주세요.`;

      showToast(errorMessage);
    },
    [showToast],
  );
*/
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
      const result = await signup(email, password1, password2);
      return result;
    },
    [],
  );

  // 로그아웃
  const handleLogout = useCallback(async () => {
    try {
      await logout();
      clearTokens();
      clearProfile();
      dispatch(clearMyProfile());
      showToast('로그아웃되었습니다.');
      navigate('/login');
    } catch (error: any) {
      console.error('로그아웃 실패:', error);
      showToast(`로그아웃 실패: ${error.message}`);
    }
  }, [dispatch, navigate, showToast]);

  // 회원탈퇴
  const handleDeleteAccount = useCallback(async () => {
    try {
      const result = await deleteAccount();
      // 성공 시 1 반환
      if (result === 1) {
        clearTokens();
        clearProfile();
        dispatch(clearMyProfile());
        showToast('회원탈퇴가 완료되었습니다.');
        navigate('/login');
      } else {
        showToast('회원탈퇴에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error: any) {
      console.error('회원탈퇴 실패:', error);
      const errorMessage =
        error.response?.data?.detail ||
        error.message ||
        '회원탈퇴에 실패했습니다. 다시 시도해주세요.';
      showToast(errorMessage);
    }
  }, [dispatch, navigate, showToast]);

  return {
    handleEmailLogin,
    handleKakaoLogin,
    handleSignup,
    handleLogout,
    handleDeleteAccount,
  };
};

