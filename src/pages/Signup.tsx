import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '@/hooks/useLogin';

import { Container, ContentContanier, Spacer } from '@/style/CommonStyle';
import LogoImg from '@/assets/momeetLogo.svg';
import { InputSection, Logo, LoginButton, LoginMain, LoginSection, LinkText } from './Login.styled';

const Signup = () => {
  const { handleSignup } = useLogin();

  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [isLoading, setIsLoading] = useState(false);

  // 회원가입 핸들러
  const handleSignupSubmit = async () => {
    setErrors({});
    setIsLoading(true);

    try {
      await handleSignup(email, password1, password2);
    } catch (err: any) {
      console.error('회원가입 에러:', err);

      if (err.response?.status === 409) {
        alert('이미 가입한 이메일입니다.');
      } else if (err.response?.status === 400 && err.response?.data?.validationErrors) {
        // 유효성 검사 에러 처리
        const validationErrors = err.response.data.validationErrors;
        setErrors(validationErrors);

        // 첫 번째 에러 메시지 표시
        const firstError = Object.values(validationErrors)[0];
        if (Array.isArray(firstError)) {
          alert(firstError[0]);
        } else {
          alert(firstError);
        }
      } else {
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 엔터키 처리
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSignupSubmit();
    }
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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              {errors.email && (
                <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                  {Array.isArray(errors.email) ? errors.email[0] : errors.email}
                </div>
              )}
            </div>
            <Spacer h={24} />
            <div>
              <InputSection
                type="password"
                placeholder="비밀번호 (8자 이상, 영문 대소문자, 숫자, 특수문자 포함)"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              {errors.password1 && (
                <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                  {Array.isArray(errors.password1) ? errors.password1[0] : errors.password1}
                </div>
              )}
            </div>
            <Spacer h={24} />
            <div>
              <InputSection
                type="password"
                placeholder="비밀번호 확인"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              {errors.password2 && (
                <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                  {Array.isArray(errors.password2) ? errors.password2[0] : errors.password2}
                </div>
              )}
            </div>
            <Spacer h={24} />
            <LoginButton
              onClick={handleSignupSubmit}
              disabled={isLoading}
              style={{ opacity: isLoading ? 0.7 : 1 }}
            >
              {isLoading ? '회원가입 중...' : '회원가입'}
            </LoginButton>
            <Spacer h={12} />
            <div style={{ textAlign: 'center' }}>
              <LinkText>
                이미 계정이 있으신가요?{' '}
                <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>
                  로그인하기
                </Link>
              </LinkText>
            </div>
          </LoginSection>
        </LoginMain>
      </ContentContanier>
    </Container>
  );
};

export default Signup;
