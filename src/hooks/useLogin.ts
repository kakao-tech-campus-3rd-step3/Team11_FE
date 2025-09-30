import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, kakaoLogin, signup, getMyProfile } from '@/api/auth';
import { setMyProfile } from '@/store/slices/myProfileSlice';
import { saveTokens } from '@/utils/tokenStorage';

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 로그인 성공
  const handleLoginSuccess = useCallback(async (
    result: any,
    loginType: 'email' | 'kakao' = 'email'
  ) => {
    try {
      // 토큰 저장
      saveTokens(result.accessToken, result.refreshToken);

      // 프로필 조회 및 Redux 업데이트
      try {
        const profileData = await getMyProfile();
        dispatch(setMyProfile(profileData));
      } catch (profileError) {
        console.error('프로필 조회 실패:', profileError);
        // 프로필 조회 실패 시 기본 데이터로 설정
        const userData = result.user || {};
        dispatch(setMyProfile({ 
          name: userData.name || userData.nickname || result.email
        }));
      }

      alert(`${loginType === 'kakao' ? '카카오' : ''}로그인 성공!`);
      navigate("/home");
    } catch (error) {
      console.error('로그인 후 처리 실패:', error);
      alert('로그인은 성공했지만 프로필을 불러오는데 실패했습니다.');
      navigate("/home");
    }
  }, [dispatch, navigate]);

  // 로그인 실패 
  const handleLoginError = useCallback((
    error: any,
    loginType: 'email' | 'kakao' = 'email'
  ) => {
    console.error(`${loginType === 'kakao' ? '카카오 ' : ''}로그인 에러:`, error);
    
    if (error.response?.status === 401) {
      alert("이메일 또는 비밀번호가 잘못되었습니다.");
    } else if (error.response?.data?.detail) {
      alert(error.response.data.detail);
    } else if (error.message) {
      alert(`${loginType === 'kakao' ? '카카오 ' : ''}로그인 실패: ${error.message}`);
    } else {
      alert(`${loginType === 'kakao' ? '카카오 ' : ''}로그인에 실패했습니다. 네트워크 연결을 확인해주세요.`);
    }
  }, []);

  // 이메일 로그인
  const handleEmailLogin = useCallback(async (email: string, password: string) => {
    try {
      const result = await login(email, password);
      handleLoginSuccess(result, 'email');
    } catch (error: any) {
      handleLoginError(error, 'email');
    }
  }, [handleLoginSuccess, handleLoginError]);

  // 카카오 로그인
  const handleKakaoLogin = useCallback(async (code: string) => {
    try {
      const result = await kakaoLogin(code);
      handleLoginSuccess(result, 'kakao');
    } catch (error: any) {
      handleLoginError(error, 'kakao');
    }
  }, [handleLoginSuccess, handleLoginError]);

  // 회원가입
  const handleSignup = useCallback(async (email: string, password1: string, password2: string) => {
    try {
      await signup(email, password1, password2);
      navigate("/onboarding");
    } catch (error: any) {
      handleLoginError(error, 'email');
      throw error; 
    }
  }, [navigate, handleLoginError]);

  return {
    handleEmailLogin,
    handleKakaoLogin,
    handleSignup,
  };
};
