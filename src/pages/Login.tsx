import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '@/hooks/useLogin';
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/common/Toast';

import { Container, ContentContanier, Spacer } from '@/style/CommonStyle';
import LogoImg from '@/assets/momeetLogo.svg';
import {
  InputSection,
  Logo,
  LoginButton,
  LoginMain,
  LoginSection,
  KaKaoLoginBTn,
  LinkText,
} from './Login.styled';
import apikey from '@/config/apikey';

const Login = () => {
  const { handleEmailLogin } = useLogin();
  const { showToast, hideToast, toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string[] | string }>({});

  // 로그인 핸들러
  const handleLogin = async () => {
    setErrors({});
    try {
      await handleEmailLogin(email, password);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        '로그인에 실패했습니다. 네트워크 연결을 확인해주세요.';
      showToast(errorMessage);
    }
  };

  // 카카오 로그인 핸들러
  const handleKakaoLogin = () => {
    if (!apikey.kakaoRestApiKey) {
      showToast('카카오 API 키가 설정되지 않았습니다. 관리자에게 문의하세요.');
      return;
    }

    const REST_API_KEY = apikey.kakaoRestApiKey;
    // 백엔드가 사용하는 redirectUri와 일치시킴
    const REDIRECT_URI = `${window.location.origin}/kakaoLogin`;
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    console.log('카카오 인증 URL:', kakaoAuthURL);
    console.log('현재 도메인:', window.location.origin);
    window.location.href = kakaoAuthURL;
  };

  return (
    <Container>
      <ContentContanier>
        <LoginMain>
          <Logo alt="모밋 로고" src={LogoImg} />
          <Spacer h={48} />
          <LoginSection>
            <div>
              <InputSection
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div style={{ color: 'red' }}>{errors.email[0]}</div>}
            </div>
            <Spacer h={24} />
            <div>
              <InputSection
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <div style={{ color: 'red' }}>{errors.password[0]}</div>}
            </div>
            <Spacer h={24} />
            <LoginButton onClick={handleLogin}>로그인</LoginButton>
            <Spacer h={12} />
            <KaKaoLoginBTn onClick={handleKakaoLogin}>카카오 간편 로그인</KaKaoLoginBTn>
            <Spacer h={12} />
            <div style={{ textAlign: 'center' }}>
              <LinkText>
                계정이 없으신가요?{' '}
                <Link to="/signup" style={{ color: '#007bff', textDecoration: 'none' }}>
                  회원가입하기
                </Link>
              </LinkText>
            </div>
          </LoginSection>
        </LoginMain>
      </ContentContanier>
      {toast.visible && <Toast message={toast.message} onClose={hideToast} />}
    </Container>
  );
};

export default Login;
